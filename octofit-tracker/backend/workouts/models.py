from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class WorkoutSuggestion(models.Model):
    """Personalized workout suggestions for users"""
    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    CATEGORY_CHOICES = [
        ('cardio', 'Cardio'),
        ('strength', 'Strength'),
        ('flexibility', 'Flexibility'),
        ('balance', 'Balance'),
        ('endurance', 'Endurance'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES)
    duration = models.IntegerField(help_text='Duration in minutes')
    instructions = models.TextField()
    estimated_calories = models.IntegerField(null=True, blank=True)
    equipment_needed = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} - {self.difficulty}"
    
    class Meta:
        ordering = ['difficulty', 'category']


class UserWorkoutSuggestion(models.Model):
    """Track workout suggestions assigned to users"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workout_suggestions')
    workout = models.ForeignKey(WorkoutSuggestion, on_delete=models.CASCADE, related_name='user_assignments')
    suggested_date = models.DateField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    completed_date = models.DateField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    rating = models.IntegerField(null=True, blank=True, help_text='Rating from 1-5')
    
    def __str__(self):
        return f"{self.user.username} - {self.workout.title}"
    
    class Meta:
        ordering = ['-suggested_date']
        unique_together = ['user', 'workout', 'suggested_date']

