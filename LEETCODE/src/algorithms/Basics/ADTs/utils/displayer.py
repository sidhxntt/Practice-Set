from abc import ABC

# Abstract base class
class Displayer(ABC):

    @staticmethod
    def auto_display(func):
        """Decorator to automatically print the array after operation"""
        def wrapper(self, arr, *args, **kwargs):
            result = func(self, arr, *args, **kwargs)
            print("Array after operation:", arr)
            return result
        return wrapper

    def perform_op(description, func, *args, **kwargs):
        """Perform a single operation with a description"""
        print(f"---- {description} ----")
        return func(*args, **kwargs)

    @staticmethod
    def execute(operations):
        """Execute a list of operations in sequence"""
        for description, method, *args in operations:
            Displayer.perform_op(description, method, *args)
