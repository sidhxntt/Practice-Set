"""
Production-grade Django settings.py configuration.

This file contains settings optimized for production environments,
with enhanced security, performance, and maintainability.
"""

import os
from pathlib import Path
import dj_database_url
from django.core.management.utils import get_random_secret_key
from dotenv import load_dotenv
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
import logging.config

# Load environment variables from .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY SETTINGS
# -------------------------------------------------------------------------
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')
if not SECRET_KEY and os.getenv('DJANGO_ENV') != 'production':
    SECRET_KEY = get_random_secret_key()  # Only for development

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# Environment type
ENVIRONMENT = os.getenv('DJANGO_ENV', 'development')
PRODUCTION = ENVIRONMENT == 'production'
STAGING = ENVIRONMENT == 'staging'
TESTING = ENVIRONMENT == 'testing'
DEVELOPMENT = ENVIRONMENT == 'development'

# Allowed hosts configuration
ALLOWED_HOSTS = []
if PRODUCTION or STAGING:
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

# Security middleware settings
SECURE_SSL_REDIRECT = PRODUCTION
SESSION_COOKIE_SECURE = PRODUCTION
CSRF_COOKIE_SECURE = PRODUCTION
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000 if PRODUCTION else 0  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = PRODUCTION
SECURE_HSTS_PRELOAD = PRODUCTION
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# APPLICATION DEFINITION
# -------------------------------------------------------------------------
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'corsheaders',
    'django_filters',
    'storages',  # For S3 file storage
    'health_check',  # App for monitoring application health
    'health_check.db',  # DB health check
    'health_check.cache',  # Cache health check
]

LOCAL_APPS = [
    'api',
    'authentication',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'core.middleware.request_logging.RequestLoggingMiddleware',  # Custom logging middleware
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Static file serving
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'core.middleware.security.SecurityHeadersMiddleware',  # Custom security headers
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.settings_context',  # Custom context processor
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# DATABASE CONFIGURATION
# -------------------------------------------------------------------------
DATABASES = {
    'default': {
        **dj_database_url.parse(
            os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3'),
            conn_max_age=600
        ),
    }
}

# Add SSL options for production databases
if PRODUCTION or STAGING:
    DATABASES['default']['OPTIONS'] = {
        'sslmode': 'require',
    }

# DATABASE CONNECTION POOLING (for production)
if PRODUCTION:
    DATABASES['default']['ENGINE'] = 'django_db_geventpool.backends.postgresql_psycopg2'
    DATABASES['default']['CONN_MAX_AGE'] = 0  # Use 0 with connection pooling
    DATABASES['default']['OPTIONS'] = {
        **DATABASES['default'].get('OPTIONS', {}),
        'MAX_CONNS': 20,  # Max connections in the pool
    }

# CACHE CONFIGURATION
# -------------------------------------------------------------------------
if PRODUCTION or STAGING:
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': os.getenv('REDIS_URL', 'redis://127.0.0.1:6379/1'),
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
                'SOCKET_CONNECT_TIMEOUT': 5,
                'SOCKET_TIMEOUT': 5,
                'CONNECTION_POOL_KWARGS': {'max_connections': 50},
                'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
                'IGNORE_EXCEPTIONS': True,
            },
            'KEY_PREFIX': 'django_',
        }
    }
    # Use Redis for sessions in production
    SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
    SESSION_CACHE_ALIAS = 'default'
else:
    # Use local memory cache for development
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': 'unique-snowflake',
        }
    }

# PASSWORD VALIDATION
# -------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 10,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# REST FRAMEWORK SETTINGS
# -------------------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ] if PRODUCTION else [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    },
    'EXCEPTION_HANDLER': 'core.utils.exception_handlers.custom_exception_handler',
}

# Add browsable API in development
if not PRODUCTION:
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'].append(
        'rest_framework.renderers.BrowsableAPIRenderer'
    )

# JWT SETTINGS
# -------------------------------------------------------------------------
from datetime import timedelta

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
    CORS_ALLOW_CREDENTIALS = True
    CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']
    CORS_PREFLIGHT_MAX_AGE = 86400  # 24 hours

# CELERY SETTINGS
# -------------------------------------------------------------------------
if PRODUCTION or STAGING:
    CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', os.getenv('REDIS_URL'))
    CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', os.getenv('REDIS_URL'))
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TIMEZONE = 'UTC'
    CELERY_ENABLE_UTC = True
    CELERY_TASK_TIME_LIMIT = 5 * 60  # 5 minutes
    CELERY_TASK_SOFT_TIME_LIMIT = 60  # 1 minute
    CELERY_WORKER_MAX_TASKS_PER_CHILD = 1000
    CELERY_WORKER_CONCURRENCY = 4
    CELERY_TASK_ALWAYS_EAGER = not PRODUCTION  # Execute tasks immediately in dev
    CELERY_TASK_EAGER_PROPAGATES = True

# INTERNATIONALIZATION
# -------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# STATIC FILES (CSS, JavaScript, Images)
# -------------------------------------------------------------------------
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# Use WhiteNoise for static files in production
if PRODUCTION or STAGING:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# MEDIA FILES CONFIGURATION
# -------------------------------------------------------------------------
if PRODUCTION or STAGING:
    # S3 storage settings
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME', 'us-east-1')
    AWS_DEFAULT_ACL = 'private'
    AWS_S3_CUSTOM_DOMAIN = os.getenv('AWS_S3_CUSTOM_DOMAIN', None)
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',  # 1 day
    }
    AWS_QUERYSTRING_AUTH = True
    AWS_S3_FILE_OVERWRITE = False
else:
    # Local media settings
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# EMAIL CONFIGURATION
# -------------------------------------------------------------------------
if PRODUCTION or STAGING:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = os.getenv('EMAIL_HOST')
    EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
    EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
    EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() == 'true'
    DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL')
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# LOGGING CONFIGURATION
# -------------------------------------------------------------------------
# Configure Sentry for error tracking in production
if PRODUCTION or STAGING:
    sentry_sdk.init(
        dsn=os.getenv('SENTRY_DSN'),
        integrations=[DjangoIntegration()],
        environment=ENVIRONMENT,
        traces_sample_rate=0.1,  # Capture 10% of transactions
        send_default_pii=False
    )

# Logging configuration
LOGGING_CONFIG = None  # Disable Django's logging config
LOGLEVEL = os.getenv('DJANGO_LOGLEVEL', 'INFO').upper()

logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
        'json': {
            'format': '{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s", "module": "%(module)s"}',
            'class': 'pythonjsonlogger.jsonlogger.JsonFormatter',
        },
    },
    'handlers': {
        'console': {
            'level': LOGLEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'json' if PRODUCTION else 'verbose',
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/django.log'),
            'maxBytes': 1024 * 1024 * 10,  # 10 MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': LOGLEVEL,
            'propagate': True,
        },
        'django.server': {
            'handlers': ['console'],
            'level': LOGLEVEL,
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'app': {  # Custom application logger
            'handlers': ['console', 'file'] if not TESTING else ['console'],
            'level': LOGLEVEL,
            'propagate': False,
        },
    },
})

# CUSTOM USER MODEL
# -------------------------------------------------------------------------
AUTH_USER_MODEL = 'authentication.User'

# DEFAULT AUTO FIELD
# -------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# HEALTH CHECK SETTINGS
# -------------------------------------------------------------------------
HEALTH_CHECK = {
    'DISK_USAGE_MAX': 90,  # percent
    'MEMORY_MIN': 100,  # in MB
}

# ADMIN SETTINGS
# -------------------------------------------------------------------------
ADMIN_URL = os.getenv('ADMIN_URL', 'admin/')
ADMIN_SITE_HEADER = "Application Admin"
ADMIN_SITE_TITLE = "Admin Portal"
ADMIN_INDEX_TITLE = "Welcome to the Admin Portal"

# Add variables to settings before the file is imported
try:
    from .local_settings import *  # noqa
except ImportError:
    pass

# Load environment-specific settings
if PRODUCTION:
    try:
        from .prod_settings import *  # noqa
    except ImportError:
        pass
elif STAGING:
    try:
        from .staging_settings import *  # noqa
    except ImportError:
        pass
elif TESTING:
    try:
        from .test_settings import *  # noqa
    except ImportError:
        pass