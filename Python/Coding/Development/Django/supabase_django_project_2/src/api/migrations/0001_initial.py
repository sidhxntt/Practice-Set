# Generated by Django 5.2 on 2025-04-21 18:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='My Photos', help_text='Unique title for your Album', max_length=255, unique=True, verbose_name='Album Title')),
                ('category', models.CharField(blank=True, default='Favourites', help_text='What kind of pictures this album will contain', max_length=50, null=True, verbose_name='Album Category')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='albums', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Album',
                'verbose_name_plural': 'Albums',
                'ordering': ['user__username'],
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Title or caption for the image', max_length=255, verbose_name='Title')),
                ('url', models.URLField(help_text='URL to the full-size image', verbose_name='Image URL')),
                ('thumbnail_url', models.URLField(help_text='URL to the thumbnail version of the image', verbose_name='Thumbnail URL')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('album', models.ForeignKey(help_text='The album this image belongs to', on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.album', verbose_name='Album')),
                ('user', models.ForeignKey(help_text='The User this image belongs to', on_delete=django.db.models.deletion.CASCADE, related_name='images', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Image',
                'verbose_name_plural': 'Images',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Title of the blog post', max_length=255, verbose_name='Title')),
                ('body', models.TextField(help_text='Main content of the post', verbose_name='Body')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('user', models.ForeignKey(help_text='User who created the post', on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL, verbose_name='Author')),
            ],
            options={
                'verbose_name': 'Post',
                'verbose_name_plural': 'Posts',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Title of the todo item', max_length=255, verbose_name='Title')),
                ('completed', models.BooleanField(default=False, help_text='Mark as completed', verbose_name='Completed')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('user', models.ForeignKey(help_text='User this task belongs to', on_delete=django.db.models.deletion.CASCADE, related_name='todos', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Todo',
                'verbose_name_plural': 'Todos',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(help_text='Street name and number', max_length=255, verbose_name='Street Address')),
                ('suite', models.CharField(blank=True, help_text='Apartment, suite, unit, etc.', max_length=255, null=True, verbose_name='Suite/Apt')),
                ('city', models.CharField(max_length=255, verbose_name='City')),
                ('zipcode', models.CharField(max_length=20, verbose_name='ZIP/Postal Code')),
                ('state', models.CharField(blank=True, max_length=100, null=True, verbose_name='State/Province')),
                ('country', models.CharField(default='United States', max_length=100, verbose_name='Country')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='address', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'verbose_name': 'Address',
                'verbose_name_plural': 'Addresses',
                'ordering': ['user__username'],
                'indexes': [models.Index(fields=['zipcode'], name='api_address_zipcode_b5924c_idx'), models.Index(fields=['city', 'state'], name='api_address_city_dd8505_idx')],
            },
        ),
        migrations.AddIndex(
            model_name='album',
            index=models.Index(fields=['category'], name='api_album_categor_501346_idx'),
        ),
        migrations.AddIndex(
            model_name='album',
            index=models.Index(fields=['title'], name='api_album_title_17e95f_idx'),
        ),
        migrations.AddIndex(
            model_name='image',
            index=models.Index(fields=['album'], name='api_image_album_i_23f876_idx'),
        ),
        migrations.AddIndex(
            model_name='image',
            index=models.Index(fields=['title'], name='api_image_title_5c895f_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['title'], name='api_post_title_915672_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['user'], name='api_post_user_id_c6f027_idx'),
        ),
        migrations.AddIndex(
            model_name='todo',
            index=models.Index(fields=['completed'], name='api_todo_complet_d0b32d_idx'),
        ),
        migrations.AddIndex(
            model_name='todo',
            index=models.Index(fields=['user'], name='api_todo_user_id_4d7386_idx'),
        ),
    ]
