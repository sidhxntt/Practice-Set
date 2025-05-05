def installed_apps():

    DJANGO_APPS = [
        'django.contrib.admin', # Django Admin UI
        'django.contrib.auth', # User authentication system (login, groups, permissions)
        'django.contrib.contenttypes', # Support for generic relationships between models
        'django.contrib.sessions', # Manages session data (e.g., for logged-in users)
        'django.contrib.messages', # Flash messages between views (e.g., success alerts)
        'django.contrib.staticfiles', # Handles serving static files (CSS, JS)
        # 'django.contrib.sites',  # Required for proper domain handling
        # 'django.contrib.sitemaps',  # SEO optimization
    ]

    THIRD_PARTY_APPS = [
        'rest_framework', # Django REST Framework — API toolkit. Getting used in entire project only.
        'rest_framework_simplejwt', # JWT based auth initialisation. need to update DRF-settings, urls.py and simple_jwt_settings.py
        'corsheaders', # Enables CORS (Cross-Origin Resource Sharing) Getting used in middlewares.py
        'django_filters', # Provides filtering support for DRF. Getting used in DRF_settings.py
        'django_redis',
        'storages',  # Django-storages (e.g., S3, Azure) for managing media/static files remotely
        'health_check',  # Exposes a /health/ endpoint to check app health
        'health_check.db',  # Ensures database connectivity is OK. Getting used in in urls.py ->  path("health/", include("health_check.urls")) [CORE]
        'health_check.cache',  # Verifies cache backend (like Redis) is reachable
        'health_check.storage',  # Verifies storages like S3 is reachable
        'drf_spectacular', # API documentation, update DRF, urls
        'django_prometheus', #  Prometheus Monitoring , update url, middeware
        'whitenoise.runserver_nostatic',
        'django_elasticsearch_dsl',
        # all health checks (app, DB, cache, storage, etc.) are unified under a single endpoint, typically /health/.
    ]

    LOCAL_APPS = [
        'authentication',
        'api'
    ]

    return DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS