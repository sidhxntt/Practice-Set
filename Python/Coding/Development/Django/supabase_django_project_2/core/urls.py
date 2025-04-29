from django.contrib import admin
from django.urls import path, include
from api.views import home
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path("health/", include("health_check.urls")),
    path('', home),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),     # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    # Get new access token
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),       # Optional
]
