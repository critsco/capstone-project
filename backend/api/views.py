from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import Users, Profiles
from .serializers import RegisterSerializer, TokenSerializer, StudentRegisterSerializer
from .permissions import IsFaculty, IsStudent

class TokenView(TokenObtainPairView):
    serializer_class = TokenSerializer

class RegisterView(generics.CreateAPIView):
    queryset = Users.objects.all()
    permission_classes = (AllowAny, )
    
    def post(self, request, *args, **kwargs):
        user_role = request.data.get('user_role')

        if user_role == "1":
            serializer = RegisterSerializer(data=request.data)
        elif user_role == "2":
            serializer = StudentRegisterSerializer(data=request.data)
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FacultyViewSet(ViewSet):
    permission_classes = [IsAuthenticated, IsFaculty]

class StudentViewSet(ViewSet):
    permission_classes = [IsAuthenticated, IsStudent]