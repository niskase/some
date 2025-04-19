from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(default=datetime.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    likes = models.ManyToManyField(User, blank=True, related_name="likes")

    def __str__(self):
        return self.content
