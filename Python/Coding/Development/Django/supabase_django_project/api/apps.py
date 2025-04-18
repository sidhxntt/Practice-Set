# api/apps.py
from django.apps import AppConfig

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = 'API Data Management'

# its like settings.py but for my api app

# apps.py (ApiConfig) | settings.py
    """_summary_
    App-level configuration                                                         | Project-wide configuration
    Applies only to this specific app (api)                                         | Applies to the entire Django project
    Used to define: app name, verbose name, signals, app-specific startup logic     | Used to define: installed apps, middleware, database settings, REST framework config, etc.
    Can be extended to run code when the app is ready (like registering signals)    | Not meant for per-app logic; just overall project wiring
    """