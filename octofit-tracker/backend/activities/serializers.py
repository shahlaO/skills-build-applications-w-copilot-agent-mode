from rest_framework import serializers
from .models import Activity
from django.contrib.auth.models import User


class ActivitySerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Activity
        fields = ['id', 'user', 'username', 'activity_type', 'duration', 'distance',
                  'calories_burned', 'points_earned', 'notes', 'date', 'created_at']
        read_only_fields = ['points_earned', 'created_at']
