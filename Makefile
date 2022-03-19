#!make
setup:
	docker-compose up -d --build
	docker-compose exec webserver python manage.py migrate
	docker-compose exec webserver python manage.py create_user
	
user:
	docker-compose exec webserver python manage.py createsuperuser

migrations:
	docker-compose exec webserver python manage.py makemigrations

clean:
	docker-compose down
	