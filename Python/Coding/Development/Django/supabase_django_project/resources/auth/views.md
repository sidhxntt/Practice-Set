

## 🚦 File Goal: `authentication/views.py`

This file defines the **user-related endpoints**:

1. List, create, update, delete users (for admins)
2. Register new users
3. Log in users
4. Log out users

It uses:

- **ViewSets** for admin-friendly user management
- **Function-based views** for `register`, `login`, and `logout` endpoints
- **Session-based authentication** (default Django login system)

---

### 1. **`UserViewSet` — Admin CRUD for Users**

```python
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
```

🔹 **Purpose**: Automatically generates RESTful API endpoints for the `User` model:

| HTTP Method | URL           | Action        | Description                  |
|-------------|---------------|---------------|------------------------------|
| GET         | `/users/`     | list          | List all users               |
| POST        | `/users/`     | create        | Create new user              |
| GET         | `/users/1/`   | retrieve      | Get user with ID 1           |
| PUT/PATCH   | `/users/1/`   | update/partial_update | Update user info     |
| DELETE      | `/users/1/`   | destroy       | Delete user with ID 1        |

🔐 `permission_classes = [IsAdminUser]`  
Means only **admin users** (those with `is_staff=True`) can access this viewset.

🚀 DRF does all this for you when you inherit from `ModelViewSet`.

---

### 2. **`register_user` — Public User Registration**

```python
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

🧩 This view:

- Accepts POST requests like:

  ```json
  {
    "email": "a@example.com",
    "password": "secure123",
    "first_name": "Alice",
    "last_name": "Smith"
  }
  ```

- Uses `UserSerializer` to validate and save the data
- Calls `.save()` → internally calls `User.objects.create_user(...)` because you overrode the `create()` method in your serializer

🔓 `@permission_classes([AllowAny])`: Anyone (even not logged in) can register.

🧠 Note: You hid the password from being returned by setting `write_only=True` in the serializer.

---

### 3. **`login_user` — Email + Password Login**

```python
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
```

💡 Steps:

1. Extract email + password from request body.
2. `authenticate(...)`: Checks the credentials (via Django's auth backend).
   - It uses your custom `UserManager` + `AUTH_USER_MODEL`
3. If valid:
   - `login(...)` creates a **session cookie**.
   - This sets up the login session on the server (you can now access `request.user`)
4. Returns serialized user data (excluding password).

🧠 You’re using Django's **session-based authentication**.

---

### 4. **`logout_user` — Logging Out**

```python
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({'message': 'Successfully logged out'})
```

🔐 `@permission_classes([IsAuthenticated])`: Only users with a valid session can access this.

- `logout(request)` destroys the current session and logs out the user.
- Returns a success message.

---

### 📦 Summary Table

| View | URL | Auth | Action |
|------|-----|------|--------|
| `UserViewSet` | `/users/` | Admin only | Admin CRUD on users |
| `register_user` | `/register/` | Anyone | Create a new user |
| `login_user` | `/login/` | Anyone | Start a login session |
| `logout_user` | `/logout/` | Logged-in users | End the session |

---

### 🔐 Authentication Type

You're using **session-based auth**:

- Django stores session data on the server.
- Logged-in users get a cookie.
- This is great for web apps.

If you wanted to use **token-based auth** (for mobile apps or SPA clients), you could use:

- DRF's Token Authentication
- JWT with packages like `djangorestframework-simplejwt`

---

Let me know if you want:

- JWT-based login instead of sessions
- Password reset support
- Throttling or rate limits
- Custom permissions (e.g., allow user to update their own profile only)

Happy to help with all of it 🚀
