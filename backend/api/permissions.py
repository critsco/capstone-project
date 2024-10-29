# permissions.py
from rest_framework.permissions import BasePermission

class IsFaculty(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and their role is 'Faculty'
        return request.user.is_authenticated and request.user.user_role_id == 1

class IsStudent(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and their role is 'Student'
        return request.user.is_authenticated and request.user.user_role_id == 2
