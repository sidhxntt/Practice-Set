def app_pass_validators():
     """
     This app_pass_validators() function defines a list of password validators used by Django to enforce secure password creation practices.
     """
     return [
  {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', #Prevents users from using passwords that are too similar to their personal info (e.g., username, email).
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', # Ensures passwords are at least a certain length.
        'OPTIONS': {
            'min_length': 10,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', # Prevents use of common passwords like password123, qwerty, etc.
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', # Prevents passwords made up entirely of numbers (e.g., 1234567890).
    },
]

# When using a custom user model and handling user registration yourself ,Call Django's validate_password() before saving a password.