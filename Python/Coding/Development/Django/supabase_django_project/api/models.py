# api/models.py (schema.prisma)
from django.db import models
from authentication.models import User

class Address(models.Model): 
    """
    This is extending Address class from model class to make it a model Same for all others.
    Represents a user's address with one-to-one relationship to User.
    
    Django vs Prisma:
    - Django automatically creates an auto-incrementing 'id' field
    - In Prisma: model Address { id Int @id @default(autoincrement()) }
    """
    street = models.CharField(max_length=255)  # String in Prisma
    suite = models.CharField(max_length=255)   # String
    city = models.CharField(max_length=255)    # String
    zipcode = models.CharField(max_length=20)  # String
    
    # One-to-one relationship (User can have only one Address)
    # In Prisma: user User @relation(fields: [userId], references: [id])
    #            userId Int @unique
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE,  # If user is deleted, delete this address too
        related_name='address'    # Access via user.address
    )
    
    def __str__(self):
        """String representation for admin panel and debugging"""
        return f"{self.street}, {self.city}"
    
    class Meta:
        """Model metadata"""
        verbose_name_plural = "Addresses"  # How it appears in Django Admin

    # Django ORM usage examples:
    # Get all addresses: Address.objects.all()
    # Prisma equivalent: prisma.address.findMany()
    #
    # Get one address: Address.objects.get(id=1)
    # Prisma equivalent: prisma.address.findUnique(where: { id: 1 })
    #
    # Filter addresses: Address.objects.filter(city="New York")
    # Prisma equivalent: prisma.address.findMany(where: { city: "New York" })
    #
    # Create address: Address.objects.create(street="123 Main", ...)
    # Prisma equivalent: prisma.address.create(data: { street: "123 Main", ... })

class Album(models.Model):
    """Album model with many-to-one relationship to User"""
    title = models.CharField(max_length=255)
    
    # Many-to-one relationship (User can have many Albums)
    # In Prisma: user User @relation(fields: [userId], references: [id])
    #            userId Int
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,  # If user is deleted, delete all their albums
        related_name='albums'   # Access user's albums via user.albums.all()
    )
    
    def __str__(self):
        return self.title

    # Django ORM usage examples:
    # Get all albums: Album.objects.all()
    # Get albums with related user: Album.objects.select_related('user').all()
    # Prisma equivalent: prisma.album.findMany({ include: { user: true } })
    #
    # Get user's albums: user.albums.all()
    # Prisma equivalent: prisma.user.findUnique({ where: { id: 1 } }).albums()

class Image(models.Model):
    """Image model belonging to an Album"""
    title = models.CharField(max_length=255)
    url = models.URLField()                # URL in Prisma
    thumbnailUrl = models.URLField()       # snake_case in Django vs camelCase in Prisma
    
    # Many-to-one relationship (Album can have many Images)
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,  # If album is deleted, delete all its images
        related_name='images'     # Access album's images via album.images.all()
    )
    
    def __str__(self):
        return self.title

    # Django ORM usage examples:
    # Get all images: Image.objects.all()
    # Get images with album and user: Image.objects.select_related('album__user').all()
    # Prisma equivalent: prisma.image.findMany({ 
    #   include: { album: { include: { user: true } } }
    # })

class Post(models.Model):
    """Blog post model"""
    title = models.CharField(max_length=255)
    body = models.TextField()  # String in Prisma (no specific Text type)
    
    # Many-to-one relationship (User can have many Posts)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts'  # Access user's posts via user.posts.all()
    )
    
    def __str__(self):
        return self.title

    # Django ORM usage examples:
    # Create post: Post.objects.create(title="Hello", body="World", user=user)
    # Update post: post.title = "New title"; post.save()
    # Prisma equivalent: prisma.post.update({ where: { id: 1 }, data: { title: "New title" } })
    #
    # Delete post: post.delete()
    # Prisma equivalent: prisma.post.delete({ where: { id: 1 } })

class Todos(models.Model):
    """Todo items for users"""
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)  # @default(false) in Prisma
    
    # Many-to-one relationship (User can have many Todos)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='todos'  # Access user's todos via user.todos.all()
    )
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Todos"

    # Django ORM usage examples:
    # Get incomplete todos: Todos.objects.filter(completed=False)
    # Prisma equivalent: prisma.todos.findMany({ where: { completed: false } })
    #
    # Count completed todos: Todos.objects.filter(completed=True).count()
    # Prisma equivalent: prisma.todos.count({ where: { completed: true } })
    #
    # Bulk update: Todos.objects.filter(user=user).update(completed=True)
    # Prisma equivalent: prisma.todos.updateMany({ 
    #   where: { userId: 1 }, 
    #   data: { completed: true }
    # })