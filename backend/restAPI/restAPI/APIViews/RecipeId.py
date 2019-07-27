from rest_framework.views import APIView
from rest_framework.response import Response
from restAPI.models import Recipe

class recipeId(APIView):
    def get(self,request):
        try:
            requestID = request.data.get('id')
            recipe = Recipe.objects.get(id=requestID)
            data = {
                'id':recipe.id,
                'Meal':recipe.Meal,
                'Category':recipe.Category,
                'Cuisine':recipe.Cuisine,
                'Instructions':recipe.Instructions,
                'Ingredients':recipe.Ingredients
            }
              
            resp_dict =  {
                'status':'success',
                'message':'retrieved object',
                'data': data
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
