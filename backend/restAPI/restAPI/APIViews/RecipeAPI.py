from rest_framework.views import APIView
from rest_framework.response import Response
from restAPI.models import Recipe

class recipeAPI(APIView):
    def get(self,request):
        try:
            recipeArray = []
            recipes = Recipe.objects.filter()
            for recipe in recipes: 
                data = {
                    'id':recipe.id,
                    'Meal':recipe.Meal,
                    'Category':recipe.Category,
                    'Cuisine':recipe.Cuisine,
                    'Instructions':recipe.Instructions,
                    'Ingredients':recipe.Ingredients
                }
                recipeArray.append(data)
                resp_dict =  {
                'status':'success',
                'message':'retrieved object',
                'data': recipeArray
            }
            resp = Response()
            resp.status_code = 201
            resp.data = resp_dict
        except:
            resp_dict =  {
                'status':'fail',
                'message': 'something went wrong',
                'data':{}
            }
            resp = Response()
            resp.status_code = 404
            resp.data = resp_dict
        return resp
    
    def post(self,request):
        data = request.data
        try:
            Meal = data.get("Meal")
            Category = data.get("Category")
            Cuisine = data.get("Cuisine")
            Instructions = data.get("Instructions")
            Ingredients = data.get("Ingredients")
            newRecipe = Recipe()
            newRecipe.Meal = Meal
            newRecipe.Category = Category
            newRecipe.Cuisine = Cuisine
            newRecipe.Instructions = Instructions
            newRecipe.Ingredients = Ingredients
            newRecipe.save()
            resp_dict =  {
                'status':'success',
                'message':'Added test input successfully',
                'data':{}
            }
            resp = Response()
            resp.status_code = 201
            resp.data = resp_dict
        except:
            resp_dict =  {
                'status':'fail',
                'message':'Error adding to database',
                'data':{}
            }
            resp = Response()
            resp.status_code = 404
            resp.data = resp_dict
        return Response("addRecipe")