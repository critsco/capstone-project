from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Users, Profiles

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'email', 'user_role']

class BaseProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = ['school_id', 'first_name', 'middle_name', 'last_name', 'suffix', 'department', 'phone_no', 'gender']

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta(BaseProfileSerializer):
        fields = BaseProfileSerializer.Meta.fields + ['year_level', 'birthdate', 'address', 'parent']

class TokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['user_role'] = user.user_role.id
        token['first_name'] = user.profiles.first_name
        token['middle_name'] = user.profiles.middle_name
        token['last_name'] = user.profiles.last_name
        token['suffix'] = user.profiles.suffix
        token['email'] = user.email
        token['year_level'] = user.profiles.year_level.id if user.profiles.year_level else None
        token['department'] = user.profiles.department.id if user.profiles.department else None
        token['phone_no'] = user.profiles.phone_no
        token['birthdate'] = str(user.profiles.birthdate)
        token['gender'] = user.profiles.gender
        token['address'] = user.profiles.address.id if user.profiles.address else None
        token['parent'] = user.profiles.parent.id if user.profiles.parent else None

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    profile = BaseProfileSerializer()

    class Meta:
        model = Users
        fields = ['email', 'password', 'password2', 'user_role', 'profile']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields doesn't match."})
        
        return attrs
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = Users.objects.create(
            email = validated_data['email'],
            user_role = validated_data['user_role'],
        )
        user.set_password(validated_data['password'])

        Profiles.objects.create(user=user, **profile_data)
        user.save()

        return user

class StudentRegisterSerializer(RegisterSerializer):
    profile = StudentProfileSerializer()

    def create(self, validated_data):
        # Use specific student profile data creation if required
        profile_data = validated_data.pop('profile')

        # Create user with basic information
        user = Users.objects.create(
            email=validated_data['email'],
            user_role=validated_data['user_role'],
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create a student profile associated with the user
        Profiles.objects.create(user=user, **profile_data)

        return user