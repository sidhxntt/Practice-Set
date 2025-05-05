import os
from pathlib import Path
from utils.drf.installed_apps import installed_apps
from utils.drf.middlewares import middlewares
from utils.templates import templates
from utils.db_and_cache.databases import database_connections
from utils.db_and_cache.caching import caching
from utils.drf.app_pass_validators import app_pass_validators
from django.core.management.utils import get_random_secret_key
from utils.drf.DRF_settings import DRF
from utils.envs import get_env
from utils.drf.security import security_settings
from datetime import timedelta
from utils.logging.sentry import sentry
from utils.logging.elk_config import configure_logging

# Build paths inside the project like this: BASE_DIR / 'subdir'
BASE_DIR = Path(__file__).resolve().parent.parent

# Environment setup
env = get_env()

# SECURITY SETTINGS
# -------------------------------------------------------------------------
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')
if not SECRET_KEY and os.getenv('DJANGO_ENV') != 'production':
    SECRET_KEY = get_random_secret_key()  # Only for development

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Allowed hosts configuration
ALLOWED_HOSTS = []
if env.get('prod') or env.get('stage'):
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

# Apply security settings
globals().update(security_settings(env))

# Application definition
INSTALLED_APPS = installed_apps()
MIDDLEWARE = middlewares()
ROOT_URLCONF = 'main.urls'
TEMPLATES = templates(BASE_DIR)
WSGI_APPLICATION = 'main.wsgi.application'

# Database 
DATABASES = database_connections(env)

ELASTICSEARCH_DSL = {
    'default':{
        'hosts': 'http://localhost:9200'
    }
}
# Caches
cache_settings = caching(env)
CACHES = cache_settings['cache_config']

# Session configuration
# Ensure SESSION_ENGINE is always defined, even if it's not returned from caching()
SESSION_ENGINE = cache_settings.get('SESSION_ENGINE', 'django.contrib.sessions.backends.db')
SESSION_CACHE_ALIAS = cache_settings.get('SESSION_CACHE_ALIAS', 'default')
SESSION_COOKIE_AGE = 1209600  # 2 weeks in seconds
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_SAMESITE = 'Lax'  # Prevents CSRF in modern browsers
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Password validation
AUTH_PASSWORD_VALIDATORS = app_pass_validators()

# REST Framework settings
# -------------------------------------------------------------------------
REST_FRAMEWORK = DRF(env)
# Add browsable API in development
if not env.get('prod'):
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append(
        'rest_framework.renderers.BrowsableAPIRenderer'
    )

# JWT SETTINGS
# -------------------------------------------------------------------------
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
}
# CORS SETTINGS
# -------------------------------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = DEBUG
if not DEBUG:
    CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
    CORS_ALLOW_CREDENTIALS = True # Allows cookies, authentication headers, or TLS client certificates to be included in cross-origin requests.
    CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken'] # Makes these headers accessible to the client in the response from a cross-origin request.
    CORS_PREFLIGHT_MAX_AGE = 86400  # Tells browsers to cache the CORS preflight request (an OPTIONS call) for 24 hours (86400 seconds). Reduces the number of preflight checks, improving performance.

# INTERNATIONALIZATION
# -------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Only initialize Sentry if DSN is provided
sentry()

# Base directory for logs
LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# Application name and environment
APP_NAME = 'django_backend'
ENVIRONMENT = os.environ.get('DJANGO_ENV', 'development')

# ELK configuration
ELASTICSEARCH_HOST = os.environ.get('ELASTICSEARCH_HOST', 'elasticsearch')
ELASTICSEARCH_PORT = os.environ.get('ELASTICSEARCH_PORT', 9200)
LOGSTASH_HOST = os.environ.get('LOGSTASH_HOST', 'logstash')
LOGSTASH_PORT = os.environ.get('LOGSTASH_PORT', 5044)

# Configure Django logging
# Uncomment if using configure_logging function
# LOGGING = configure_logging(
#     app_name=APP_NAME,
#     environment=ENVIRONMENT,
#     log_dir=LOG_DIR,
#     logstash_host=LOGSTASH_HOST,
#     logstash_port=LOGSTASH_PORT
# )

# Static files
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom user model [Specifies a custom User model (instead of Django's default)]
AUTH_USER_MODEL = 'authentication.User'
# ELK_ENABLED = True

# ELASTIC_APM = {
#     'SERVICE_NAME': APP_NAME,  # Use the same app name as defined earlier
#     'SECRET_TOKEN': '',  # Not needed for development
#     'SERVER_URL': 'http://apm-server:8200',  # If you add APM server later
#     'ENVIRONMENT': ENVIRONMENT,  # Use the environment variable defined earlier
#     'DJANGO_TRANSACTION_NAME_FROM_ROUTE': True,
#     'CAPTURE_BODY': 'all',
#     'CAPTURE_HEADERS': True,
#     'TRANSACTIONS_IGNORE_PATTERNS': [
#         '^OPTIONS ', 
#         '^/health/', 
#         '^/favicon.ico'
#     ],
# }

# # Customize your logging configuration for ELK
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'formatters': {
#         'json': {
#             'class': 'your_app.utils.JsonFormatter',  # Make sure this class exists
#         },
#     },
#     'handlers': {
#         'console': {
#             'level': 'INFO',
#             'class': 'logging.StreamHandler',
#             'formatter': 'json',
#         },
#         'file': {
#             'level': 'INFO',
#             'class': 'logging.handlers.RotatingFileHandler',
#             'filename': os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'request_logs', 'requests.log'),
#             'maxBytes': 10 * 1024 * 1024,  # 10MB
#             'backupCount': 10,
#             'formatter': 'json',
#         },
#         'error_file': {
#             'level': 'ERROR',
#             'class': 'logging.handlers.RotatingFileHandler',
#             'filename': os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'error_logs', 'api_exceptions.log'),
#             'maxBytes': 10 * 1024 * 1024,  # 10MB
#             'backupCount': 10,
#             'formatter': 'json',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console', 'file'],
#             'level': 'INFO',
#             'propagate': True,
#         },
#         'request_logger': {
#             'handlers': ['console', 'file'],
#             'level': 'INFO',
#             'propagate': False,
#         },
#         'api_exceptions': {
#             'handlers': ['console', 'error_file'],
#             'level': 'ERROR',
#             'propagate': False,
#         },
#         'elasticapm.errors': {
#             'handlers': ['console', 'error_file'],
#             'level': 'ERROR',
#             'propagate': False,
#         },
#     },
# }

# # Request logging settings
# REQUEST_LOGGING_LEVEL = logging.INFO
# REQUEST_LOGGING_COLORIZE = False
# REQUEST_LOGGING_MAX_BODY_LENGTH = 1000
# REQUEST_LOGGING_SENSITIVE_HEADERS = [
#     'Authorization', 'Proxy-Authorization', 'Cookie', 'Set-Cookie'
# ]
# REQUEST_LOGGING_SENSITIVE_BODY_FIELDS = [
#     'password', 'token', 'secret', 'key', 'credit_card', 'cvv'
# ]
# REQUEST_LOGGING_EXEMPT_PATHS = [
#     '/health/', '/metrics/', '/static/', '/media/', '/admin/jsi18n/'
# ]
# REQUEST_LOGGING_EXEMPT_USER_AGENTS = [
#     'ELB-HealthChecker', 'kube-probe'
# ]
# REQUEST_LOGGING_LOG_METRICS = True
# REQUEST_LOGGING_LOG_BODY = True
# REQUEST_LOGGING_LOG_HEADERS = True