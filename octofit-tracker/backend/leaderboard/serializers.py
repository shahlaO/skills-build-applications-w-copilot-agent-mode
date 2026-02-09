from rest_framework import serializers
from .models import LeaderboardEntry


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_type = serializers.CharField(source='user.profile.user_type', read_only=True)
    
    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'user', 'username', 'user_type', 'period', 'rank', 'points',
                  'activities_count', 'start_date', 'end_date', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
