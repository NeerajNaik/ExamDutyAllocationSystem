from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer,UserSerializerWithToken,ExamSerializer,ExamDataSerializer,DutyDataSerializer
from rest_framework import permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_protect
# method_decorator(csrf_protect)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.views import ObtainJSONWebToken
from .models import Exam,Exam_Data,Deprtment_Data,Duty

import csv
import codecs
import io
import os
# import pandas as pd
import copy,random
import pandas
import math
import json
from json import JSONEncoder
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import JsonResponse
from django.core.mail import send_mail
# class LoginView(APIView):

#     permission_classes = (permissions.AllowAny,)
#     # authentication_classes = [BasicAuthentication,JSONWebTokenAuthentication]

#     def get(self, request,format=None):
#         data = {
#             'username': request.user.username,
#             'email':request.user.email,

#         }
#         return Response(data)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)



class RegisterView(APIView):


    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class ExamView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = ExamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            id1=Exam.objects.latest('exam_id')
            serializer.data.update({'exam_id':id1})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      

class GetExamView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        data = list(Exam.objects.values())

        # print(data)
        return JsonResponse({'data': data},  status=status.HTTP_201_CREATED)
        


class ExamDataView(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = ExamDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)             

class GetExamDataView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        data = list(Exam_Data.objects.values())
        id1=Exam.objects.latest('exam_id')
        e=list(Exam_Data.objects.filter(exam_id=id1).values())
        print(id1)
        print(e[0]['reliever_duty'])
        # print(data)
        return JsonResponse({'data': data},  status=status.HTTP_201_CREATED)

class GetDeprtmentDataView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        data = list(Deprtment_Data.objects.values())
        # send_mail(
        # 'Subject here',
        # 'Here is the message.',
        # 'djangonan123@gmail.com',
        # ['vatsal.pathak003@gmail.com'],
        # fail_silently=False,
        # )
        
        # print(data[0]['name_of_department'])
        # print(data)
        return JsonResponse({'data': data},  status=status.HTTP_201_CREATED)

class UploadCSV(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (FormParser, MultiPartParser)

    def post(self, request):
        
        
        q = request.data
        # queryDict=q.getlist('data0')
        # print(queryDict)
        print(q)
        print(q['count'])
        # for x in q:
        #     li.append(q.getlist(x))
        #     count=count+1
            # print(li)

        for i in range(int(q['count'])):

            location_list=[]
            exam_id= q['exam_id'+str(i)]
            name_of_department=q['name_of_department'+str(i)]
            print(exam_id)
            print(name_of_department)
            exam_id= Exam(
                exam_id=exam_id
            )
            # file1
            try:
                f=q['file'+str(i)+'1']
                directory = f'{f}'
                print(directory)
                parent_dir = r'C:\CSV\\'
                if not os.path.isdir(parent_dir):
                    os.makedirs(parent_dir)
                path = default_storage.save(directory, ContentFile(f.read()))
                tmp_file = os.path.join(settings.MEDIA_ROOT, path)
                location_list.append(tmp_file)  
                print(tmp_file) 
            except:
                location_list.append('null')
                print('file'+str(i)+'1'+'not found')    
            # # file2
            try:
                f=q['file'+str(i)+'2']
                directory = f'{f}'
                print(directory)
                parent_dir = r'C:\CSV\\'
                if not os.path.isdir(parent_dir):
                    os.makedirs(parent_dir)
                path = default_storage.save(directory, ContentFile(f.read()))
                tmp_file = os.path.join(settings.MEDIA_ROOT, path)
                location_list.append(tmp_file)  
                print(tmp_file) 
            except:
                location_list.append('null')
                print('file'+str(i)+'2'+'not found')  
            # # file3
            try:
                f=q['file'+str(i)+'3']
                directory = f'{f}'
                print(directory)
                parent_dir = r'C:\CSV\\'
                if not os.path.isdir(parent_dir):
                    os.makedirs(parent_dir)
                path = default_storage.save(directory, ContentFile(f.read()))
                tmp_file = os.path.join(settings.MEDIA_ROOT, path)
                location_list.append(tmp_file)  
                print(tmp_file) 
            except:
                location_list.append('null')
                print('file'+str(i)+'3'+'not found')  
            # # file4
            # try:
            #     f=q['file'+str(i)+'4']
            #     directory = f'{f}'
            #     print(directory)
            #     parent_dir = r'C:\CSV\\'
            #     if not os.path.isdir(parent_dir):
            #         os.makedirs(parent_dir)
            #     path = default_storage.save(directory, ContentFile(f.read()))
            #     tmp_file = os.path.join(settings.MEDIA_ROOT, path)
            #     location_list.append(tmp_file)  
            #     print(tmp_file) 
            # except:
            #     location_list.append('null')
            #     print('file'+str(i)+'4'+'not found')  

            print(location_list)
            m= Deprtment_Data(
                exam_id=exam_id,    
                name_of_department=name_of_department,
                exam_timetable_csv_location=location_list[0],
                duty_csv_location=location_list[1],
                availability_csv_location=location_list[2],
                # proofORlecture_csv_location=location_list[3],
                                # and so on ..
                )
            m.save()  


            # df=pd.DataFrame(li[i][2])
            # df.to_csv(parent_dir+directory,mode='w',encoding='latin-1')



        # for file in request.FILES.get(data['file1']):
        #     print(file)
        # obj = json.loads(data['file1'])
        
# df.to_csv (r'Path where the new TEXT file will be stored\New File Name.txt', index = False)
        # print(request.data['list0'])
        # print(str(request.data['name_of_department']))
        # location_list=[]
        # for x,y in request.data.items():
        #     if x=='name_of_department':
        #         location_list.append(y)
        #         print(y)
        #         continue
        #     else:
        #         for file in request.FILES.getlist(x):    
        #             directory = f'{file}'
        #             print(directory)
        #             # writer = csv.writer(directory)
        #             # writer.writerows(csvstff)
        #             parent_dir = r'C:\CSV\\'
        #             # path = os.path.join(parent_dir, directory) 
        #             if not os.path.isdir(parent_dir):
        #                 os.makedirs(parent_dir)
        #             reader = csv.reader(io.TextIOWrapper(file,encoding='latin-1'))
        #             if file.closed:
        #                 print('file is closed')
        #             else:
        #                 print('file is open')   
        #             list1=[]
        #             res = bytes('\x00', 'latin-1') 
        #             for line in file:
        #                 line.replace(res,bytes('','latin-1'))
        #             for line in file:
        #                 print(line.decode('latin-1') ) 
        #                 list1.append(line.decode('latin-1')) 
        #             # df = pd.read_csv(file)

        #             # list_of_column_names = list(df.columns)         
        #             # print(list_of_column_names)
                    
        #             name1=[]
        #             email1=[]
        #             address1=[]
        #             profile1=[]

        #             objects = {}
        #             for row in list1:
        #                 row = row.split(",")
        #                 r_length=len(row)
        #                 row_list=[[]]*(len(row))
        #                 break
        #             print(row_list)
        #             for row in list1:
        #                 print('hiiiiii')
        #                 row = row.split(",")
        #                 print(row)
        #                 name1.append(row[0])
        #                 email1.append(row[1])
        #                 address1.append(row[2])
        #                 profile1.append(row[3])
        #                 # for i in range(r_length):
        #                 #     row_list[i].append(row[i])

        #                 # m= CSV(
        #                 #   name=row[0],
        #                 #   email=row[1],
        #                 #   address=row[2],
        #                 #   profile=row[3],
        #                 #   # and so on ..
        #                 # )
        #                 # m.save()
        #             dict = {'name':name1,'email':email1,'address':address1,'profile':profile1}    
        #             df=pd.DataFrame(dict)
        #             df.to_csv(parent_dir+directory)
        #             location_list.append(parent_dir+directory)

        #             # CSV.objects.bulk_create(objects)
        #             # print(path)
        #             print(name1)
        #             print(email1)
        #             print(row_list)
        #             print(objects)
        # m= Deprtment_Data(
        # name_of_department=location_list[0],
        # exam_timetable_csv_location=location_list[1],
        # duty_csv_location=location_list[2],
        # availability_csv_location=location_list[3],
        # proofORlecture_csv_location=location_list[4],
        #                   # and so on ..
        # )
        # m.save()            
        return Response({"success": "Good job, buddy"})
 

class GetFinalTableView(APIView):
    # Article.objects.filter(pk=1).update(title="New Title")
    permission_classes = (permissions.AllowAny,)
    def get(self,request):
        

        def _default(self, obj):
            return getattr(obj.__class__, "to_json", _default.default)(obj)

        _default.default = JSONEncoder().default
        JSONEncoder.default = _default

        # class Duty():
        #     def __init__(self,uid,fac_dept,dept,date,slot,categ):
        #         self.uid=uid
        #         self.fac_dept=fac_dept
        #         self.dept=dept
        #         self.date=date
        #         self.slot=slot
        #         self.categ=categ
        #     def __repr__(self):
        #         # print(self.uid)
        #         # print(self.leave_day)
        #         return " "+self.uid+" "+self.fac_dept+" "+self.date+" "+self.dept+" "+self.slot+" "+self.categ
        #     def to_json(self):
        #         return self.__dict__

        class Teacher():
            preading_duty=[]
            leave_day=[]
            duties=[]
            necessity=0
            prob=0
            def __init__(self,uid,name,department,t_duties,exam_days,email=None,contact=None):
                self.uid=uid
                self.name=name
                #for constraint of only one duty per day
                if t_duties>exam_days:
                    self.t_duties=exam_days
                else:
                    self.t_duties=t_duties
                self.email=email
                self.department=department
                self.contact=contact
                self.lduty=self.t_duties
            def __repr__(self):
                # print(self.uid)
                # print(self.leave_day)
                return " "+self.uid+" "+self.name+" "+str(self.t_duties)+" "+self.department+" "+str(self.lduty)
            def get_uid(self):
                return self.uid
            def add_preading_duty(self,duty):
                self.preading_duty=duty
            def add_leave_day(self,unavailability,exam_days):
                # For constraint that can't have dutyon unavailable
                # if (exam_days-len(unavailability))<self.t_duties:
                #     self.t_duties = exam_days-len(unavailability)
                #     print("Missing some duties")
                self.leave_day = unavailability
            def add_duty(self,duty):
                self.duties.append(duty)

        def date_format(date_string):
            date=[]
            if '-' in date_string and '/' not in date_string:
                date=date_string.split('-')
            elif '/' in date_string and '-' not  in date_string:
                date=date_string.split('/')
            else:
                print("error in date format")
            if len(date)!=3:
                print("error in date format")
            print(date)
        # date_format("12-12-12")
        # date_format("12/12/12")



        def load_compulsory_duty(path,department,faculty):
            #path='T_duties.csv'
            dict_from_csv = {}
            total_duties=0
            exam_days=len(faculty.keys())-1
            #print(exam_days)
            with open(path, mode='r') as inp:
                reader = csv.reader(inp)
                c=0
                for rows in reader:
                    if c==0:
                        c+=1
                        continue
                    total_duties+=int(rows[3])
                    teacher=Teacher(rows[0],rows[1],department,int(rows[3]),exam_days)
                    #tmp={"uid":rows[0],"name":rows[1],"duties":rows[3]}
                    dict_from_csv[rows[0]]=teacher
            dict_from_csv["total_duties"]=total_duties
            #print(dict_from_csv)
            return dict_from_csv


        def load_timetable(path):
            #path ="T_T.csv"
            reliever = 0.2
            df = pandas.read_csv(path)
            i=1
            slots=0
            a=dict()
            while (i<len(df.columns)):
                temp=dict()
                t1=[]
                t1.append(int(df.iloc[1,i]))
                t1.append(int(df.iloc[2,i]))
                

                morn=int(df.iloc[1,i])+int(df.iloc[2,i])
                morn= morn + math.ceil(morn*reliever)
                t1.append(morn)
                temp["morn"]=t1

                t1=[]
                t1.append(int(df.iloc[1,i+1]))
                t1.append(int(df.iloc[2,i+1]))

                
                after=int(df.iloc[1,i+1])+int(df.iloc[2,i+1])
                after= after + math.ceil(after*reliever)
                t1.append(after)
                temp["after"]=t1

                slots = slots + morn + after
                a[df.columns[i]]=temp
                i+=2
                pass
            #print(a)
            a["total"]=slots
            return a

        def load_availability(path,department,faculty,timetable):
            #print(timetable.keys())
            # print(faculty)
            # print(department)
            df = pandas.read_csv(path)
            # print(df)
            exam_days=len(faculty.keys())-1
            #a=dict()
            #print(len(df.columns))
            #print(df.loc[1,'21-03-2021'])
            for i in range(1,df.index.stop):
                b=dict()
                
                for j in range(1,len(df.columns),2):
                    c=[]
                    if df.iloc[i,j]=="L":
                        c.append("morn")
                    if df.iloc[i,j+1]=="L":
                        c.append("after")
                    if len(c)!=0:
                        b[df.columns[j]]=c
                #print(i)
                faculty[df.iloc[i,0]].add_leave_day(b,exam_days)
                #a[df.iloc[i,0]]=b
            #print(faculty)
                    #print(df.iloc[i,j])
                    #print(df.columns[j])



            #     for i in (timetable.keys()):
            #         df.loc
            #print(df.index.stop)
            #print(df.iloc[1,:])
            #print("ddd")
            #print(list(faculty.keys())[0])

            #cast according to needs
            #print(df.loc[int(list(faculty.keys())[0]),:])

        def process(department,faculty,timetable_main):
            #duties=[]
            
            loopbreak=True
            c=0
            while loopbreak:
                if c>20:
                    #change very previous departments timetable
                    #break
                    print("change previous dept tt")
                    return False
                complete_faculty=copy.deepcopy(faculty)

                qualified_main={}
                for i in complete_faculty.keys():
                    #inter department strict or not
                    if i != department:
                        qualified_main.update(complete_faculty[i])
                
                qualified = qualified_main

                c+=1
                timetable = copy.deepcopy(timetable_main)
                #qualified = copy.deepcopy(qualified_main)
                # print("\n\n\n\n")
                # print(qualified)
                # print(timetable)
                qualified.pop("total_duties")
                
                is_done = True
                time_tb = timetable[department]
                time_tb.pop("total")
                for date in time_tb.keys():
                    available=[]
                    morn_only=[]
                    after_only=[]
                    day=time_tb[date]#content of each date, morn and after dict
                    for tchr in qualified.items():
                        #print(tchr[1])
                        if tchr[1].lduty>0:
                            if date not in tchr[1].leave_day.keys():
                                available.append(qualified[tchr[0]])
                            elif "morn" not in tchr[1].leave_day[date] :
                                after_only.append(qualified[tchr[0]])
                            elif "after" not in tchr[1].leave_day[date]:
                                morn_only.append(qualified[tchr[0]])
                    #print(len(morn_only)+len(after_only)+len(available),int(day['morn'][2])+int(day['after'][2]))
                    if len(morn_only)+len(after_only)+len(available)<int(day['morn'][2])+int(day['after'][2]):
                        #throw error
                        #change previous days timetable
                        print("Error1, timetablle not possible")
                        #print(time_tb)
                        is_done = False
                        break
                    else:


                        ##morning
                        req = int(day['morn'][2])
                        #print(len(morn_only)+len(available),int(day['morn'][2]))
                        if len(morn_only)+len(available)>=int(day['morn'][2]):
                            allocated_duties=[]
                            
                            for i in range(req):
                            
                                if i<day["morn"][0]:
                                    categ="supervision"
                                elif i<day["morn"][0]+day["morn"][1]:
                                    categ="special"
                                else:
                                    categ="reliever"
                                
                                if len(morn_only)>0 and len(available>0):
                                    tmp=random.randint(0,2)
                                    if tmp==0:
                                        index=random.randint(0,len(available)-1)
                                        allotted=available.pop(index)
                                        allotted.lduty-=1
                                        allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"morn",categ))
                                    else:
                                        index=random.randint(0,len(morn_only)-1)
                                        allotted=morn_only.pop(index)
                                        allotted.lduty-=1
                                        allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"morn",categ))

                                elif len(morn_only)==0:
                                
                                    index=random.randint(0,len(available)-1)
                                    allotted=available.pop(index)
                                    allotted.lduty-=1
                                    allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"morn",categ))

                                elif len(available)==0:
                                    index=random.randint(0,len(morn_only)-1)
                                    allotted=morn_only.pop(index)
                                    allotted.lduty-=1
                                    allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"morn",categ))
                            day["morn"].append(allocated_duties)
                        else:
                            #change previous days timetable
                            #throw error
                            #print(time_tb)
                            print("Error2, not possible")
                            is_done = False
                            break




                        ##afternoon
                        req = int(day['after'][2])
                        #print(len(after_only)+len(available),int(day['after'][2]))
                        if len(after_only)+len(available)>=int(day['after'][2]):
                            allocated_duties=[]
                            
                            for i in range(req):
                            
                                if i<day["after"][0]:
                                    categ="supervision"
                                elif i<day["after"][0]+day["after"][1]:
                                    categ="special"
                                else:
                                    categ="reliever"
                                
                                if len(after_only)>0 and len(available>0):
                                    tmp=random.randint(0,2)
                                    if tmp==0:
                                        index=random.randint(0,len(available)-1)
                                        allotted=available.pop(index)
                                        allotted.lduty-=1
                                        allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"after",categ))
                                    else:
                                        index=random.randint(0,len(after_only)-1)
                                        allotted=after_only.pop(index)
                                        allotted.lduty-=1
                                        allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"after",categ))

                                elif len(morn_only)==0:
                                
                                    index=random.randint(0,len(available)-1)
                                    allotted=available.pop(index)
                                    allotted.lduty-=1
                                    allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"after",categ))

                                elif len(available)==0:
                                    index=random.randint(0,len(morn_only)-1)
                                    allotted=morn_only.pop(index)
                                    allotted.lduty-=1
                                    allocated_duties.append(Duty(allotted.uid,allotted.department,department,date,"after",categ))
                            day["after"].append(allocated_duties)

                        else:
                            #change previous days timetable
                            #throw error
                            is_done = False
                            print("Error3, not possible")
                            #print(time_tb)
                            break
                    #time_tb
                if not is_done:
                    continue
                else:
                    print("Successful exit")
                    # print(timetable)
                    return True,time_tb,complete_faculty


                    
        def driver(source_timetable,source_faculty,source_availability,departments):
            faculty=dict()
            timetable=dict()
            for i in departments:
                timetable[i]=load_timetable(source_timetable[i])
                faculty[i]=load_compulsory_duty(source_faculty[i],i,timetable[i])
                #print(faculty[i],i)
                load_availability(source_availability[i],i,faculty[i],timetable[i])
            c=0
            
            while True:
                c+=1
                if c==50:
                    return False,"Unable to generate a schedule"
                faculty_tmp=copy.deepcopy(faculty)
                timetable_tmp=copy.deepcopy(timetable)
                op=True#okay to exit
                for i in departments:
                    op,timetable_tmp[i],faculty_tmp = process(i,faculty_tmp,timetable_tmp)
                    #if op False, restart generation
                    if not op:
                        break
                if not op:
                    continue
                elif op:
                    # print(faculty_tmp)
                    # print("\n\n\n")
                    # print(timetable_tmp)
                    return True,faculty_tmp,timetable_tmp
        departments=[]
        source_timetable={}
        source_availability={}
        source_faculty={}
        id1=Exam.objects.latest('exam_id')
        print(id1)

        data = list(Deprtment_Data.objects.filter(exam_id=id1).values())
        print(data)
        for e in data:
            departments.append(e['name_of_department'])
            source_timetable[e['name_of_department']]=e['exam_timetable_csv_location']
            source_availability[e['name_of_department']]=e['availability_csv_location']
            source_faculty[e['name_of_department']]=e['duty_csv_location']
        
        # departments=["COMP","MECH","ETRX"]
        # source_timetable={"COMP":"T_T.csv","MECH":"T_T1.csv","ETRX":"T_T3.csv"}
        # source_availability={"COMP":"T_T proof.csv","MECH":"T_T proof1.csv","ETRX":"T_T proof3.csv"}
        # source_faculty={"COMP":"T_duties.csv","MECH":"T_duties1.csv","ETRX":"T_duties3.csv"}
        op_result,faculty,timetable=driver(source_timetable,source_faculty,source_availability,departments)
        print(json.dumps(timetable))
        return Response(timetable, status=status.HTTP_201_CREATED)


class SaveAndCheckView(APIView):
    permission_classes = (permissions.AllowAny,)
    # parser_classes = (FormParser, MultiPartParser)

    def post(self, request):
        q = request.data
        print(q)
        eid=q['exam_id']
        exam_id= Exam(
                exam_id=eid
            )
        print(exam_id)   
        Exam.objects.filter(exam_id=exam_id).update(is_save=q['save'],is_notif=q['checked']) 


        return Response({"success": "Good job, buddy"})