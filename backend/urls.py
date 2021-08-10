from django import urls
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('formula_one_auth.urls')),
    path('', include('formula_one.urls'))
]
