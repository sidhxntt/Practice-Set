import sys
import functools
import os 
import json
import logging.config
import multiprocessing


def Logger():
    json_config_path = os.path.join(os.getcwd(), "Coding", "Logging", "logging_config.json")
    with open(json_config_path, "r") as file:
        config = json.load(file)

    logging.config.dictConfig(config)
    logger = logging.getLogger("myLogger")
    return logger

# Class-based decorator to print memory usage of a function's return value
class MemoryUsage:
    def __init__(self, label="Function"):
        self.label = label

    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            logger = Logger()  # Logger must be created in the child process
            result = func(*args, **kwargs)
            logger.info(f"Memory usage by {self.label} ({func.__name__}): {sys.getsizeof(result)} bytes")
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
    def run_memory_test(func, n):
        for f in func:
            f(n)
    
def main():
    n = 100000
    t = Tester()
    
    func1, func2 = t.test1()
    func3, func4 = t.test2()
    
    functions = [func1, func2, func3, func4]
    processes = []
    number_of_processes = os.cpu_count()
    
    for i in range(number_of_processes):
        p = multiprocessing.Process(target=t.run_memory_test, args=(tuple(functions), n))
        processes.append(p)
    
    # Start all processes first
    for p in processes:
        p.start()
    
    # Then join them all to wait for completion
    for p in processes:
        p.join()


if __name__ == "__main__":
    multiprocessing.set_start_method("fork")  # Use 'spawn' on Windows if you're on Windows
    main()
    print("DONE")