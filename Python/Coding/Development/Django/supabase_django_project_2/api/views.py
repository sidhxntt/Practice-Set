from rest_framework import viewsets, filters, permissions
from rest_framework.throttling import UserRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import Address, Album, Image, Post, Todo
from .serializers import AddressSerializer, AlbumSerializer, ImageSerializer, PostSerializer, TodoSerializer


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission that allows read access to anyone but restricts write operations to the object's owner

Checks if the request method is safe (GET, HEAD, OPTIONS) or if the requesting user owns the object
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the owner
        return obj.user == request.user


class BaseModelViewSet(viewsets.ModelViewSet):
    """
    Base viewset with common configurations.
    """
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    throttle_classes = [UserRateThrottle] # rate limitter
    
    def get_queryset(self):
        """
        This ensures that users can only see their own data by default.
        Override in child classes as needed.
        """
        model = self.queryset.model
        if hasattr(model, 'user'):
            return self.queryset.filter(user=self.request.user)
        return self.queryset


class AddressViewSet(BaseModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.select_related('user').all()
    filterset_fields = ['city', 'state', 'zipcode', 'country']
    search_fields = ['street', 'city', 'zipcode']
    ordering_fields = ['created_at', 'city', 'state', 'zipcode']
    ordering = ['-created_at']


class AlbumViewSet(BaseModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.select_related('user').prefetch_related('image_set').all()
    filterset_fields = ['category']
    search_fields = ['title']
    ordering_fields = ['created_at', 'title', 'category']
    ordering = ['-created_at']
    
    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ImageViewSet(BaseModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.select_related('album', 'user', 'album__user').all()
    filterset_fields = ['album']
    search_fields = ['title', 'album__title']
    ordering_fields = ['created_at', 'title', 'album__title']
    ordering = ['-created_at']

    def get_queryset(self):
        """
        Users can view images in albums they have access to
        """
        return Image.objects.select_related('album', 'user').filter(
            user=self.request.user
        )


class PostViewSet(BaseModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.select_related('user').all()
    filterset_fields = []
    search_fields = ['title', 'body']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']

    @method_decorator(cache_page(60 * 5))  # Cache for 5 minutes
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class TodoViewSet(BaseModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.select_related('user').all()
    filterset_fields = ['completed']
    search_fields = ['title']
    ordering_fields = ['created_at', 'title', 'completed']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        """
        Set the user automatically when creating a todo item
        """
        serializer.save(user=self.request.user)