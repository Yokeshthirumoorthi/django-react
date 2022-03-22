#!make
upload:
	docker-compose exec webserver python manage.py import_csv

setup:
	docker-compose up -d --build
	docker-compose exec webserver python manage.py migrate
	docker-compose exec webserver python manage.py create_users
	make upload

user:
	docker-compose exec webserver python manage.py createsuperuser

migrations:
	docker-compose exec webserver python manage.py makemigrations

clean:
	docker-compose down
	docker volume rm django-react_postgres_data
	