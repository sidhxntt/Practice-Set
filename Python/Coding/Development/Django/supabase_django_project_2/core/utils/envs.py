import os
from dotenv import load_dotenv

load_dotenv()

ENVIRONMENT = os.getenv('DJANGO_ENV', 'development')
PRODUCTION = ENVIRONMENT == 'production'
STAGING = ENVIRONMENT == 'staging'
TESTING = ENVIRONMENT == 'testing'
DEVELOPMENT = ENVIRONMENT == 'development'

def get_env():
    envs = {
        'prod': PRODUCTION,
        'stage': STAGING,
        'test': TESTING,
        'dev': DEVELOPMENT,
    }
    return envs
