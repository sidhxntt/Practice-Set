# authentication/urls.py
from django.urls import path, include  # Added the include import
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)   # Viewset means all HTTP Method already there

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register_user, name='register'), # This is a manually defined route that points to a function-based view (register_user).
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
]