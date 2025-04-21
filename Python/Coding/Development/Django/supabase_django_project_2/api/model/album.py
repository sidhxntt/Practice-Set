from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Album(models.Model):
    """
    Album model that stores album information
    with a foreign key relationship to a User.
    """
    title = models.CharField(
        max_length=255,
        verbose_name=_("Album Title"),
        help_text=_("Unique title for your Album"),
        unique=True,
        default=_("My Photos")
    )
    category = models.CharField(
        max_length=50,
        verbose_name=_("Album Category"),
        help_text=_("What kind of pictures this album will contain"),
        default=_("Favourites"),
        blank=True,
        null=True
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='albums',
        verbose_name=_("User")
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Created at")
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Updated at")
    )

    class Meta:
        verbose_name = _("Album")
        verbose_name_plural = _("Albums")
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['title'])
        ]
        ordering = ['user__username']

    def __str__(self):
        return f"{self.title} ({self.category or 'Uncategorized'})"

    def album_info(self):
        """Return a formatted string with album metadata"""
        return f"Album: {self.title} | Category: {self.category or 'Uncategorized'} | User: {self.user.username}"
