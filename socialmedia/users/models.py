from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, blank=True, related_name="friend_profiles")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username
    
# Friend request model
class FriendRequest(models.Model):

    # Friend request status
    STATUS = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined')
    ]

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_friend_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_friend_requests")
    status = models.CharField(max_length=10, choices=STATUS, default='pending')

    class Meta:
        unique_together = ('sender', 'receiver') # Prevent duplicaton

    def accept(self):
        """Accepts friend request and adds users as friends"""
        self.status = 'accepted'
        self.save()
        self.sender.profile.friends.add(self.receiver)
        self.receiver.profile.friends.add(self.sender)

    def decline(self):
        """Declines friend request"""
        self.status = 'declined'
        self.save()

    def cancel(self):
        """Cancels friend request"""
        self.delete()

    def __str__(self):
        return f"{self.sender.username} -> {self.receiver.username} ({self.status})"