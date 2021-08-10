from django.db.models import fields
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import *

class LeagueSerializer(ModelSerializer):
    
    class Meta:
        model = League
        fields = "__all__"

class DriverSerializer(ModelSerializer):
    driver_teams = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Driver
        fields = ['id', 'driver_ref', 'number', 'code', 'first_name', 'last_name', 'dob', 'nationality', 'url', 'driver_teams']

class TeamSerializer(ModelSerializer):
    drivers = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'