import os
from pathlib import Path
from datetime import timedelta
from django.core.management.utils import get_random_secret_key

# Custom utility imports
from core.utils.envs import get_env_stage
from core.utils.drf.installed_apps import installed_apps
from core.utils.drf.middlewares import middlewares
from core.utils.templates import templates
from core.utils.db_and_cache.databases import database_connections
from core.utils.db_and_cache.caching import caching
from core.utils.drf.app_pass_validators import app_pass_validators
from core.utils.drf.DRF_settings import DRF
from core.utils.logging.sentry import sentry
from core.utils.logging.elk_config import configure_logging


# ------------------------------------------------------------------------------
# BASE SETTINGS
# ------------------------------------------------------------------------------
# LEMONSQUEEZY_WEBHOOK_SECRET = os.getenv('WEBHOOK_SECRET')
BASE_DIR = Path(__file__).resolve().parent.parent.parent
env = get_env_stage()

# ------------------------------------------------------------------------------
# SECURITY SETTINGS
# ------------------------------------------------------------------------------

SECRET_KEY = os.getenv('SECRET_KEY')
if not SECRET_KEY and os.getenv('DJANGO_ENV') != 'production':
    SECRET_KEY = get_random_secret_key()

DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

ALLOWED_HOSTS = []
if env.get('prod') or env.get('stage'):
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

# ------------------------------------------------------------------------------
# APPLICATION DEFINITION
# ------------------------------------------------------------------------------

INSTALLED_APPS = installed_apps()
MIDDLEWARE = middlewares()
ROOT_URLCONF = 'core.urls'
TEMPLATES = templates(BASE_DIR)
ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

# ------------------------------------------------------------------------------
# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------

DATABASES = database_connections(env)

# ------------------------------------------------------------------------------
# CACHING & SESSION SETTINGS
# ------------------------------------------------------------------------------

cache_settings = caching(env)
CACHES = cache_settings['cache_config']

SESSION_ENGINE = cache_settings.get('SESSION_ENGINE', 'django.contrib.sessions.backends.db')
SESSION_CACHE_ALIAS = cache_settings.get('SESSION_CACHE_ALIAS', 'default')
SESSION_COOKIE_AGE = 1209600  # 2 weeks
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# ------------------------------------------------------------------------------
# PASSWORD VALIDATION
# ------------------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = app_pass_validators()
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
SITE_ID = 1
ACCOUNT_EMAIL_VERIFICATION = 'none'
LOGIN_REDIRECT_URL = '/'
# ------------------------------------------------------------------------------
# REST FRAMEWORK CONFIGURATION
# ------------------------------------------------------------------------------

REST_FRAMEWORK = DRF(env)

if not env.get('prod'):
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append(
        'rest_framework.renderers.BrowsableAPIRenderer'
    )

# ------------------------------------------------------------------------------
# JWT CONFIGURATION
# ------------------------------------------------------------------------------

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

# ------------------------------------------------------------------------------
# CORS CONFIGURATION
# ------------------------------------------------------------------------------

CORS_ALLOW_ALL_ORIGINS = DEBUG

if not DEBUG:
    CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
    CORS_ALLOW_CREDENTIALS = True
    CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']
    CORS_PREFLIGHT_MAX_AGE = 86400  # 24 hours

# ------------------------------------------------------------------------------
# INTERNATIONALIZATION
# ------------------------------------------------------------------------------

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ------------------------------------------------------------------------------
# LOGGING AND MONITORING
# ------------------------------------------------------------------------------

# Initialize Sentry only if DSN is provided
sentry()

# Create logs directory if not exists
LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# ELK Stack Logging Config (Logstash, Elasticsearch)
ELASTICSEARCH_HOST = os.getenv('ELASTICSEARCH_HOST', 'elasticsearch')
ELASTICSEARCH_PORT = int(os.getenv('ELASTICSEARCH_PORT', 9200))


# Configure logging
configure_logging()

# ------------------------------------------------------------------------------
# STATIC FILES
# ------------------------------------------------------------------------------

STATIC_URL = '/static/'


# ------------------------------------------------------------------------------
# CUSTOM & MISC SETTINGS
# ------------------------------------------------------------------------------

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'authentication.User'

APP_NAME = 'django_backend'
ENVIRONMENT = os.getenv('DJANGO_ENV', 'development')

# ------------------------------------------------------------------------------
# ELASTICSEARCH DSL (comment before seeding)
# ------------------------------------------------------------------------------
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'https://localhost:9200',
        'http_auth': ('elastic', 'pl*0PIku4oi*Ua16FLL+'),
        'ca_certs': '/Users/siddhantgupta/Desktop/SID/DJANGO/http_ca.crt',
    }
}
# ------------------------------------------------------------------------------
# Celery settings
# ------------------------------------------------------------------------------
CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://127.0.0.1:6379/0')
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'django-db')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

# ------------------------------------------------------------------------------
# Email settings
# ------------------------------------------------------------------------------
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() == 'true'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', EMAIL_HOST_USER)
