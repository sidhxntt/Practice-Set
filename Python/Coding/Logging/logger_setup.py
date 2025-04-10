import os
import json
import logging
import logging.config

# Ensure log directory exists
pwd = os.path.join(os.getcwd(), "Coding", "Logging")
log_dir = os.path.join(pwd, "logs")
os.makedirs(log_dir, exist_ok=True)

# Load JSON config
json_config_path = os.path.join(pwd, "logging_config.json")
with open(json_config_path, "r") as f:
    config = json.load(f)

logging.config.dictConfig(config)

# Get your logger
logger = logging.getLogger("myLogger")

# Log something
logger.debug("Debug log")
logger.warning("Warning with rotation")
logger.error("Rotated error log")
