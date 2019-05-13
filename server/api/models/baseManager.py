from django.db import models


class BaseManager(models.Manager):

    def bulk_create_with_dataframe(self, dataframe):
        modelList = []
        for kw in dataframe.to_dict('records'):
            model = self.model(**kw)
            model.before_save()
            modelList.append(model)
        self.bulk_create(modelList)

    def bulk_update_with_dataframe(self, dataframe):
        self.bulk_create_with_dataframe(
            [self.model(**kw) for kw in dataframe.to_dict('records')]
        )