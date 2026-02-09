from rest_framework import serializers
from .models import WorkoutSuggestion, UserWorkoutSuggestion


class WorkoutSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSuggestion
        fields = ['id', 'title', 'description', 'category', 'difficulty', 'duration',
                  'instructions', 'estimated_calories', 'equipment_needed', 'created_at']
        read_only_fields = ['created_at']


class UserWorkoutSuggestionSerializer(serializers.ModelSerializer):
    workout_details = WorkoutSuggestionSerializer(source='workout', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = UserWorkoutSuggestion
        fields = ['id', 'user', 'username', 'workout', 'workout_details', 'suggested_date',
                  'completed', 'completed_date', 'feedback', 'rating']
