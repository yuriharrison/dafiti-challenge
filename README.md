# Dafiti Challenge


## Architecture

The application consists of two separate projects (in the same git repo) `client/` side and `server/` side. The client being a web Single Page Application (SPA) created with [ReactJs](https://reactjs.org/) with the [Typescript](https://www.typescriptlang.org/) language and the server side being an API builded in Python 3 with [Django](https://www.djangoproject.com/) and [Rest Framework](https://www.django-rest-framework.org/).

### About the Client Side

In the client, React was used exclusively with the new [Hooks](https://reactjs.org/docs/hooks-intro.html) functionality (no classes were used). All components are component functions or [higher-order components](https://reactjs.org/docs/higher-order-components.html) making use of `useState`, `useEffect` or custom hooks created inside the project. This approach make it easy to break big components in smaller ones, bring state and effect logic to functions components, functions are much smaller than classes to be minified, hooks make it easy to share logic among different components.

Also, the npm package `@reach/router` was used for routing, all API calls are handled by `axios`, the forms were constructed with the `Formik` package together with the validation package `Yup` and a Global Context Pattern was implemented (not necessary until now).

The client design was develop with the mobile-first approach with the help of Bootstrap 4.

#### Functionalities

Screens:
- `/` | `shoes/` :
    - List the shoes page by page.
    - Expand a detailed card when on shoe is clicked.
- `import/` :
    - Import a CSV file (more in the API specs bellow)

**There are an example file in the repository at `resources/shoes.csv`**


### About the Server Side

In the server side was created two models, a main model `Product` a generic product model to fit multiple kinds of products and a second proxy model ([about proxy models](https://docs.djangoproject.com/en/2.2/topics/db/models/#proxy-models)) was created `Shoes` proxy models uses the same table as the father (`Product`) which fits a good architecture to this project.

The Django Administration site was configured accordingly. Meaning you can manage `Shoes` having only the necessary fields or `Products` having the full spectrum. You could use this pattern to create other kinds of products and be able to set user permissions as necessary.

The Django Administration site is available in the path `admin/`.

The API was created with the required endpoints, being:
- GET     api/shoes/
- POST    api/shoes/
- GET     api/shoes/:slug/
- PUT     api/shoes/:slug/
- PATCH   api/shoes/:slug/
- DELETE  api/shoes/:slug/
- PUT     api/shoes/csv-import/

The `HyperlinkedModelSerializer` was used to make the API more 'Hypermedia like', following the REST API methodology.

The `csv-import` endpoint takes an csv file and use `pandas` to determined the product price of each row. To do that, it calculates the price with the columns `cost` (product cost) and `profit` (desired profit). After that it drops both columns and add a new `price` column. After the price is determined each row is converted to a `Shoes` object and passed through the `before_save` method. Then all the objects are passed to the `bulk_create` ([more about bulk_create](https://docs.djangoproject.com/en/2.1/ref/models/querysets/#bulk-create)) for a quick insertion in the database. If any row fail in the process or any required column is missing, the whole batch will be discarted and the `400 - Bad Request` response will be returned.

**There are an example file in the repository at `resources/shoes.csv`**


## Run the Application

### Postgres Database

- The API need access to a Postgres database. 
- You can quickly start a postgres instance with the [official postgres docker container](https://hub.docker.com/_/postgres).
- Set the database configuration in the `server/DafitiChallenge/settings.py` file


**Attention! Although you can run other SQL database on Django I don't recommend it for this project. This project make use of `django.contrib.postgres.fields.ArrayField` which PROBABLY won't work in other databases.**

### Django API

#### Requirements

- This API service run in Python 3. [Download](https://www.python.org/downloads/) or `apt-get install python3.6`
- Dependencies: `pandas`, `django`, `djangorestframework`, `django-cors-headers`, `psycopg2` `django_postgres_copy`, `pillow`
    - Deployment only: `gunicorn`

#### Steps

- Go to the `server/` folder: `cd server/`
- Install all the dependencies: `pip install -r requirements.txt`
- Run the django migration: `python manage.py migrate`
- Run the development server: `python manage.py runserver`
- By default the service will be running at port 8000. You can access at http://locahost:8000/

#### Custom Commands
 - Export table products to CSV: `python server/manage.py exportShoes`
 - Generate fake data: `python server/manage.py fakeData`

### React SPA

#### Requirements

- To run the React App you need NodeJs intalled. [Download](https://nodejs.org/en/download/) or `apt-get install nodejs`
- Dependencies: This app uses all the "Create React App" dependencies + `typescript`, `bootstrap`, `axios`, `@reach/router`, `formik`
    - **All the depencies can be installed with the command bellow**

#### Steps

- Go to the `client/` folder: `cd client`
- Install all the dependencies: `yarn install` ou `npm install`
- Run the development server: `yarn start` ou `npm start`
- By default the app will be running at port 3000. You can access at http://locahost:3000/


## Author

        Yuri Harrison