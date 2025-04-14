from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Post
from .serializers import PostSerializer

# Create your views here.

@api_view(['GET'])
def view_post(request, id=None):
    if request.method == 'GET':
        posts = Post.objects.all()                                  # Get all posts
        serializer = PostSerializer(posts, many=True)               # Use serializer
        return Response(serializer.data, status=status.HTTP_200_OK) # Reponse