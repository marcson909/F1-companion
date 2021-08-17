from django.shortcuts import render
import requests
# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from .serializers import *
from .models import *


# @api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
# def current_season(request):
#     endpoint = "http://ergast.com/api/f1/current.json"
#     data = requests.get(endpoint).json()
#     data = data['MRData']['RaceTable']
    
#     return Response(data=data)


# @api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
# def drivers(request):
#     endpoint = "http://ergast.com/api/f1/2021/drivers.json"
#     data = requests.get(endpoint).json()
#     data = data['MRData']['DriverTable']
    
#     return Response(data=data)

# @api_view(['GET'])
# @authentication_classes([])
# @permission_classes([])
# def constructors(request):
#     endpoint = "http://ergast.com/api/f1/2021/constructors.json"
#     data = requests.get(endpoint).json()
#     data = data['MRData']['ConstructorTable']
    
#     return Response(data=data)


class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

    # def get_queryset(self):
    #     return League.objects.exclude(is_public=False)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class UserLeagueViewSet(viewsets.ModelViewSet):
    queryset = UserLeague.objects.all()
    serializer_class = UserLeagueSerializer

