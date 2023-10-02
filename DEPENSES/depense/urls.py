from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  ExpenseViewSet,CategoryViewSet ,UserViewSet


router = DefaultRouter()
router.register(r'Expense', ExpenseViewSet)
router.register(r'Category', CategoryViewSet)
router.register(r'user',UserViewSet)

urlpatterns = [
    path('', include(router.urls)),

]