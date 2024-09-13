from django.contrib import admin
from .models import Post, AppUser, Comment

# Register your models here.
admin.site.register(Post)
admin.site.register(AppUser)
admin.site.register(Comment)
