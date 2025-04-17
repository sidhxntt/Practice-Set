# api/views.py
from rest_framework import viewsets
from .models import Address, Album, Image, Post, Todos
from .serializers import AddressSerializer, AlbumSerializer, ImageSerializer, PostSerializer, TodosSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all() # prisma.album.findMany()
    serializer_class = AddressSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todos.objects.all()
    serializer_class = TodosSerializer
