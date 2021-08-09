from django.contrib import admin

# Register your models here.

from .models import User,Exam,Exam_Data,Deprtment_Data,SDuty

admin.site.register(User)
admin.site.register(Exam)
admin.site.register(Exam_Data)
admin.site.register(Deprtment_Data)
admin.site.register(SDuty)