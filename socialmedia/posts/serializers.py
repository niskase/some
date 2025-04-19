from rest_framework import serializers
from .models import Post
import json

class PostSerializer(serializers.ModelSerializer):

    created_by = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_by']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)
    
    def get_created_by(self, obj):
        profile = getattr(obj.created_by, 'profile', None)
        return {
            "first_name": profile.first_name if profile else '',
            "last_name": profile.last_name if profile else '',
            "user_id": obj.created_by.id,
            "username": obj.created_by.username,
        }
    
    def get_likes(self, obj):
        users = []
        for user in obj.likes.all():
            newuser = {}
            newuser["first_name"] = user.profile.first_name
            newuser["last_name"] = user.profile.last_name
            newuser["user_id"] = user.id
            newuser["username"]= user.username
            users.append(newuser)
        return users