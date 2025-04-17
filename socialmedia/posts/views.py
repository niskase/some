from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from users.models import Profile
from .models import Post
from .serializers import PostSerializer

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def view_post(request):
    if request.method == 'GET':
        
        # Get current user ID
        user = request.user

        # Get profile of current user
        profile = get_object_or_404(Profile, user=user)     

        # Get friend IDs
        friend_ids = profile.friends.values_list('id', flat=True)

        # Get posts, filtered by own used ID and friend ID's, ordered by latest first
        posts = Post.objects.filter(created_by__id__in=[user.id, *friend_ids]).order_by('-created_at')

        # Use serializer
        serializer = PostSerializer(posts, many=True)

        # Response
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_single_post(request, id):
            
        # Get current user ID
        user = request.user

        # Get profile of current user
        profile = get_object_or_404(Profile, user=user)     

        # Get friend IDs
        friend_ids = profile.friends.values_list('id', flat=True)

        # Filter for created_by
        post = Post.objects.filter(pk=id, created_by__id__in=[user.id, *friend_ids]).first()

        # Use serializer
        serializer = PostSerializer(post, many=False)

        # Response
        return Response(serializer.data, status=status.HTTP_200_OK) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_like(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return Response({'msg': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    # Lisää käyttäjä likes-kenttään, jos sitä ei ole vielä
    if request.user not in post.likes.all():
        post.likes.add(request.user)
        return Response({'msg': 'Post liked successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'msg': 'You have already liked this post'}, status=status.HTTP_400_BAD_REQUEST)
