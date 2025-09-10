import logging
from abc import ABC

# Base Displayer class with per-module logging
FILE_PATH = "/Users/siddhantgupta/Desktop/SID/Practice-Set/DSA & Algorithms/Basics/ADTs/src/output"
class Displayer(ABC):
    
    @staticmethod
    def get_logger(module_name: str):
        """
        Returns a logger that logs to both terminal and a module-specific file
        """
        logger = logging.getLogger(module_name)
        logger.setLevel(logging.INFO)

        # Avoid adding multiple handlers if logger is reused
        if not logger.handlers:
            # Console handler
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(logging.Formatter('%(message)s'))
            logger.addHandler(console_handler)

            # File handler: writes to <module_name>.log
            file_handler = logging.FileHandler(f'{FILE_PATH}/{module_name}_output.log', mode='w')
            file_handler.setFormatter(logging.Formatter('%(message)s'))
            logger.addHandler(file_handler)

        return logger
    
    @staticmethod
    def displayer(operation_name , reversed =False):
        """Decorator to automatically log the array after operation"""
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                result = func(self, *args, **kwargs)   # run original method
                if reversed:
                    self.logger.info(f"[REVERSED][{operation_name}] Array after operation: {self.array[:self.size][::-1]}")
                    return result
                self.logger.info(f"[{operation_name}] Array after operation: {self.array[:self.size]}")
                return result
            return wrapper
        return decorator
