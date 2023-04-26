from django.db import models


class PDFFile(models.Model):
    name = models.CharField(max_length=255)
    file_data = models.BinaryField()

    def __str__(self):
        return self.name
