# authentication/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # You can send a password when creating/updating the user. But DRF will never include it in the API response.
    
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'username', 'first_name', 'last_name', 
                 'full_name', 'phone', 'website', 'role']
        read_only_fields = ['id']
    
    def create(self, validated_data):
        """_summary_
        This overrides the default create() logic. Why?
        Because:
        You're using a custom user model (User) And create_user() is your custom method in UserManager which:
            Hashes the password correctly (set_password)
            Handles email normalization and other logic
        If you didn't override create(), DRF would try to do User(**validated_data).save() — which won’t hash the password! ❌
        """
        user = User.objects.create_user(**validated_data)
        return user
