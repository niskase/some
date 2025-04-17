from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import RegisterSerializer, FriendRequestSerializer
from .models import FriendRequest

# Create your views here.
User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Create friend request
@api_view(['POST'])
def create_friend_request(request):
    if not request.user.is_authenticated:
        return Response({'msg': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    receiver = get_object_or_404(User, username=request.data.get('receiver_name'))
    if receiver == request.user:
        return Response({'msg': 'You cannot send a friend request to yourself'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if request exist
    existing_request = FriendRequest.objects.filter(sender=request.user, receiver=receiver).first()
    if existing_request:
        return Response({'msg': 'Friend request already sent'}, status=status.HTTP_400_BAD_REQUEST)

    # Create
    friend_request = FriendRequest.objects.create(sender=request.user, receiver=receiver)
    serializer = FriendRequestSerializer(friend_request)
    return Response({'msg': 'Friend request sent successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)

# List all sent and received friend requests
@api_view(['GET'])
def list_friend_requests(request):
    if not request.user.is_authenticated:
        return Response({'msg': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    sent_requests = FriendRequest.objects.filter(sender=request.user)
    received_requests = FriendRequest.objects.filter(receiver=request.user)

    all_requests = sent_requests | received_requests

    serializer = FriendRequestSerializer(all_requests, many=True)
    return Response({'msg': 'Successfully retrieved friend requests', 'data': serializer.data}, status=status.HTTP_200_OK)

# Accept friend request
@api_view(['PUT'])
def accept_friend_request(request, pk):
    if not request.user.is_authenticated:
        return Response({'msg': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    friend_request = get_object_or_404(FriendRequest, pk=pk)

    # Check if request reveiver is current user
    if friend_request.receiver != request.user:
        return Response({'msg': 'You can only accept friend requests sent to you'}, status=status.HTTP_400_BAD_REQUEST)

    # Accept
    friend_request.accept()
    return Response({'msg': 'Friend request accepted'}, status=status.HTTP_200_OK)

# Decline friend request
@api_view(['PUT'])
def decline_friend_request(request, pk):
    if not request.user.is_authenticated:
        return Response({'msg': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    friend_request = get_object_or_404(FriendRequest, pk=pk)

    # Check if request reveiver is current user
    if friend_request.receiver != request.user:
        return Response({'msg': 'You can only decline friend requests sent to you'}, status=status.HTTP_400_BAD_REQUEST)

    # Decline
    friend_request.decline()
    return Response({'msg': 'Friend request declined'}, status=status.HTTP_200_OK)

# Cancel friend request
@api_view(['DELETE'])
def cancel_friend_request(request, pk):
    if not request.user.is_authenticated:
        return Response({'msg': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

    friend_request = get_object_or_404(FriendRequest, pk=pk)

    # Check that user has sent request
    if friend_request.sender != request.user:
        return Response({'msg': 'You can only cancel requests you have sent'}, status=status.HTTP_400_BAD_REQUEST)

    # Cancel
    friend_request.cancel()
    return Response({'msg': 'Friend request cancelled'}, status=status.HTTP_200_OK)
