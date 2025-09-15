import logging
from abc import ABC

# Base Displayer class with per-module logging
FILE_PATH = "/Users/siddhantgupta/Desktop/SID/Practice-Set/DSA & Algorithms/Basics/ADTs/src/output"


class Displayer(ABC):

    @staticmethod
    def get_logger(module_name: str, arrays=False, linked_list=False):
        """
        Returns a logger that logs to both terminal and a module-specific file
        """
        logger = logging.getLogger(module_name)
        logger.setLevel(logging.INFO)

        if not logger.handlers:
            # Console handler
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(logging.Formatter('%(message)s'))
            logger.addHandler(console_handler)

            # File handler
            if arrays:
                path = f'{FILE_PATH}/arrays/{module_name}_output.log'
            elif linked_list:
                path = f'{FILE_PATH}/linked_list/{module_name}_output.log'
            else:
                path = f'{FILE_PATH}/{module_name}_output.log'

            file_handler = logging.FileHandler(path, mode='w')
            file_handler.setFormatter(logging.Formatter('%(message)s'))
            logger.addHandler(file_handler)

        return logger

    # ---------------- Helper ----------------
    @staticmethod
    def _log_sequence(self, seq, size=None, reversed=False, ds_name="Structure"):
        """Logs a sequence or iterable in human-readable form."""
        if seq is None:
            self.logger.info(f"[{ds_name}] is empty")
            return

        # Trim to size if provided (for arrays/stacks/queues)
        if size is not None:
            seq = seq[:size]

        if not seq:  # empty list
            self.logger.info(f"[{ds_name}] is empty")
            return

        seq_to_log = seq[::-1] if reversed else seq
        self.logger.info(f"{ds_name} → {seq_to_log}")

    # ---------------- Decorators ----------------
    @staticmethod
    def array_displayer(operation_name, reversed=False):
        """Decorator to log arrays, stacks, queues, and strings after an operation"""
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                result = func(self, *args, **kwargs)

                if hasattr(self, "array") and hasattr(self, "size"):
                    Displayer._log_sequence(self, self.array, self.size, reversed, f"[{operation_name}] Array")

                elif hasattr(self, "stack") and hasattr(self, "size"):
                    Displayer._log_sequence(self, self.stack, self.size, reversed, f"[{operation_name}] Stack")

                elif hasattr(self, "queue") and hasattr(self, "size"):
                    Displayer._log_sequence(self, self.queue, self.size, reversed, f"[{operation_name}] Queue")

                elif hasattr(self, "string"):
                    seq = list(self.string)
                    Displayer._log_sequence(self, seq, None, reversed, f"[{operation_name}] String")

                else:
                    self.logger.info(f"[{operation_name}] Operation completed")

                return result
            return wrapper
        return decorator

    @staticmethod
    def linked_list_displayer(operation_name, reversed=False):
        """Decorator to log linked list state after operation"""
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                result = func(self, *args, **kwargs)

                if hasattr(self, "head"):
                    nodes = []
                    current = self.head
                    while current is not None:  # traverse linked list
                        nodes.append(str(current.data))
                        current = current.next
                    nodes.append("None")

                    if reversed:
                        display_nodes = nodes[:-1][::-1] + ["None"]  # reverse data only
                        self.logger.info(f"[{operation_name}] LinkedList (Reversed) → {' -> '.join(display_nodes)}")
                    else:
                        self.logger.info(f"[{operation_name}] LinkedList → {' -> '.join(nodes)}")

                else:
                    self.logger.info(f"[{operation_name}] Operation completed")

                return result
            return wrapper
        return decorator
