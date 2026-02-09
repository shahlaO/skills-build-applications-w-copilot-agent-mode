from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Team
from .serializers import TeamSerializer

# Create your views here.

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        """Add a member to the team"""
        team = self.get_object()
        user_id = request.data.get('user_id')
        if user_id:
            from django.contrib.auth.models import User
            try:
                user = User.objects.get(id=user_id)
                team.members.add(user)
                team.update_total_points()
                serializer = self.get_serializer(team)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'user_id required'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def remove_member(self, request, pk=None):
        """Remove a member from the team"""
        team = self.get_object()
        user_id = request.data.get('user_id')
        if user_id:
            from django.contrib.auth.models import User
            try:
                user = User.objects.get(id=user_id)
                team.members.remove(user)
                team.update_total_points()
                serializer = self.get_serializer(team)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'user_id required'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def refresh_points(self, request, pk=None):
        """Refresh team points from member activities"""
        team = self.get_object()
        total = team.update_total_points()
        return Response({'total_points': total})

