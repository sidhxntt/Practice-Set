# 🔐 Django Authentication: Sessions vs JWT + SECRET_KEY Security

## ✅ 1. Django’s Default Authentication System (Session-Based)

Django ships with a **stateful, server-side session-based** authentication system.

### 🔄 How It Works

1. User submits login credentials.
2. Django verifies them and creates a **session** (stored in DB/cache).
3. Sends a signed `sessionid` cookie to the client.
4. On each request, client sends the cookie → Django fetches and validates session.

### 🧩 Core Components

| Component                      | Role                                                                 |
|-------------------------------|----------------------------------------------------------------------|
| `django.contrib.auth`         | Handles users, groups, permissions                                   |
| `django.contrib.sessions`     | Manages session storage (DB, cache, etc.)                            |
| Session Middleware            | Attaches session to request/response                                |
| CSRF Middleware                | Protects against CSRF via tokens                                     |

### 🔐 Security Features

- **Session cookie signing** using `SECRET_KEY` (prevents tampering)
- **CSRF protection** using signed tokens
- **Password hashing** (PBKDF2, Argon2, bcrypt)
- **Session expiry** (configurable via `SESSION_COOKIE_AGE`)

---

## 🔑 Django’s `SECRET_KEY`: What It Secures

### 🧩 What It Does

| Feature                        | Role of `SECRET_KEY`                                      |
|-------------------------------|------------------------------------------------------------|
| Session Cookie                | Signs (not encrypts) `sessionid` to prevent tampering      |
| CSRF Tokens                   | Generates and validates CSRF protection tokens             |
| Password Reset                | Signs secure reset tokens                                 |
| Signed Values (e.g., messages)| Uses HMAC + `SECRET_KEY` to ensure data integrity          |

### ⚠️ If Leaked?

- Attackers can:
  - Forge sessions or CSRF tokens
  - Hijack users or escalate access
- 🔁 **Rotate immediately** → All sessions/logins will become invalid
