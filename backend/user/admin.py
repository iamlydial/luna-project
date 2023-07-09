from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class CustomUserAdmin(BaseUserAdmin):
    readonly_fields = ('date_joined',)
    # fields shown when creating a new instance
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    # fields when reading / updating an instance
    fieldsets = (
        (None, {'fields': ('email', 'password', 'profile_picture', 'is_staff', 'is_superuser')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'location', 'user_phone', 'user_description')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    # fields which are shown when looking at a list of instances
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_superuser')


admin.site.register(User, CustomUserAdmin)
