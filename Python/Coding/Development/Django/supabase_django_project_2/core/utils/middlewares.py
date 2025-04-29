def middlewares():
    "Middleware is like a pipeline — each request and response passes through it in a specific order as (req -> m1 -> m2 -> m3 -> so on -> res)"
    return [
    'core.middleware.request_logging.RequestLoggingMiddleware',  # (Custom Middleware) Logs details about every incoming request: method, path, user, IP, response time, etc.
    'django.middleware.security.SecurityMiddleware', # Adds important security headers like Strict-Transport-Security, X-Content-Type-Options, X-XSS-Protection. Also redirects HTTP → HTTPS (if SECURE_SSL_REDIRECT=True).
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Lets Django serve static files directly, especially useful on platforms like Heroku.  Replaces the need for nginx during dev or on limited production.
    'django.contrib.sessions.middleware.SessionMiddleware', # Enables Django’s session support (cookies + DB-based sessions).
    'corsheaders.middleware.CorsMiddleware',  # From django-cors-headers. Handles CORS headers for cross-origin requests (e.g., your React frontend on localhost:3000 hitting Django backend on 8000).
    'django.middleware.common.CommonMiddleware', # Adds features like: URL rewriting (e.g. example.com → example.com/) Handles APPEND_SLASH, PREPEND_WWW Mostly for housekeeping.
    'django.middleware.csrf.CsrfViewMiddleware', # Protects against Cross-Site Request Forgery. Required for form POSTs. Adds CSRF token validation .You must use {% csrf_token %} in templates.
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Sets request.user. Required for @login_required, permissions, user-based logic. Works with SessionMiddleware or token-based auth (via DRF)
    'django.contrib.messages.middleware.MessageMiddleware', # Supports Django’s flash messaging framework (like success alerts after form submission).Adds messages context to templates. Works with {% if messages %} in HTML.
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # Adds the header: X-Frame-Options: DENY . Prevents your site from being embedded in an <iframe> (protection from clickjacking).
    'core.middleware.security.SecurityHeadersMiddleware',  # Custom security headers
]