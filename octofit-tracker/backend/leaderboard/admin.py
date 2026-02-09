from django.contrib import admin
from .models import LeaderboardEntry

# Register your models here.

@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'rank', 'points', 'period', 'start_date', 'end_date']
    list_filter = ['period', 'start_date']
    search_fields = ['user__username']

