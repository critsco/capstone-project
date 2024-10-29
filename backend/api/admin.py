from django.contrib import admin

from api.models import Users, Profiles

# Register your models here.
class UsersAdmin(admin.ModelAdmin):
    list_editable = ['user_role']
    list_display = ['id', 'email', 'user_role']

class ProfilesAdmin(admin.ModelAdmin):
    list_editable = ['year_level', 'department']
    list_display = ['user', 'school_id', 'first_name', 'middle_name', 'last_name', 'suffix', 'year_level', 'department', 'birthdate', 'phone_no', 'gender', 'address', 'parent']

admin.site.register(Users, UsersAdmin)
admin.site.register(Profiles, ProfilesAdmin)