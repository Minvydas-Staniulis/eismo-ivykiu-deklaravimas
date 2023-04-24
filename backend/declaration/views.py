from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
import json

import os
from io import BytesIO
import io
import uuid
from django.conf import settings
from django.core.files.base import ContentFile
import PyPDF2

from fpdf import FPDF
import mysql.connector
from django.http import HttpResponse
import base64
from PIL import Image

# Create your views here.


@api_view(['POST'])
@csrf_exempt
def declaration_create(request):

    # license plates
    my_license_plate = request.data.get('myLicensePlate')
    other_license_plate = request.data.get('otherLicensePlate')
    my_email = request.data.get('myEmail')
    other_email = request.data.get('otherEmail')

    # declaration image
    declaration_image = request.data.get('declaration')

    # crash images
    picture1 = request.data.get('picture1')
    picture2 = request.data.get('picture2')
    picture3 = request.data.get('picture3')
    picture5 = request.data.get('picture5')
    picture6 = request.data.get('picture6')

    # hits
    my_first_hit = request.data.get('myFirstHit')
    other_first_hit = request.data.get('otherFirstHit')

    # hows
    my_how = request.data.get('myHow')
    other_how = request.data.get('otherHow')

    # driver data
    first_name = request.data.get('firstDriverName')
    first_surname = request.data.get('firstDriverSurname')
    first_birth_date = request.data.get('firstDriverBirthDate')
    first_country = request.data.get('firstDriverCountry')
    first_street = request.data.get('firstDriverStreet')
    first_phone_number = request.data.get('firstDriverPhoneNumber')
    first_id = request.data.get('firstDriverIdNumber')

    second_name = request.data.get('secondDriverName')
    second_surname = request.data.get('secondDriverSurname')
    second_birth_date = request.data.get('secondDriverBirthDate')
    second_country = request.data.get('secondDriverCountry')
    second_street = request.data.get('secondDriverStreet')
    second_phone_number = request.data.get('secondDriverPhoneNumber')
    second_id = request.data.get('secondDriverIdNumber')

    # place
    time = request.data.get('time')
    lat = request.data.get('lat')
    lng = request.data.get('lng')

    x = 10
    y = 10

    # Create a new PDF writer
    pdf_writer = PyPDF2.PdfWriter()

    # Create a new page with size A4
    page = PyPDF2.PageObject.create_blank_page(None, 595, 842)

    # Add the page to the PDF writer
    pdf_writer.add_page(page)

    # Create a BytesIO object to hold the modified PDF file contents
    pdf_output = io.BytesIO()
    pdf_writer.write(pdf_output)

    # Create a Django HttpResponse object with the contents of the BytesIO object
    response = HttpResponse(pdf_output.getvalue(),
                            content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=generated.pdf'
    return response
