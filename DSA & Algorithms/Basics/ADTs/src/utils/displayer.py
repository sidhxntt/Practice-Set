import logging
from abc import ABC

# Setup logger
logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

class Displayer(ABC):
    @staticmethod
    def displayer(operation_name: str):
        """Decorator to automatically log the array after operation"""
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                result = func(self, *args, **kwargs)   # run original method
                logger.info(f"[{operation_name}] Array after operation: {self.array[:self.size]}")
                return result
            return wrapper
        return decorator
    
    @staticmethod
    def reverse_displayer(operation_name: str):
        """Decorator to automatically reverses the array after operation"""
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                result = func(self, *args, **kwargs)   # run original method
                arr = self.array[:self.size]
                logger.info(f"[REVERSED][{operation_name}] Array after operation: {arr[::-1]}")
                return result
            return wrapper
        return decorator