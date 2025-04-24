def installed_apps(*your_apps, **third_party_apps):
    """
    Dynamically generates INSTALLED_APPS list for Django settings.
    
    Args:
        *your_apps: Your project's apps
        **third_party_apps: Third-party apps (values should be the actual package names)
        
    Returns:
        List of apps in proper Django order
    """
    base_apps = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    ]
    
    # Use the VALUES of third_party_apps (the actual package names)
    third_party = list(third_party_apps.values())
    
    return [*base_apps, *sorted(third_party), *your_apps]