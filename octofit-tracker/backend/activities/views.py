from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Activity
from .serializers import ActivitySerializer
from users.models import UserProfile

# Create your views here.

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    def perform_create(self, serializer):
        """Create activity and update user points"""
        activity = serializer.save()
        # Update user profile points
        try:
            profile = UserProfile.objects.get(user=activity.user)
            profile.total_points += activity.points_earned
            profile.save()
        except UserProfile.DoesNotExist:
            pass
    
    @action(detail=False, methods=['get'])
    def my_activities(self, request):
        """Get activities for the current user"""
        user_id = request.query_params.get('user_id')
        if user_id:
            activities = self.queryset.filter(user_id=user_id)
            serializer = self.get_serializer(activities, many=True)
            return Response(serializer.data)
        return Response({'error': 'user_id parameter required'}, status=status.HTTP_400_BAD_REQUEST)

