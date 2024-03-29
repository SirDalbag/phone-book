from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    phone_number = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return f"{self.name}, {self.phone_number}"
