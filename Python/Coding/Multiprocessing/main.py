import sys
import functools
import os
import json
import logging
import logging.config
import multiprocessing
import threading
import time
from datetime import datetime

# Custom formatter that includes process and thread info
class CustomFormatter(logging.Formatter):
    def format(self, record):
        record.process_id = os.getpid()
        record.thread_id = threading.get_native_id()
        return super().format(record)

def setup_logger():
    """Setup logger with console handler if config file is not found"""
    try:
        json_config_path = os.path.join(os.getcwd(), "Coding", "Logging", "logging_config.json")
        with open(json_config_path, "r") as file:
            config = json.load(file)
        logging.config.dictConfig(config)
        logger = logging.getLogger("myLogger")
    except Exception as e:
        print(e)
    
    return logger

# Class-based decorator to print memory usage of a function's return value
class MemoryUsage:
    def __init__(self, label="Function"):
        self.label = label

    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            logger = setup_logger()
            start_time = time.time()
            result = func(*args, **kwargs)
            end_time = time.time()
            
            process_id = os.getpid()
            thread_id = threading.get_native_id()
            memory_size = sys.getsizeof(result)
            execution_time = (end_time - start_time) * 1000  # Convert to milliseconds
            
            logger.info(f"Process {process_id} - Thread {thread_id} - {self.label} ({func.__name__}): " +
                       f"Memory: {memory_size} bytes, Time: {execution_time:.2f} ms")
            return result
        return wrapper

class Tester:
    def test1(self):
        @MemoryUsage(label="non-generator")
        def firstn(n):
            return list(range(n))

        @MemoryUsage(label="generator")
        def firstn_gen(n):
            return (num for num in range(n))  # generator expression
        return [firstn, firstn_gen]
    
    def test2(self):
        @MemoryUsage(label="non-generator")
        def fibonacci_list(n):
            fib = []
            a, b = 0, 1
            for x in range(n):
                fib.append(a)
                a, b = b, a + b
            return fib

        @MemoryUsage(label="generator")
        def fibonacci_gen(n):
            def gen():
                a, b = 0, 1
                for x in range(n):
                    yield a
                    a, b = b, a + b
            return gen()
        return [fibonacci_list, fibonacci_gen]

    @staticmethod
    def run_process_test(func_index, func, n, process_id):
        logger = setup_logger()
        logger.info(f"Process {os.getpid()} (#{process_id}) started - Testing function {func.__name__}")
        result = func(n)
        logger.info(f"Process {os.getpid()} (#{process_id}) completed - Function {func.__name__}")
        return result
    
    @staticmethod
    def run_thread_test(func_index, func, n, thread_id):
        logger = setup_logger()
        proc_id = os.getpid()
        thread_native_id = threading.get_native_id()
        logger.info(f"Thread {thread_native_id} (#{thread_id}) in process {proc_id} started - Testing function {func.__name__}")
        result = func(n)
        logger.info(f"Thread {thread_native_id} (#{thread_id}) in process {proc_id} completed - Function {func.__name__}")
        return result

def run_multiprocessing_tests(n=100000):
    logger = setup_logger()
    logger.info(f"{'='*20} MULTIPROCESSING TESTS {'='*20}")
    
    t = Tester()
    func1, func2 = t.test1()
    func3, func4 = t.test2()
    
    functions = [func1, func2, func3, func4]
    processes = []
    
    # Distribute functions across processes
    for i, func in enumerate(functions):
        p = multiprocessing.Process(
            target=Tester.run_process_test, 
            args=(i, func, n, i+1)
        )
        processes.append(p)
        logger.info(f"Created process #{i+1} for function {func.__name__}")
    
    logger.info(f"Starting {len(processes)} processes...")
    start_time = time.time()
    
    # Start all processes
    for p in processes:
        p.start()
    
    # Wait for all processes to complete
    for p in processes:
        p.join()
    
    end_time = time.time()
    logger.info(f"All processes completed in {(end_time - start_time):.2f} seconds")
    logger.info(f"{'='*60}")

def run_threading_tests(n=100000):
    logger = setup_logger()
    logger.info(f"{'='*20} THREADING TESTS {'='*20}")
    
    t = Tester()
    func1, func2 = t.test1()
    func3, func4 = t.test2()
    
    functions = [func1, func2, func3, func4]
    threads = []
    
    # Distribute functions across threads
    for i, func in enumerate(functions):
        thread = threading.Thread(
            target=Tester.run_thread_test, 
            args=(i, func, n, i+1)
        )
        threads.append(thread)
        logger.info(f"Created thread #{i+1} for function {func.__name__}")
    
    logger.info(f"Starting {len(threads)} threads...")
    start_time = time.time()
    
    # Start all threads
    for t in threads:
        t.start()
    
    # Wait for all threads to complete
    for t in threads:
        t.join()
    
    end_time = time.time()
    logger.info(f"All threads completed in {(end_time - start_time):.2f} seconds")
    logger.info(f"{'='*60}")

def main():
    n = 100000
    logger = setup_logger()
    
    logger.info(f"Starting memory usage tests with n={n}")
    logger.info(f"System has {os.cpu_count()} CPU cores")
    
    # Run multiprocessing tests first
    run_multiprocessing_tests(n)
    
    # Then run threading tests
    run_threading_tests(n)
    
    logger.info("All tests completed!")

if __name__ == "__main__":
    if sys.platform != "win32":
        multiprocessing.set_start_method("fork")  # Use 'fork' on Unix-like systems
    else:
        multiprocessing.set_start_method("spawn")  # Use 'spawn' on Windows
    
    main()
    print("DONE")