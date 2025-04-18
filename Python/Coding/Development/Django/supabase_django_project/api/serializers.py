# api/serializers.py
# (So serialization fetches the data from db from the specific model and convert into json object.)
from rest_framework import serializers
from .models import Address, Album, Image, Post, Todos

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'suite', 'city', 'zipcode', 'user']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'url', 'thumbnailUrl', 'album']

class AlbumSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Album
        fields = ['id', 'title', 'user', 'images']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'body', 'user']

class TodosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ['id', 'title', 'completed', 'user']