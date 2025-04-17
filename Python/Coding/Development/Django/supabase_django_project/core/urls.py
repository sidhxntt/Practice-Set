# core/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),        
    path('auth/', include('authentication.urls')),
]

# In Express, we'd define all main route groups in main_routes.ts (e.g., /api/users, /api/posts).
# In Django, we modularize it — each app (e.g., api) manages its own routes in its urls.py file.
# So u can say in django this super main routes.
