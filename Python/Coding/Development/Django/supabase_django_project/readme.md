# Supabase Django Project

A Django REST API project using Supabase PostgreSQL database with user authentication and data management.

## Features

- User authentication with Django's built-in auth system
- PostgreSQL integration with Supabase
- REST API endpoints using Django Rest Framework
- Admin interface for data management
- CORS support for frontend integration

## Project Structure

- `authentication/`: User authentication app
- `api/`: Data models and API endpoints
- `core/`: Main project settings

```bash
supabase_django_project/
├── .env                     # Environment variables (DATABASE_URL, etc.)
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
├── pdm.lock                 # PDM lock file
├── pyproject.toml           # PDM project dependencies
├── manage.py                # Django management script
├── core/                    # Core project settings
│   ├── __init__.py
│   ├── asgi.py              # ASGI configuration
│   ├── settings.py          # Django settings
│   ├── urls.py              # Main URL routing
│   └── wsgi.py              # WSGI configuration
├── api/                     # API app
│   ├── __init__.py
│   ├── admin.py             # Admin configuration
│   ├── apps.py              # App configuration
│   ├── migrations/          # Database migrations
│   ├── models.py            # Database models (mapped from Prisma schema)
│   ├── serializers.py       # DRF serializers for models
│   ├── urls.py              # API URL routing
│   └── views.py             # API views
└── authentication/          # Authentication app
    ├── __init__.py
    ├── admin.py             # Admin configuration
    ├── apps.py              # App configuration
    ├── migrations/          # Database migrations
    ├── models.py            # User model extensions
    ├── serializers.py       # User serializers
    ├── urls.py              # Auth URL routing
    └── views.py             # Authentication views
```

## Getting Started

### Prerequisites

- Python 3.10 or later
- PDM package manager
- Supabase account with a project

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pdm install
   ```

3. Create a `.env` file with your Supabase credentials:

   ```bash
   DATABASE_URL=postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   DIRECT_URL=postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

4. Run migrations:

   ```bash
   pdm run migrate
   ```

5. Create a superuser:

   ```bash
   pdm run createsuperuser
   ```

6. Start the development server:

   ```bash
   pdm run start
   ```

## API Endpoints

- `/api/albums/`: Album CRUD operations
- `/api/images/`: Image CRUD operations
- `/api/posts/`: Post CRUD operations
- `/api/todos/`: Todo CRUD operations
- `/api/addresses/`: Address CRUD operations
- `/auth/users/`: User management (admin only)
- `/auth/register/`: User registration
- `/auth/login/`: User login
- `/auth/logout/`: User logout

## Admin Interface

Access the admin interface at `/admin/` to manage all data.

## API routes

[POST] <http://127.0.0.1:8000/auth/login/>
[GET]  <http://127.0.0.1:8000/auth/users/>
