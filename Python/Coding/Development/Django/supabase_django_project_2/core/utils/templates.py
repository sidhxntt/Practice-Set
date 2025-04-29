def templates():
    """
    This function templates() returns the Django TEMPLATES setting, which tells Django how to render templates (HTML). 
    """
    return  [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates', # This sets the template engine. Django supports multiple backends (like Jinja2), but this uses the default Django Template Language (DTL).
        'DIRS': [], # This is a list of filesystem paths where Django should look for templates outside your app directories.  is where you'd put shared/global templates like a base layout (base.html).
        'APP_DIRS': True, # This tells Django to look for templates inside each installed app under: your_app/templates/
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug', # Adds {{ debug }} context if DEBUG=True
                'django.template.context_processors.request', # Makes the current request object available in templates
                'django.contrib.auth.context_processors.auth', # Adds {{ user }}, {{ perms }} (for auth templates)
                'django.contrib.messages.context_processors.messages', # Adds Django messages framework (e.g. flash alerts)
                'core.context_processors.settings_context',  # My Custom context processor
            ],
        },
    },
]
