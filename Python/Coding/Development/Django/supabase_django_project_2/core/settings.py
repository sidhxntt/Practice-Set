import os
from pathlib import Path
from .utils.installed_apps import installed_apps
from .utils.middlewares import middlewares
from .utils.templates import templates
from .utils.databases import database_connections
from .utils.caching import caching
from .utils.app_pass_validators import app_pass_validators
from django.core.management.utils import get_random_secret_key
from .utils.DRF_settings import DRF
from .utils.envs import get_env
from .utils.security import security_settings
import logging.config
from datetime import timedelta

env = get_env()
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

# Allowed hosts configuration
ALLOWED_HOSTS = []
if env.get('prod') or env.get('stage'):
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

globals().update(security_settings(env))

INSTALLED_APPS = installed_apps()
MIDDLEWARE = middlewares()
ROOT_URLCONF = 'core.urls'
TEMPLATES = templates()
WSGI_APPLICATION = 'core.wsgi.application'
DATABASES = database_connections(env)
CACHES = caching(env)
AUTH_PASSWORD_VALIDATORS = app_pass_validators()

# REST Framework settings
# -------------------------------------------------------------------------
REST_FRAMEWORK = DRF()
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
    CORS_PREFLIGHT_MAX_AGE = 86400  #Tells browsers to cache the CORS preflight request (an OPTIONS call) for 24 hours (86400 seconds). Reduces the number of preflight checks, improving performance.

# INTERNATIONALIZATION
# -------------------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
