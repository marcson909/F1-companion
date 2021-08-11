from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path, include
from .views import UserList, current_user

urlpatterns = [
    path('', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
]
