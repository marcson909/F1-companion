from django.urls import path, include
from rest_framework.routers import SimpleRouter
from formula_one import views

# r = SimpleRouter()
# r.register("calendar", views.RaceViewSet, basename="race-list")

router = SimpleRouter()
router.register('leagues', views.LeagueViewSet, basename='league')
router.register("teams", views.TeamViewSet, basename="team")
router.register("drivers", views.DriverViewSet, basename='driver')
router.register("constructors", views.ConstructorViewSet, basename='constructor')
router.register('userleagues', views.UserLeagueViewSet, basename='userleague')
router.register('teamdrivers', views.TeamDriverViewSet, basename='teamdriver')

urlpatterns = [
    # path('current_season/', views.current_season),
    # path('drivers/', views.drivers),
    # path('constructors/', views.constructors),
    path('', include(router.urls)),
]