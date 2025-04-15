from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

# Friend serializer
class FriendSerializer(serializers.ModelSerializer):
    first_name = serializers.StringRelatedField(source='profile.first_name')
    last_name = serializers.StringRelatedField(source='profile.last_name')
    username = serializers.StringRelatedField(source='profile.user.username', read_only=True) 
    
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'username']

# Profile serializer
class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True) 

    friends = FriendSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'friends', 'full_name', 'username']
        
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

# Registration serializer
class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, data):
        # Check that passwords match
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Password does not match")

        # Check if email exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Error occurred"})

        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
    