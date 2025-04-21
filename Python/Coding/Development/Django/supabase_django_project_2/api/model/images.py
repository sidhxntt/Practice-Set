from django.db import models
from django.utils.translation import gettext_lazy as _
from .album import Album
from django.contrib.auth.models import User


class Image(models.Model):
    """
    Stores an image belonging to an album.
    """
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
        help_text=_("Title or caption for the image")
    )
    url = models.URLField(
        verbose_name=_("Image URL"),
        help_text=_("URL to the full-size image")
    )
    thumbnail_url = models.URLField(
        verbose_name=_("Thumbnail URL"),
        help_text=_("URL to the thumbnail version of the image")
    )

    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name=_("Album"),
        help_text=_("The album this image belongs to")
    )
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name=_("User"),
        help_text=_("The User this image belongs to")
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Created At")
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Updated At")
    )

    class Meta:
        verbose_name = _("Image")
        verbose_name_plural = _("Images")
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['album']),
            models.Index(fields=['title']),
        ]

    def __str__(self):
        return f"{self.title} (Album: {self.album.title})"

    def get_image_info(self):
        """
        Returns a dictionary of the image details.
        """
        return {
            "title": self.title,
            "url": self.url,
            "thumbnail_url": self.thumbnail_url,
            "album": self.album.title
        }
