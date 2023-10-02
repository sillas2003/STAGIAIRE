from rest_framework import serializers
from .models import Expense,Category
from django.contrib.auth.models import  User


class ExpenseSerializer(serializers.ModelSerializer):
    #categorie_nom = serializers.CharField(source='Category.name', read_only=True)
    Category_nom = serializers.ReadOnlyField(source='Category.name')
    Utilisateur_nom = serializers.ReadOnlyField(source='Utilisateur.username')

    class Meta:
        model = Expense
        fields = ['id', 'Utilisateur_nom', 'amount','date','description','Category_nom'] 
        #depth = 1


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__' 


class  UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        

