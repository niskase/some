from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', view_post, name='post-list'),
    path('posts/<int:id>/', view_single_post, name='post-single'),
]
