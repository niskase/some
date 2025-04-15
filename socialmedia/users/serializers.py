from rest_framework import serializers
from .models import FriendRequest, Profile
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

class FriendSerializer(serializers.ModelSerializer):
    first_name = serializers.StringRelatedField(source='profile.first_name')
    last_name = serializers.StringRelatedField(source='profile.last_name')
    username = serializers.StringRelatedField(source='profile.user.username', read_only=True) 
    
    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'username']

class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True) 

    friends = FriendSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'friends', 'full_name', 'username']
        
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    