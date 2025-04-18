This is a **custom user model** in Django, and it's doing a great job of replacing the default `User` with a more flexible version that uses **email instead of username** for authentication and adds fields like `phone`, `website`, `role`, and `full_name`.

Let’s break this down clearly 👇

---

### 🔧 1. `UserManager` — Your Custom Manager

This is where you define how users and superusers should be created:

#### `create_user()`

- Ensures email is provided
- Normalizes the email (`lowercase@domain.com`)
- Sets the password securely (`user.set_password(...)`)
- Saves to DB

#### `create_superuser()`

- Adds `is_staff=True`, `is_superuser=True`, `role='admin'`
- Validates these values to make sure the superuser is set up correctly
- Calls `create_user()` internally

> This makes `createsuperuser` work smoothly with your custom fields.

---

### 👤 2. `User` Model — Your Custom User Schema

This is the actual **User table** with custom fields and logic:

#### Inherited classes

- `AbstractBaseUser`: basic user model with password management
- `PermissionsMixin`: gives you permissions & groups support (like `is_superuser`, `has_perm()`)

#### Fields

| Field         | Purpose |
|---------------|---------|
| `email`       | Primary login field, made unique |
| `username`    | Optional field, not used for login |
| `phone`, `website` | Extra profile fields |
| `first_name`, `last_name`, `full_name` | Optional name fields |
| `role`        | Custom role (default: `'admin'`) |
| `is_active`, `is_staff` | Django permissions logic |
| `date_joined` | Timestamp when user is created |

#### Config

- `objects = UserManager()` → links the model with your custom manager
- `USERNAME_FIELD = 'email'` → tells Django to use `email` instead of `username` for login
- `REQUIRED_FIELDS = []` → nothing else is required besides email+password when running `createsuperuser`

---

### 💾 `save()` override

```python
def save(self, *args, **kwargs):
    if self.first_name and self.last_name and not self.full_name:
        self.full_name = f"{self.first_name} {self.last_name}"
    super().save(*args, **kwargs)
```

Auto-generates `full_name` if it's not set but first/last names are present.

---

### ✅ Summary

| ✅ What It Does | 💬 Description |
|----------------|----------------|
| Custom User | You’re overriding the default User model |
| Email Login | You’re authenticating with email instead of username |
| More Fields | Adds `phone`, `website`, `role`, etc. |
| Safe Passwords | Uses Django's secure password hashing |
| Admin Support | Fully compatible with `createsuperuser`, admin panel, permissions |

---

### 🔥 Want to use this model?

You need to tell Django about it in your `settings.py`:

```python
AUTH_USER_MODEL = 'authentication.User'
```

This must be done **before any migrations** are run, otherwise it’s hard to change later.

---

Let me know if you want a breakdown of how to write the login/register views using this model 🔐
