from django.urls import path, include

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

from . import views
from .views import FacultyViewSet, StudentViewSet

router = DefaultRouter()

router.register(r'faculty', FacultyViewSet, basename='faculty')
router.register(r'student', StudentViewSet, basename='student')

urlpatterns = [
    path("token/", views.TokenView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path('', include(router.urls)),
]