# django-react

A simple full stack project with Django and React.

## Build and Deploy Instructions

### Pre-requisites

- Install [Docker](https://www.docker.com/products/overview)
- Install [Docker Compose](https://docs.docker.com/compose/install/)
- Install make

### GettingStarted

```bash
git clone https://github.com/Yokeshthirumoorthi/django-react.git
cd django-react
make setup
```

### Create User

Create a user with the following command. This user is used to login in website

```bash
make user
```

Now visit http://localhost:3000 and login with the new user credentials.

### Checking Database

Visit http://localhost:8082 and use the following credentials to login to database.

```
System  :   PostgresSQL
Server  :   db
Username:   django_react
Paswword:   django_react
Database:   django_react_dev
```

## Author

1. Yokesh Thirumoorthi - initial author - yokeshthirumoorthi@gmail.com

## License

This program is licensed under the "MIT License". Please see the file LICENSE in the source distribution of this software for license terms.
