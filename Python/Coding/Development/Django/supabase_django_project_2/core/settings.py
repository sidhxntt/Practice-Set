import os
from pathlib import Path
from core.utils.drf.installed_apps import installed_apps
from core.utils.drf.middlewares import middlewares
from core.utils.templates import templates
from core.utils.db_and_cache.databases import database_connections
from core.utils.db_and_cache.caching import caching
from core.utils.drf.app_pass_validators import app_pass_validators
from django.core.management.utils import get_random_secret_key
from core.utils.drf.DRF_settings import DRF
from core.utils.envs import get_env
from core.utils.drf.security import security_settings
import logging.config
from datetime import timedelta
from core.utils.logging.sentry import sentry

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
ROOT_URLCONF = 'core.urls'
TEMPLATES = templates(BASE_DIR)
WSGI_APPLICATION = 'core.wsgi.application'

# Database 
DATABASES = database_connections(env)

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
sentry(env)

# Static files
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'