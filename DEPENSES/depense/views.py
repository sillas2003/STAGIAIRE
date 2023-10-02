from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Expense,Category
from .serializers import CategorySerializer,ExpenseSerializer,UserSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()


    #def perform_create(self, serializer):
       # serializer.save()
     


    def perform_create(self, serializer):
        Utilisateur_name = self.request.data.get('Utilisateur')
        Category_name = self.request.data.get('Category')

        # Recherchez ou créez l'utilisateur en fonction du nom d'utilisateur
        utilisateur, _ = User.objects.get_or_create(username=Utilisateur_name)

        # Recherchez ou créez la catégorie en fonction du nom
        category, _ = Category.objects.get_or_create(name=Category_name)

        # Associez l'utilisateur et la catégorie à la dépense
        serializer.save(Utilisateur=utilisateur, Category=category)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()  
# Create your views here.
