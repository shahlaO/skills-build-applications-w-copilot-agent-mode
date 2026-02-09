from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Activity(models.Model):
    """Activity tracking model for fitness activities"""
    ACTIVITY_TYPE_CHOICES = [
        ('running', 'Running'),
        ('walking', 'Walking'),
        ('cycling', 'Cycling'),
        ('swimming', 'Swimming'),
        ('strength', 'Strength Training'),
        ('yoga', 'Yoga'),
        ('sports', 'Sports'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPE_CHOICES)
    duration = models.IntegerField(help_text='Duration in minutes')
    distance = models.FloatField(null=True, blank=True, help_text='Distance in km')
    calories_burned = models.IntegerField(null=True, blank=True)
    points_earned = models.IntegerField(default=0)
    notes = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        # Calculate points based on duration (1 point per minute)
        if not self.points_earned:
            self.points_earned = self.duration
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.username} - {self.activity_type} on {self.date}"
    
    class Meta:
        ordering = ['-date', '-created_at']
        verbose_name_plural = 'Activities'

