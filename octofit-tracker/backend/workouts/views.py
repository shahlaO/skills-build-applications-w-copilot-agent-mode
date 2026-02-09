from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime
from .models import WorkoutSuggestion, UserWorkoutSuggestion
from .serializers import WorkoutSuggestionSerializer, UserWorkoutSuggestionSerializer
from users.models import UserProfile

# Create your views here.

class WorkoutSuggestionViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSuggestion.objects.all()
    serializer_class = WorkoutSuggestionSerializer
    
    @action(detail=False, methods=['get'])
    def personalized(self, request):
        """Get personalized workout suggestions based on user fitness level"""
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': 'user_id required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            profile = UserProfile.objects.get(user_id=user_id)
            workouts = self.queryset.filter(difficulty=profile.fitness_level)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            # Return beginner workouts by default
            workouts = self.queryset.filter(difficulty='beginner')
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)


class UserWorkoutSuggestionViewSet(viewsets.ModelViewSet):
    queryset = UserWorkoutSuggestion.objects.all()
    serializer_class = UserWorkoutSuggestionSerializer
    
    @action(detail=True, methods=['post'])
    def mark_completed(self, request, pk=None):
        """Mark a workout suggestion as completed"""
        suggestion = self.get_object()
        suggestion.completed = True
        suggestion.completed_date = request.data.get('completed_date', datetime.now().date())
        suggestion.save()
        serializer = self.get_serializer(suggestion)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def my_suggestions(self, request):
        """Get workout suggestions for a specific user"""
        user_id = request.query_params.get('user_id')
        if user_id:
            suggestions = self.queryset.filter(user_id=user_id)
            serializer = self.get_serializer(suggestions, many=True)
            return Response(serializer.data)
        return Response({'error': 'user_id required'}, status=status.HTTP_400_BAD_REQUEST)

