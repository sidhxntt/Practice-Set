# # api/urls.py
# from django.urls import path, include  # Added the include import
# from rest_framework.routers import DefaultRouter
# from . import views

# router = DefaultRouter()
# router.register('albums', views.AlbumViewSet) # Viewset means all HTTP Method already there
# router.register('images', views.ImageViewSet)
# router.register('posts', views.PostViewSet)
# router.register('todos', views.TodoViewSet)
# router.register('addresses', views.AddressViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

# # Now withing super-main (api app) these are the main routes exactly similar to our express node backend