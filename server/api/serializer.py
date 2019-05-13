from rest_framework import serializers

from . import models


class ShoesSerializer(serializers.HyperlinkedModelSerializer):
    _id = serializers.HyperlinkedIdentityField(view_name='api:shoes-detail', lookup_field='slug')
    image = serializers.SerializerMethodField()

    class Meta:
        model = models.Shoes
        fields = ('_id', 'slug','name', 'image', 'brand', 'sizes', 'colors','description', 'price', 'featured')
        lookup_field = 'slug'

    def get_image(self, inst):
        request = self.context.get('request')
        image = inst.image.url
        return request.build_absolute_uri('/' + image)