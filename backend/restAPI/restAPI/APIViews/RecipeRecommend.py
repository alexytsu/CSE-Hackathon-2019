from rest_framework.views import APIView
from rest_framework.response import Response
from restAPI.models import Recipe

class recipeRecommend(APIView):
    def get(self,request):
        try:
            requestID = request.data.get('id')
            resp_dict =  {
                'status':'success',
                'message':'retrieved object',
                'data': requestID
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
