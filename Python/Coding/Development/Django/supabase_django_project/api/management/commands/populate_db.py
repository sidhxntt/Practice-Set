# api/management/commands/populate_db.py

import random
from pathlib import Path
from django.core.management.base import BaseCommand
from django.db import transaction
from faker import Faker
from authentication.models import User
from api.models import Address, Album, Image, Post, Todos

class Command(BaseCommand):
    help = 'Populates the database with fake data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=10,
            help='Number of users to create'
        )
        parser.add_argument(
            '--albums',
            type=int,
            default=5,
            help='Maximum number of albums per user'
        )
        parser.add_argument(
            '--images',
            type=int,
            default=10,
            help='Maximum number of images per album'
        )
        parser.add_argument(
            '--posts',
            type=int,
            default=10,
            help='Maximum number of posts per user'
        )
        parser.add_argument(
            '--todos',
            type=int,
            default=10,
            help='Maximum number of todos per user'
        )

    def handle(self, *args, **options):
        # Create directory for management commands if it doesn't exist
        Path('api/management').mkdir(exist_ok=True)
        Path('api/management/commands').mkdir(exist_ok=True)
        
        fake = Faker()
        user_count = options['users']
        max_albums_per_user = options['albums']
        max_images_per_album = options['images']
        max_posts_per_user = options['posts']
        max_todos_per_user = options['todos']
        
        self.stdout.write(f'Creating {user_count} users...')
        
        # Use a transaction to ensure all or nothing
        with transaction.atomic():
            # Create users
            users = []
            for i in range(user_count):
                first_name = fake.first_name()
                last_name = fake.last_name()
                email = fake.email()
                
                # Ensure unique username, phone, website by using user id in them
                username = f"{first_name.lower()}{i}"
                phone = f"+1{fake.numerify('##########')}"
                website = f"http://{username}.{fake.domain_name()}"
                
                user = User.objects.create_user(
                    email=email,
                    password='password123',  # Simple password for testing
                    first_name=first_name,
                    last_name=last_name,
                    full_name=f"{first_name} {last_name}",
                    username=username,
                    phone=phone,
                    website=website,
                    role=random.choice(['admin', 'user', 'editor'])
                )
                users.append(user)
                self.stdout.write(f'  Created user: {user.email}')
                
                # Create address for each user
                address = Address.objects.create(
                    user=user,
                    street=fake.street_address(),
                    suite=fake.secondary_address(),
                    city=fake.city(),
                    zipcode=fake.zipcode()
                )
                self.stdout.write(f'    Created address: {address.street}, {address.city}')
                
                # Create albums for each user
                album_count = random.randint(0, max_albums_per_user)
                for j in range(album_count):
                    album = Album.objects.create(
                        user=user,
                        title=fake.catch_phrase()
                    )
                    self.stdout.write(f'    Created album: {album.title}')
                    
                    # Create images for each album
                    image_count = random.randint(0, max_images_per_album)
                    for k in range(image_count):
                        image = Image.objects.create(
                            album=album,
                            title=fake.sentence(nb_words=4),
                            url=fake.image_url(),
                            thumbnailUrl=fake.image_url(width=150, height=150)
                        )
                        self.stdout.write(f'      Created image: {image.title}')
                
                # Create posts for each user
                post_count = random.randint(0, max_posts_per_user)
                for j in range(post_count):
                    post = Post.objects.create(
                        user=user,
                        title=fake.sentence(),
                        body=fake.paragraphs(nb=3)
                    )
                    self.stdout.write(f'    Created post: {post.title}')
                
                # Create todos for each user
                todo_count = random.randint(0, max_todos_per_user)
                for j in range(todo_count):
                    todo = Todos.objects.create(
                        user=user,
                        title=fake.sentence(),
                        completed=random.choice([True, False])
                    )
                    self.stdout.write(f'    Created todo: {todo.title}')
            
            self.stdout.write(self.style.SUCCESS(f'Successfully created {user_count} users with related data'))