import jwt

from datetime import datetime, timedelta
from django.utils import timezone

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.db import models
from django.utils.timezone import now
class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(db_index=True, max_length=255)


    email = models.EmailField(db_index=True, unique=True)

    is_active = models.BooleanField(default=True)


    is_staff = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
  
        return self.email
class Exam(models.Model):
    exam_id = models.AutoField(primary_key=True)
    name_of_exam = models.CharField(max_length=150)
    description_of_exam = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(default=now)
    # created_at= models.DateTimeField(editable=False,null=True,blank=True)
    

    # def save(self, *args, **kwargs):
    #     ''' On save, update timestamps '''
    #     if not self.exam_id:
    #         self.created = timezone.now()
    #     # self.modified = timezone.now()
    #     return super(Exam, self).save(*args, **kwargs)
    
    def __int__(self):
        return self.exam_id
class Exam_Data(models.Model):
    exam_id = models.ForeignKey('Exam', on_delete=models.CASCADE)
    tot_blocks = models.IntegerField()
    tot_departments = models.IntegerField()
    reliever_duty = models.IntegerField()
    extra_blocks = models.IntegerField()
    InterorIntra = models.CharField(max_length=150)
    
    def __int__(self):
        return self.exam_id
class Deprtment_Data(models.Model):
    exam_id = models.ForeignKey('Exam', on_delete=models.CASCADE)
    name_of_department= models.CharField(max_length=150,null=True,blank=True)
    exam_timetable_csv_location = models.CharField(max_length=150,null=True,blank=True)
    duty_csv_location = models.CharField(max_length=150,null=True,blank=True)
    availability_csv_location = models.CharField(max_length=150,null=True,blank=True)
    # proofORlecture_csv_location = models.CharField(max_length=150,null=True,blank=True)
    def __str__(self):
        return self.name_of_department

    # @property

# class User(models.Model):
#     username = models.CharField(db_index=True, max_length=255, unique=True)


#     email = models.EmailField(db_index=True, unique=True)

#     is_active = models.BooleanField(default=True)


#     is_staff = models.BooleanField(default=False)


#     def __str__(self):
  
#         return self.username



