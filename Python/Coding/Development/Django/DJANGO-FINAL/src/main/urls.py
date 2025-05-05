
from django.contrib import admin
from django.urls import path, include
from .views import home
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('api/', include('api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),     # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    # Get new access token
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),       # Optional
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'), # OpenAPI schema
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'), # Swagger UI
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'), # Redoc UI
    path('', include('django_prometheus.urls')), # This adds an endpoint at: /metrics .Prometheus will scrape this URL to collect metrics.

]
