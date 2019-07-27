from rest_framework.views import APIView
from rest_framework.response import Response
from restAPI.models import Recipe

class recipeCategory(APIView):
    def get(self,request):
        category = request.data.get('Category')
        try:
            recipeArray = []
            recipes = Recipe.objects.filter(Category=category)
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