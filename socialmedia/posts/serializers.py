from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):

    username = serializers.StringRelatedField(source='owner.profile.user.username', read_only=True)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_by', 'username']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)
    
    def get_likes(self, obj):
        return [like.username for like in obj.likes.all()]