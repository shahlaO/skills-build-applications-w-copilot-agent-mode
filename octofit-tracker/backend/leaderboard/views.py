from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from datetime import datetime, timedelta
from .models import LeaderboardEntry
from .serializers import LeaderboardEntrySerializer
from users.models import UserProfile
from activities.models import Activity

# Create your views here.

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current leaderboard for a specific period"""
        period = request.query_params.get('period', 'all_time')
        
        # Calculate date ranges
        today = datetime.now().date()
        if period == 'daily':
            start_date = today
            end_date = today
        elif period == 'weekly':
            start_date = today - timedelta(days=today.weekday())
            end_date = start_date + timedelta(days=6)
        elif period == 'monthly':
            start_date = today.replace(day=1)
            next_month = today.replace(day=28) + timedelta(days=4)
            end_date = next_month - timedelta(days=next_month.day)
        else:  # all_time
            start_date = datetime(2020, 1, 1).date()
            end_date = today
        
        # Get user profiles with their points
        profiles = UserProfile.objects.filter(user_type='student')
        
        leaderboard_data = []
        for rank, profile in enumerate(profiles, start=1):
            # Calculate points for the period
            points = Activity.objects.filter(
                user=profile.user,
                date__gte=start_date,
                date__lte=end_date
            ).aggregate(Sum('points_earned'))['points_earned__sum'] or 0
            
            activities_count = Activity.objects.filter(
                user=profile.user,
                date__gte=start_date,
                date__lte=end_date
            ).count()
            
            if points > 0 or activities_count > 0:
                leaderboard_data.append({
                    'user': profile.user.id,
                    'username': profile.user.username,
                    'user_type': profile.user_type,
                    'rank': rank,
                    'points': points,
                    'activities_count': activities_count,
                    'period': period,
                    'start_date': start_date,
                    'end_date': end_date
                })
        
        # Sort by points descending
        leaderboard_data.sort(key=lambda x: x['points'], reverse=True)
        
        # Update ranks
        for rank, entry in enumerate(leaderboard_data, start=1):
            entry['rank'] = rank
        
        return Response(leaderboard_data)

