from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('friend-request/', views.create_friend_request, name='create_friend_request'),
    path('friend-request/list/', views.list_friend_requests, name='list_friend_requests'),
    path('friend-request/<int:pk>/accept/', views.accept_friend_request, name='accept_friend_request'),
    path('friend-request/<int:pk>/decline/', views.decline_friend_request, name='decline_friend_request'),
    path('friend-request/<int:pk>/cancel/', views.cancel_friend_request, name='cancel_friend_request'),
]