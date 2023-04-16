from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
import json

# Create your views here.


@api_view(['POST'])
@csrf_exempt
def declaration_create(request):
    my_license_plate = request.POST.get('myLicensePlate')
    other_license_plate = request.POST.get('otherLicensePlate')
    my_email = request.POST.get('myEmail')
    other_email = request.POST.get('otherEmail')

    # Perform any necessary validation and processing of the form data here

    response_data = {
        'myLicensePlate': my_license_plate,
        'otherLicensePlate': other_license_plate,
        'myEmail': my_email,
        'otherEmail': other_email
    }

    return JsonResponse(response_data)
