from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.permissions import AllowAny

from .serializers import RegisterSerializer

# Create your views here.
User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]