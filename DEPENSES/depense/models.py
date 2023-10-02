from django.db import models
from django.db import models
from django.contrib.auth.models import  User

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Expense(models.Model):
    Utilisateur = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()
    Category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.Utilisateur.username} - {self.amount}"

# Create your models here.
