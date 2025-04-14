from django.db import models
from datetime import datetime

# Create your models here.
class Post(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.content
