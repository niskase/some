from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Post
from .serializers import PostSerializer

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def view_post(request, id=None):
    if request.method == 'GET':
        if id:
            post = Post.objects.get(pk=id)                              # Get single post by ID
            serializer = PostSerializer(post, many=False)               # Use serializer
            return Response(serializer.data, status=status.HTTP_200_OK) # Reponse
        else:
            posts = Post.objects.all()                                  # Get all posts
            serializer = PostSerializer(posts, many=True)               # Use serializer
            return Response(serializer.data, status=status.HTTP_200_OK) # Reponse
    
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)