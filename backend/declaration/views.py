from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import EmailMessage

from django.conf import settings
from django.core.files.base import ContentFile

from fpdf import FPDF
from django.http import HttpResponse
import base64
from PIL import Image
from .models import PDFFile

# Create your views here.


@api_view(['POST'])
@csrf_exempt
def declaration_create(request):
    pdf_file = request.FILES['pdf']
    pdf_data = pdf_file.read()
    pdf_name = pdf_file.name

    email = request.POST['email']
    email2 = request.POST['email2']

    pdf_obj = PDFFile(name=pdf_name, file_data=pdf_data)
    pdf_obj.save()

    email = EmailMessage(
        'Deklaracija',
        'Sveiki! \nSiunčiame jums jūsų užpildytą eismo įvykio deklaraciją \n\nLinkėjimai,\nDeklaratorius',
        'mimciks@gmail.com',
        [email, email2],
        reply_to=['mimciks@gmail.com']
    )
    email.attach(pdf_name, pdf_data, 'application/pdf')
    email.send()

    return HttpResponse('PDF received')


@api_view(['GET'])
@csrf_exempt
def pdf_list(request):
    pdf_files = PDFFile.objects.all()
    pdf_list = [{'id': pdf.id, 'name': pdf.name} for pdf in pdf_files]
    return JsonResponse({'pdf_list': pdf_list})
