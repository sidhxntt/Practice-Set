# api/models.py
from django.db import models
from authentication.models import User

class Address(models.Model):
    street = models.CharField(max_length=255)
    suite = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=20)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='address')
    
    def __str__(self):
        return f"{self.street}, {self.city}"
    
    class Meta:
        verbose_name_plural = "Addresses"

class Album(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='albums')
    
    def __str__(self):
        return self.title

class Image(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    thumbnailUrl = models.URLField()
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='images')
    
    def __str__(self):
        return self.title

class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    
    def __str__(self):
        return self.title

class Todos(models.Model):
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Todos"