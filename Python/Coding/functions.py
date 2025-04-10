import os
import logging.config
import logging
import json

def Logger():
    json_config_path = os.path.join(os.getcwd(), "Coding", "Logging", "logging_config.json")
    with open(json_config_path, "r") as file:
        config = json.load(file)

    logging.config.dictConfig(config)
    logger = logging.getLogger("myLogger")
    return logger

def log_operation(func):
    logger = Logger()
    def wrapper(x, y):
        logger.info(func.__name__)
        return func(x, y)
    return wrapper

def log_on_create(cls):
    original_init = cls.__init__

    def new_init(self, *args, **kwargs):
        print(f"Creating instance of: {cls.__name__}")
        original_init(self, *args, **kwargs)

    cls.__init__ = new_init
    return cls

@log_on_create
class MATH:
    def __init__(self, *funcs, **kwargs):
        self.num1 = kwargs.get('num1')
        self.num2 = kwargs.get('num2')
        self.funcs = funcs  # tuple of function references

    # Generator method
    def calculate(self):
        for func in self.funcs:
            yield func(self.num1, self.num2)

    def Display(self):
        print("\n\nOPERATIONS STARTING...")
        for _ in self.calculate():  # consume generator
            pass
        print("\nOPERATIONS ENDED.")

def operations():
    @log_operation
    def add(x, y):
        print("\nSummation:", x + y)

    @log_operation
    def sub(x, y):
        print("Difference:", x - y)

    @log_operation
    def mul(x, y):
        print("Product:", x * y)

    @log_operation
    def div(x, y):
        try:
            print(f"Quotient is {x / y} & Remainder is {x % y}")
        except ZeroDivisionError:
            print("Division by zero is not allowed.")

    return [add, sub, mul, div]

def main():
    num1 = int(input("Enter number 1: "))
    num2 = int(input("Enter number 2: "))
    funcs = operations()
    
    calculator = MATH(*funcs, num1=num1, num2=num2)
    calculator.Display()

if __name__ == "__main__":
    main()
