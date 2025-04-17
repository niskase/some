from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', view_post, name='post-list'),
    path('posts/<int:id>/', view_single_post, name='post-single'),
    path('posts/<int:post_id>/like/', post_like, name='post-like'),  # GET, PUT, PATCH ja DELETE pyynnöt ID:n kanssa
]
