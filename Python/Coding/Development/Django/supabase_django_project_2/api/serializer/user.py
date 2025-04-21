from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    """Minimal nested user representation."""
    
    class Meta:
        model = User
        fields = ['id', 'username']
        read_only_fields = ['id', 'username']