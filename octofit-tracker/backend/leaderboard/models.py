from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class LeaderboardEntry(models.Model):
    """Leaderboard entry to track user rankings"""
    PERIOD_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('all_time', 'All Time'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    period = models.CharField(max_length=10, choices=PERIOD_CHOICES, default='all_time')
    rank = models.IntegerField()
    points = models.IntegerField(default=0)
    activities_count = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - Rank {self.rank} ({self.period})"
    
    class Meta:
        ordering = ['rank']
        verbose_name_plural = 'Leaderboard Entries'
        unique_together = ['user', 'period', 'start_date']

