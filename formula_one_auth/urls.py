from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path, include
from .views import current_user, UserList

urlpatterns = [
    path('', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
