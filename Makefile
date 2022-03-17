#!make
server:
	docker-compose up -d --build
	docker-compose exec web python manage.py migrate

user:
	docker-compose exec web python manage.py createsuperuser

migrations:
	docker-compose exec web python manage.py makemigrations

clean:
	docker-compose down
	