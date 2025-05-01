"""
Django production settings for core project.
These settings are configured for security, scalability, and best practices.
"""

import os
from datetime import timedelta
from pathlib import Path
import dj_database_url
from django.core.exceptions import ImproperlyConfigured

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Utility function to get environment variables
def get_env_value(env_variable, default=None):
    try:
        return os.getenv(env_variable, default)
    except KeyError:
        if default is not None:
            return default
        error_msg = f'Set the {env_variable} environment variable'
        raise ImproperlyConfigured(error_msg)

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY SETTINGS
# ------------------------------------------------------------------------------
SECRET_KEY = get_env_value('SECRET_KEY')
if get_env_value('SECRET_KEY') == 'django-insecure-default-key':
    import warnings
    warnings.warn(
        'Using insecure default SECRET_KEY. Set a proper SECRET_KEY in production!',
        UserWarning,
        stacklevel=2
    )

DEBUG = get_env_value('DEBUG', 'False').lower() == 'true'
ALLOWED_HOSTS = get_env_value('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Security middleware settings
SECURE_SSL_REDIRECT = get_env_value('SECURE_SSL_REDIRECT', 'True').lower() == 'true'
SECURE_HSTS_SECONDS = int(get_env_value('SECURE_HSTS_SECONDS', '31536000'))  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
CSRF_TRUSTED_ORIGINS = get_env_value('CSRF_TRUSTED_ORIGINS', '').split(',')

# APPLICATION DEFINITION
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',  # Required for proper domain handling
    'django.contrib.sitemaps',  # SEO optimization
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',  # Token authentication
    'corsheaders',
    'django_filters',
    'drf_spectacular',  # API documentation
    'storages',  # For AWS S3 or other storage backends
    'django_prometheus',  # Metrics for monitoring
    'health_check',  # Health check endpoints
    'health_check.db',  # Database health check
    'health_check.cache',  # Cache health check
    'health_check.storage',  # Storage health check
]

LOCAL_APPS = [
    'api',
    # Add other local apps here
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# MIDDLEWARE
# ------------------------------------------------------------------------------
MIDDLEWARE = [
    'django_prometheus.middleware.PrometheusBeforeMiddleware',  # Should be first
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Static file serving
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # Internationalization
    'django_prometheus.middleware.PrometheusAfterMiddleware',  # Should be last
]

# URL CONFIGURATION
# ------------------------------------------------------------------------------
ROOT_URLCONF = 'core.urls'

# TEMPLATES
# ------------------------------------------------------------------------------
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
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# DATABASE
# ------------------------------------------------------------------------------
# Default to sqlite for development, but use DATABASE_URL in production
DATABASE_URL = get_env_value('DATABASE_URL', '')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(DATABASE_URL)
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Database connection pooling
DATABASES['default']['CONN_MAX_AGE'] = int(get_env_value('DB_CONN_MAX_AGE', '60'))  # 60 seconds

# CACHING
# ------------------------------------------------------------------------------
REDIS_URL = get_env_value('REDIS_URL', '')

if REDIS_URL:
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': REDIS_URL,
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
                'IGNORE_EXCEPTIONS': not DEBUG,
                'SOCKET_CONNECT_TIMEOUT': 5,
                'SOCKET_TIMEOUT': 5,
            }
        }
    }
    # Use Redis for session cache if available
    SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
    SESSION_CACHE_ALIAS = 'default'
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
            'LOCATION': '',
        }
    }

# PASSWORD VALIDATION
# ------------------------------------------------------------------------------
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

# AUTHENTICATION
# ------------------------------------------------------------------------------
# Set custom user model if available
# AUTH_USER_MODEL = 'users.User'

# REST FRAMEWORK
# ------------------------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': int(get_env_value('API_PAGE_SIZE', '10')),
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': get_env_value('THROTTLE_ANON', '100/day'),
        'user': get_env_value('THROTTLE_USER', '1000/day'),
    },
    'EXCEPTION_HANDLER': 'core.exceptions.custom_exception_handler',
}

# JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(get_env_value('JWT_ACCESS_TOKEN_LIFETIME', '15'))),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=int(get_env_value('JWT_REFRESH_TOKEN_LIFETIME', '1'))),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# Spectacular API docs settings
SPECTACULAR_SETTINGS = {
    'TITLE': 'API Documentation',
    'DESCRIPTION': 'API documentation for the project',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

# CORS SETTINGS
# ------------------------------------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOWED_ORIGINS = get_env_value('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
CORS_ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# INTERNATIONALIZATION
# ------------------------------------------------------------------------------
LANGUAGE_CODE = get_env_value('LANGUAGE_CODE', 'en-us')
TIME_ZONE = get_env_value('TIME_ZONE', 'UTC')
USE_I18N = True
USE_L10N = True
USE_TZ = True

# SITE CONFIGURATION
# ------------------------------------------------------------------------------
SITE_ID = 1

# STATIC FILES (CSS, JavaScript, Images)
# ------------------------------------------------------------------------------
STATIC_URL = get_env_value('STATIC_URL', '/static/')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# Use WhiteNoise for static files
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# MEDIA CONFIGURATION
# ------------------------------------------------------------------------------
# Set S3 as default file storage if AWS settings are available
AWS_ACCESS_KEY_ID = get_env_value('AWS_ACCESS_KEY_ID', '')
AWS_SECRET_ACCESS_KEY = get_env_value('AWS_SECRET_ACCESS_KEY', '')
AWS_STORAGE_BUCKET_NAME = get_env_value('AWS_STORAGE_BUCKET_NAME', '')

if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY and AWS_STORAGE_BUCKET_NAME:
    # AWS Settings
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
    }
    AWS_LOCATION = 'media'
    AWS_DEFAULT_ACL = 'public-read'
    AWS_QUERYSTRING_AUTH = False
    
    # S3 Media settings
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
else:
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# EMAIL CONFIGURATION
# ------------------------------------------------------------------------------
EMAIL_BACKEND = get_env_value('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = get_env_value('EMAIL_HOST', 'localhost')
EMAIL_PORT = int(get_env_value('EMAIL_PORT', '25'))
EMAIL_HOST_USER = get_env_value('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = get_env_value('EMAIL_HOST_PASSWORD', '')
EMAIL_USE_TLS = get_env_value('EMAIL_USE_TLS', 'False').lower() == 'true'
DEFAULT_FROM_EMAIL = get_env_value('DEFAULT_FROM_EMAIL', 'webmaster@localhost')

# LOGGING
# ------------------------------------------------------------------------------
LOGGING = {
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
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/django.log'),
            'maxBytes': 1024 * 1024 * 5,  # 5 MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file', 'mail_admins'],
            'level': 'INFO',
        },
        'django.server': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['mail_admins', 'file'],
            'level': 'ERROR',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['console', 'file'],
            'level': 'INFO' if DEBUG else 'WARNING',
        },
    },
}

# Ensure logs directory exists
os.makedirs(os.path.join(BASE_DIR, 'logs'), exist_ok=True)

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CELERY CONFIGURATION
# ------------------------------------------------------------------------------
if get_env_value('USE_CELERY', 'False').lower() == 'true':
    CELERY_BROKER_URL = get_env_value('CELERY_BROKER_URL', REDIS_URL)
    CELERY_RESULT_BACKEND = get_env_value('CELERY_RESULT_BACKEND', REDIS_URL)
    CELERY_ACCEPT_CONTENT = ['application/json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_TIMEZONE = TIME_ZONE
    # Add Celery beat settings if needed
    CELERY_BEAT_SCHEDULE = {}

# ADMIN CONFIGURATION
# ------------------------------------------------------------------------------
ADMIN_URL = get_env_value('ADMIN_URL', 'admin/')
ADMINS = [x.split(':') for x in get_env_value('ADMINS', '').split(',') if x]
MANAGERS = ADMINS

# Sentry integration for error tracking
SENTRY_DSN = get_env_value('SENTRY_DSN', '')
if SENTRY_DSN:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration
    
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[DjangoIntegration()],
        traces_sample_rate=float(get_env_value('SENTRY_TRACES_SAMPLE_RATE', '0.1')),
        send_default_pii=False,
        environment=get_env_value('ENVIRONMENT', 'production'),
    )

# Custom settings based on environment
ENVIRONMENT = get_env_value('ENVIRONMENT', 'production')
if ENVIRONMENT == 'development':
    # Development specific settings
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INTERNAL_IPS = ['127.0.0.1']
elif ENVIRONMENT == 'production':
    # Production specific settings
    # Add any production-only settings here
    pass