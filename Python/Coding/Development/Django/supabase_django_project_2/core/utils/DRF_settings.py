def DRF(env):

    return {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated', # Requires authentication by default for all API views. Override per-view with @permission_classes. Sets global access control.
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication', # For token-based authentication, ideal for APIs (especially production)
        'rest_framework.authentication.SessionAuthentication', # Used mainly for browsable API/UI during development.
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ] if env.get('prod') else [
        'rest_framework.renderers.JSONRenderer', #  Only JSON responses (clean, API-focused)
        'rest_framework.renderers.BrowsableAPIRenderer', #  Enables the Browsable API, a helpful interactive UI for testing endpoints in-browser.
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination', # Adds pagination to API responses. Use ListAPIView, ModelViewSet, or generics.ListCreateAPIView that return queryset lists.
    'PAGE_SIZE': 20, # Default number of records per page.
    'DEFAULT_FILTER_BACKENDS':  #These are global, but can also be overridden per view. 
    [
        'django_filters.rest_framework.DjangoFilterBackend', # Filtering with query params: ?field=value. Add filterset_fields in your views or viewsets
        'rest_framework.filters.SearchFilter', # Searching across fields: ?search=value.  Add search_fields = ['title'] in your views or viewsets.
        'rest_framework.filters.OrderingFilter', # Ordering results: ?ordering=field or -field .  Add ordering_fields = ['title'] or ordering = ['-created_at'] in your views or viewsets.
    ],
    'DEFAULT_THROTTLE_CLASSES': [ # rate limitter
        'rest_framework.throttling.AnonRateThrottle', # Limits request rates per user or anonymous IP. Helps protect against abuse, DoS, and accidental flooding.
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour', # Anonymous users: Max 100 requests/hour.
        'user': '1000/hour', # Authenticated users: Max 1000 requests/hour.
    },
    'EXCEPTION_HANDLER': 'core.utils.exception_handlers.custom_exception_handler', # Points to a custom function to format exceptions globally. Useful for returning structured JSON errors instead of default DRF error responses.
}
