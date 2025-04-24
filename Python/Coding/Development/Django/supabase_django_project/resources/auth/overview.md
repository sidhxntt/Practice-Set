# OVERVIEW

## 🧑‍💻 **Users in Django**  

### **1. Default User Model**  

Django's built-in `User` model (`django.contrib.auth.models.User`) defines core fields and behaviors:  

| Field              | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `username`         | Unique identifier for login (can be replaced with email in custom models). |
| `password`         | Hashed (never stored raw). Supports PBKDF2, Argon2, etc.               |
| `is_active`        | If `False`, user cannot log in (soft delete or banned).                |
| `is_staff`         | Grants access to the Django admin site (`/admin/`).                     |
| `is_superuser`     | Bypasses all permission checks (full admin rights).                     |

**Key Methods**:  

- `user.has_perm('app_label.permission_codename')` → Checks permissions.  
- `user.check_password('raw_password')` → Validates passwords.  

---

### **2. User Types & Capabilities**  

| User Type          | `is_authenticated` | `is_staff` | `is_superuser` | Capabilities                                                                 |
|--------------------|--------------------|------------|----------------|------------------------------------------------------------------------------|
| **Anonymous**     | ❌                 | ❌         | ❌             | Can access public views (if no permissions required).                        |
| **Regular User**  | ✅                 | ❌         | ❌             | Can access views marked for logged-in users. No admin access.                |
| **Staff User**    | ✅                 | ✅         | ❌             | Can log into Django admin but sees only what their permissions allow.        |
| **Superuser**     | ✅                 | ✅         | ✅             | Full admin access (bypasses all permissions). Can impersonate other users.   |

**Example**:  

```python
if request.user.is_staff:  # Staff users see a special dashboard
    return render(request, 'staff_dashboard.html')
```

---

## 🔐 **Authentication ("Who Are You?")**  

### **1. Session-Based Auth (Default)**  

- Uses cookies to persist login state.  
- Enabled by `django.contrib.sessions` and `django.contrib.auth`.  

**Flow**:  

1. User logs in via `login(request, user)`.  
2. Session ID stored in cookie → linked to user in DB.  
3. Subsequent requests use `request.user` to identify the user.  

**Key Views**:  

- `LoginView`, `LogoutView` (built-in).  

---

### **2. Token/JWT Auth (API-Focused)**  

**TokenAuthentication** (DRF):  

- User gets a token after login (`Token.objects.create(user=user)`).  
- Token sent in `Authorization: Token <token>` header for API requests.  

**JWT** (e.g., `djangorestframework-simplejwt`):  

- Stateless tokens with expiry. Useful for microservices.  

**Example**:  

```python
# settings.py (DRF)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}
```

---

## 🔐 **Authorization ("What Can You Do?")**  

### **1. Django Model Permissions**  

Auto-created for models (e.g., `blog.add_post`, `blog.delete_post`).  

**Assign Permissions**:  

- Via admin or code:  

  ```python
  user.user_permissions.add(permission)  # Directly to user
  group.permissions.add(permission)      # Via groups
  ```

**Check Permissions**:  

```python
if user.has_perm('app.delete_post'):  # Can the user delete posts?
    post.delete()
```

---

### **2. Django REST Framework (DRF) Permissions**  

| Permission Class               | Behavior                                                                 |
|--------------------------------|--------------------------------------------------------------------------|
| `AllowAny`                     | No restrictions (public API).                                            |
| `IsAuthenticated`              | Only logged-in users (e.g., for user profiles).                          |
| `IsAdminUser`                  | Requires `is_staff=True`.                                                |
| `DjangoModelPermissions`       | Maps HTTP methods to model perms (`GET` → `view`, `POST` → `add`, etc.). |
| `IsOwnerOrReadOnly` (Custom)   | Only the owner can edit (e.g., `user == obj.owner`).                     |

**Example**:  

```python
# views.py
from rest_framework.permissions import IsAuthenticated

class PrivateAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Blocks anonymous users
```

---

## 👥 **Groups & Roles**  

### **1. Groups**  

- Predefined permission bundles (e.g., "Editors", "Moderators").  

**Assign Users to Groups**:  

```python
editors = Group.objects.get(name='Editors')
user.groups.add(editors)  # User inherits group permissions
```

**Typical Use Case**:  

- Group "Editors" has `blog.change_post`, `blog.delete_post`.  
- Group "Viewers" has `blog.view_post`.  

---

### **2. Custom Roles (Advanced)**  

Extend the `User` model to add role-based logic:  

```python
class User(AbstractUser):
    ROLES = (
        ('ADMIN', 'Admin'),
        ('EDITOR', 'Editor'),
    )
    role = models.CharField(max_length=10, choices=ROLES)

# Usage:
if user.role == 'ADMIN':  # Custom logic
    grant_admin_access()
```

---

## 🔄 **Sessions**  

- Stores user state (e.g., cart items, preferences).  
- Accessed via `request.session`:  

```python
request.session['last_visit'] = datetime.now()  # Save data
last_visit = request.session.get('last_visit')  # Retrieve
```

---

## 📧 **Password Management**  

- **Hashing**: PBKDF2 (default), bcrypt, Argon2.  
- **Reset Flow**:  

  ```python
  from django.contrib.auth.views import PasswordResetView
  urlpatterns = [path('reset/', PasswordResetView.as_view())]
  ```

---

## 🛠 **Common Scenarios**  

| Scenario                          | Solution                                                                 |
|-----------------------------------|--------------------------------------------------------------------------|
| **Only owners can edit**          | Use `IsOwnerOrReadOnly` (custom permission class).                       |
| **Role-based access**             | Extend `User` or use `Groups`.                                          |
| **API + Web hybrid auth**         | Use `SessionAuthentication` (web) + `TokenAuthentication` (API).         |
| **Social login (Google/GitHub)**  | Use `django-allauth`.                                                   |

---

### **Example: Custom Permission (IsOwner)**  

```python
# permissions.py
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user  # obj must have an `owner` field

# Usage in a view:
class EditPostView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
```

---

### **Key Takeaways**  

- **Anonymous Users**: Can only access public resources.  
- **Regular Users**: Can interact with data they own/have permissions for.  
- **Staff/Superusers**: Admin access (limited or full).  
- **Permissions**: Define granular actions (`add`, `view`, etc.).  
- **Groups**: Simplify permission management for user categories.  
