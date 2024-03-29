from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import render
from django_app import models, serializers
import json


def catch_error(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as error:
            return Response(data={"message": str(error)}, status=400)

    return wrapper


def index(request):
    return render(request, "index.html")


@api_view(http_method_names=["GET", "POST"])
@permission_classes([AllowAny])
@catch_error
def api(request):
    return Response(data={"message": "OK"})


@api_view(http_method_names=["GET"])
@permission_classes([AllowAny])
@catch_error
def get_persons(request):
    objects = models.Person.objects.all()
    sort = request.GET.get("sort", None)
    if sort:
        objects = objects.order_by(*sort.split(","))
    filter = request.GET.get("filter", None)
    if filter:
        objects = objects.filter(**json.loads(filter))
    return Response(
        data={"data": serializers.PersonSerializer(objects, many=True).data}
    )


@api_view(http_method_names=["GET"])
@permission_classes([AllowAny])
@catch_error
def get_person(request, id):
    object = models.Person.objects.get(id=id)
    return Response(
        data={"data": serializers.PersonSerializer(object, many=False).data}
    )


@api_view(http_method_names=["POST"])
@permission_classes([AllowAny])
@catch_error
def post_person(request):
    object = models.Person.objects.create(
        name=request.data.get("name", None),
        phone_number=request.data.get("phone_number", None),
    )
    return Response(
        data={"data": serializers.PersonSerializer(object, many=False).data}
    )


@api_view(http_method_names=["PUT"])
@permission_classes([AllowAny])
@catch_error
def put_person(request, id):
    object = models.Person.objects.get(id=id)
    name = request.data.get("name", None)
    phone_number = request.data.get("phone_number", None)
    if name and name != object.name:
        object.name = name
    if phone_number and phone_number != object.phone_number:
        object.phone_number = phone_number
    object.save()
    return Response(
        data={"data": serializers.PersonSerializer(object, many=False).data}
    )


@api_view(http_method_names=["DELETE"])
@permission_classes([AllowAny])
@catch_error
def delete_person(request, id):
    object = models.Person.objects.get(id=id)
    object.delete()
    return Response(
        data={"data": serializers.PersonSerializer(object, many=False).data}
    )
