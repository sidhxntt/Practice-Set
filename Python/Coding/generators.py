import sys
import functools
import os 
import json
import logging.config

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
        self.logger = Logger()

    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            self.logger.info(f"Memory usage by {self.label} ({func.__name__}): {sys.getsizeof(result)} bytes")
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

        firstn(100000)
        firstn_gen(100000)

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

        fibonacci_list(100000)
        fibonacci_gen(100000)

def main():
    t = Tester()
    t.test1()
    print() #spacing
    t.test2()

if __name__ == "__main__":
    main()
