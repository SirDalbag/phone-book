from django.urls import path
from django_app import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/", views.api),
    path("api/persons/", views.get_persons),
    path("api/persons/<id>/", views.get_person),
    path("api/person/add/", views.post_person),
    path("api/person/edit/<id>/", views.put_person),
    path("api/person/delete/<id>/", views.delete_person),
]
