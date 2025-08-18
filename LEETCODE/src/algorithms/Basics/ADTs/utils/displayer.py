import logging
from abc import ABC

# Configure logging
# logging.basicConfig(
#     level=logging.INFO,
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
#     datefmt='%Y-%m-%d %H:%M:%S'
# )
logging.basicConfig(level=logging.INFO, format='%(message)s')
logger = logging.getLogger(__name__)

class Displayer(ABC):
    
    @staticmethod
    def auto_display(operation_name: str):
        """Decorator to automatically log the array after operation"""
        def decorator(func):
            def wrapper(self, arr, *args, **kwargs):
                result = func(self, arr, *args, **kwargs)
                logger.info(f"[{operation_name}] Array after operation: {arr}")
                return result
            return wrapper
        return decorator
    
    @staticmethod
    def perform_op(description, func, *args, **kwargs):
        """Perform a single operation with a description"""
        logger.info(f"\n---- {description} ----")
        return func(*args, **kwargs)
    
    @staticmethod
    def execute(operations):
        """Execute a list of operations in sequence"""
        for description, method, *args in operations:
            Displayer.perform_op(description, method, *args)