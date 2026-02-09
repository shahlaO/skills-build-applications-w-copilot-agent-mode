from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserSerializer, UserProfileSerializer

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    
    @action(detail=True, methods=['post'])
    def update_points(self, request, pk=None):
        """Manually update user points"""
        profile = self.get_object()
        points = request.data.get('points', 0)
        profile.total_points += int(points)
        profile.save()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

