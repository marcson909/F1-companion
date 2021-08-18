from django.db.models import fields
from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, StringRelatedField, SerializerMethodField, PrimaryKeyRelatedField
from formula_one_auth.serializers import UserSerializer

from .models import *

class LeagueSerializer(ModelSerializer):
    
    class Meta:
        model = League
        fields = "__all__"

class DriverSerializer(ModelSerializer):

    class Meta:
        model = Driver
        fields = '__all__'

class ConstructorSerializer(ModelSerializer):

    class Meta:
        model = Constructor
        fields = '__all__'

class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class UserLeagueSerializer(ModelSerializer):
    
    class Meta:
        model = UserLeague
        fields = "__all__"

class TeamDriverSerializer(ModelSerializer):
    
    class Meta:
        model = TeamDriver
        fields = "__all__"