This `authentication/admin.py` file customizes how your **custom `User` model** appears and behaves in the Django admin panel.

You're extending Django’s built-in `UserAdmin` interface so it plays nicely with your custom fields (like `email`, `role`, `full_name`, `website`, etc).

---

### 🔍 Line-by-Line Breakdown

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
```

- You import Django’s default `UserAdmin` class (renaming it `BaseUserAdmin`), and extend it to match your custom model.
- Then you import your `User` model.

---

### 🧱 `UserAdmin` Class: How it controls the admin panel

```python
class UserAdmin(BaseUserAdmin):
```

You're customizing how Django's admin interface displays **your custom User model**.

---

#### ✅ `list_display`

```python
list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_staff')
```

These are the columns shown in the **user list view** in the admin dashboard.

> 🖥️ Think of this as the "table view" of all users.

---

#### 🎛️ `list_filter`

```python
list_filter = ('is_staff', 'role')
```

Adds filtering options in the right sidebar of the admin. You can quickly filter users by staff status or role.

---

#### 🧾 `fieldsets`

```python
fieldsets = (
    (None, {'fields': ('email', 'password')}),
    ('Personal info', {'fields': ('first_name', 'last_name', 'full_name', 'username', 'phone', 'website')}),
    ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'role', 'groups', 'user_permissions')}),
)
```

Controls the layout of the **"edit user" form** in the admin panel.

You’ve organized it into 3 sections:

1. **Basic login info**: `email`, `password`
2. **Personal info**: Name, phone, website, etc.
3. **Permissions**: All the flags and roles Django needs

---

#### ➕ `add_fieldsets`

```python
add_fieldsets = (
    (None, {
        'classes': ('wide',),
        'fields': ('email', 'password1', 'password2', 'role'),
    }),
)
```

Defines the form used when **creating** a new user via the admin panel.

Django wants `password1` and `password2` (for password confirmation).

---

#### 🔍 `search_fields`

```python
search_fields = ('email', 'username', 'first_name', 'last_name')
```

Enables the search bar for users in the admin dashboard — these are the fields it will search through.

---

#### 🗂️ `ordering`

```python
ordering = ('email',)
```

Sorts users by email by default in the admin panel.

---

### ✅ Registering the Model

```python
admin.site.register(User, UserAdmin)
```

Finally, you tell Django:  
> "Use **this custom `UserAdmin`** class whenever you display the `User` model in admin."

---

### 🧠 Why Do This?

Django’s default admin expects a built-in `User` model with:

- `username` as the login field
- no `role`, `phone`, or `website`

But *you* replaced the default model with your own — so this admin class helps Django display it properly.

Without this, you’d get errors or incomplete forms when you try to manage users.

---

### Let Me Know If You Want

- Admin panel theming or customization (like displaying profile photos)
- Group/role-based dashboard sections
- Read-only admin views for non-superusers

Want me to help add a custom dashboard for users next?
