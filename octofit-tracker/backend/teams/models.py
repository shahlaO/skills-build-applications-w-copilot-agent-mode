from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Team(models.Model):
    """Team model for collaborative fitness goals"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teams_created')
    members = models.ManyToManyField(User, related_name='teams', blank=True)
    team_goal = models.CharField(max_length=200, blank=True)
    total_points = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def update_total_points(self):
        """Update team's total points based on member activities"""
        from activities.models import Activity
        total = 0
        for member in self.members.all():
            member_points = Activity.objects.filter(user=member).aggregate(
                models.Sum('points_earned')
            )['points_earned__sum'] or 0
            total += member_points
        self.total_points = total
        self.save()
        return total
    
    class Meta:
        ordering = ['-total_points', 'name']

