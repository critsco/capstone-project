from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

from .managers import UserManager

# Create your models here.
class Ref_Year_Levels(models.Model):
    year_level = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.year_level

class Ref_Departments(models.Model):
    department = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.department
    
class Ref_Regions(models.Model):
    region = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.region
    
class Ref_Provinces(models.Model):
    province = models.CharField(max_length=255, null=True)
    region = models.ForeignKey(Ref_Regions, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.province
    
class Ref_Municipalities(models.Model):
    municipality = models.CharField(max_length=255)
    province = models.ForeignKey(Ref_Provinces, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.municipality
    
class Ref_Barangays(models.Model):
    barangay = models.CharField(max_length=255, null=True)
    municipality = models.ForeignKey(Ref_Municipalities, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.barangay

class Addresses(models.Model):
    region = models.ForeignKey(Ref_Regions, null=True, on_delete=models.CASCADE)
    province = models.ForeignKey(Ref_Provinces, null=True, on_delete=models.CASCADE)
    municipality = models.ForeignKey(Ref_Municipalities, null=True, on_delete=models.CASCADE)
    barangay = models.ForeignKey(Ref_Barangays, null=True, on_delete=models.CASCADE)
    street_address = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.street_address
    
class User_Roles(models.Model):
    user_role = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.user_role
    
class Users(AbstractUser):
    username = None
    email = models.EmailField(max_length=100, null=True, unique=True)

    user_role = models.ForeignKey(User_Roles, null=True, on_delete=models.CASCADE)
    created_by = models.DateTimeField(auto_now_add=True)
    updated_by = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
    
class Parents(models.Model):
    first_name = models.CharField(max_length=255, null=True)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True)
    suffix = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Profiles(models.Model):
    Gender = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ]

    user = models.OneToOneField(Users, null=True, on_delete=models.CASCADE)
    school_id = models.CharField(max_length=255, null=True)
    first_name = models.CharField(max_length=255, null=True)
    middle_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True)
    suffix = models.CharField(max_length=10, null=True, blank=True)
    year_level = models.ForeignKey(Ref_Year_Levels, null=True, on_delete=models.CASCADE)
    department = models.ForeignKey(Ref_Departments, null=True, on_delete=models.CASCADE)
    phone_no = models.CharField(max_length=20, null=True)
    birthdate = models.DateField(null=True)
    gender = models.CharField(max_length=10, null=True, choices=Gender)
    address = models.ForeignKey(Addresses, null=True, blank=True, on_delete=models.CASCADE)
    parent = models.ForeignKey(Parents, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profiles.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profiles.save()

post_save.connect(create_user_profile, sender=Users)
post_save.connect(save_user_profile, sender=Users)