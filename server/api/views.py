import traceback
import pandas

from django.db import IntegrityError

from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import JSONParser, MultiPartParser, FileUploadParser
from rest_framework.decorators import action, parser_classes

from .models import Shoes
from .serializer import ShoesSerializer
from .services.productService import handle_csv_to_import


class ShoesViewSet(ModelViewSet):
    basename = 'shoes'
    queryset = Shoes.objects.all()
    serializer_class = ShoesSerializer
    lookup_field = 'slug'
    parser_classes = [JSONParser, MultiPartParser, FileUploadParser,]

    @action(url_path='csv-import', url_name='csv-import', detail=False, methods=['put',])
    def csv_import(self, request):
        try:
            df = handle_csv_to_import(request.data['file'])
            Shoes.objects.bulk_create_with_dataframe(df)
            return Response(status=HTTP_204_NO_CONTENT)
        except IntegrityError as ex:
            print(ex.args)
            return Response(status=HTTP_400_BAD_REQUEST)
        except Exception as ex:
            if hasattr(ex, 'message'):
                print(ex.message)
            return Response(status=HTTP_400_BAD_REQUEST)


