import pandas


def handle_csv_to_import(file):
    df = pandas.read_csv(file)
    return calcPrice(df)


def calcPrice(df):
    df['price'] = df.cost + (df.cost * df.profit / 100)
    return df.drop(columns=['cost', 'profit'])