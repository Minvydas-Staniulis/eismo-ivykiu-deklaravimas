from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Car
from .serializers import CarSerializer

# Get all cars


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def car_list(request):
    cars = Car.objects.filter(user=request.user)
    serializer = CarSerializer(cars, many=True)
    return JsonResponse(serializer.data, safe=False)

# Get one car by ID


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def car_detail(request, pk):
    car = get_object_or_404(Car, pk=pk, user=request.user)
    serializer = CarSerializer(car)
    return JsonResponse(serializer.data)

# Create a new car


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def car_create(request):
    serializer = CarSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

# Update an existing car


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def car_update(request, pk):
    car = get_object_or_404(Car, pk=pk, user=request.user)
    serializer = CarSerializer(car, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

# Delete a car


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def car_delete(request, pk):
    car = get_object_or_404(Car, pk=pk, user=request.user)
    car.delete()
    return JsonResponse({'message': 'Car deleted successfully!'}, status=204)
