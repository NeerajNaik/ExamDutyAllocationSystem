from rest_framework import serializers
from .models import User,Exam,Exam_Data
from rest_framework_jwt.settings import api_settings
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ('exam_id','name_of_exam','description_of_exam')

class ExamDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam_Data
        fields = ('exam_id','tot_departments','reliever_duty','InterorIntra')        

class DutyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam_Data
        fields = ('exam_id','uid','fac_dept','dept','slot','categ','date')        

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password','email')