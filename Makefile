#!make
setup:
	docker-compose up -d --build
	docker-compose exec webserver python manage.py migrate

user:
	docker-compose exec webserver python manage.py createsuperuser

migrations:
	docker-compose exec webserver python manage.py makemigrations

clean:
	docker-compose down
	