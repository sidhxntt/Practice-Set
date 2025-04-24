import random
from django.core.management.base import BaseCommand
from django.db import transaction
from faker import Faker
from api.models import Address, Album, Image, Post, Todo
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Populates the database with fake data for existing users'

    def add_arguments(self, parser):
        parser.add_argument('--albums', type=int, default=5, help='Max albums per user')
        parser.add_argument('--images', type=int, default=10, help='Max images per album')
        parser.add_argument('--posts', type=int, default=10, help='Max posts per user')
        parser.add_argument('--todos', type=int, default=10, help='Max todos per user')

    def handle(self, *args, **options):
        fake = Faker()
        max_albums_per_user = options['albums']
        max_images_per_album = options['images']
        max_posts_per_user = options['posts']
        max_todos_per_user = options['todos']

        users = list(User.objects.all())

        if not users:
            self.stdout.write(self.style.WARNING('No users found. Please create users first.'))
            return

        with transaction.atomic():
            for user in users:
                self.stdout.write(f'Populating data for user: {user.username} ({user.email})')

                # Create address
                address = Address.objects.create(
                    user=user,
                    street=fake.street_address(),
                    suite=fake.secondary_address(),
                    city=fake.city(),
                    zipcode=fake.zipcode(),
                    country=fake.country(),
                )
                self.stdout.write(f'  Created address: {address.street}, {address.city}')

                # Albums and images
                for _ in range(random.randint(0, max_albums_per_user)):
                    album = Album.objects.create(
                        user=user,
                        title=fake.catch_phrase(),
                        category=random.choice(['Travel', 'Work', 'Personal'])
                    )
                    self.stdout.write(f'  Created album: {album.title}')

                    for _ in range(random.randint(0, max_images_per_album)):
                        image = Image.objects.create(
                            album=album,
                            user=user,
                            title=fake.sentence(nb_words=4),
                            url=fake.image_url(),
                            thumbnail_url=fake.image_url(width=150, height=150)
                        )
                        self.stdout.write(f'    Created image: {image.title}')

                # Posts
                for _ in range(random.randint(0, max_posts_per_user)):
                    post = Post.objects.create(
                        user=user,
                        title=fake.sentence(),
                        body="\n\n".join(fake.paragraphs(nb=3))
                    )
                    self.stdout.write(f'  Created post: {post.title}')

                # Todos
                for _ in range(random.randint(0, max_todos_per_user)):
                    todo = Todo.objects.create(
                        user=user,
                        title=fake.sentence(),
                        completed=random.choice([True, False])
                    )
                    self.stdout.write(f'  Created todo: {todo.title}')

            self.stdout.write(self.style.SUCCESS(f'Successfully populated fake data for {len(users)} users'))
