# api/admin.py
from django.contrib import admin
from .models import Address, Album, Image, Post, Todos

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'street', 'city', 'zipcode', 'user')
    search_fields = ('street', 'city', 'zipcode')
    list_filter = ('city',)

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user')
    search_fields = ('title',)
    list_filter = ('user',)

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'album')
    search_fields = ('title',)
    list_filter = ('album',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user')
    search_fields = ('title', 'body')
    list_filter = ('user',)

@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'completed', 'user')
    search_fields = ('title',)
    list_filter = ('completed', 'user')