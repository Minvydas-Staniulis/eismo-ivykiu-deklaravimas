from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
import json

import os
from io import BytesIO
import uuid
from django.conf import settings
from django.core.files.base import ContentFile

# Create your views here.


@api_view(['POST'])
@csrf_exempt
def declaration_create(request):

    # license plates
    my_license_plate = request.POST.get('myLicensePlate')
    other_license_plate = request.POST.get('otherLicensePlate')
    my_email = request.POST.get('myEmail')
    other_email = request.POST.get('otherEmail')

    # declaration image
    declaration_image = request.FILES.get('declaration')

    # crash images
    picture1 = request.FILES.get('picture1')
    picture2 = request.FILES.get('picture2')
    picture3 = request.FILES.get('picture3')
    picture4 = request.FILES.get('picture4')
    picture5 = request.FILES.get('picture5')
    picture6 = request.FILES.get('picture6')

    # hits
    my_first_hit = request.POST.get('myFirstHit')
    other_first_hit = request.POST.get('otherFirstHit')

    # hows
    my_how = request.POST.get('myHow')
    other_how = request.POST.get('otherHow')

    # driver data
    first_name = request.POST.get('firstDriverName')
    first_surname = request.POST.get('firstDriverSurname')
    first_birth_date = request.POST.get('firstDriverBirthDate')
    first_country = request.POST.get('firstDriverCountry')
    first_street = request.POST.get('firstDriverStreet')
    first_phone_number = request.POST.get('firstDriverPhoneNumber')
    first_id = request.POST.get('firstDriverIdNumber')

    second_name = request.POST.get('secondDriverName')
    second_surname = request.POST.get('secondDriverSurname')
    second_birth_date = request.POST.get('secondDriverBirthDate')
    second_country = request.POST.get('secondDriverCountry')
    second_street = request.POST.get('secondDriverStreet')
    second_phone_number = request.POST.get('secondDriverPhoneNumber')
    second_id = request.POST.get('secondDriverIdNumber')

    # place
    time = request.POST.get('time')
    time = request.POST.get('lat')
    time = request.POST.get('lng')

    # Perform any necessary validation and processing of the form data here

    response_data = {
        'myLicensePlate': my_license_plate,
        'otherLicensePlate': other_license_plate,
        'myEmail': my_email,
        'otherEmail': other_email,

        'declaration': declaration_image.name,
    }

    return JsonResponse(response_data)
