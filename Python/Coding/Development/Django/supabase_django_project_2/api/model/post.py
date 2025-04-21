from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

class Post(models.Model):
    """
    Blog post model associated with a user.
    """
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
        help_text=_("Title of the blog post")
    )
    body = models.TextField(
        verbose_name=_("Body"),
        help_text=_("Main content of the post")
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='posts',
        verbose_name=_("Author"),
        help_text=_("User who created the post")
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
        verbose_name = _("Post")
        verbose_name_plural = _("Posts")
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return f"{self.title} by {self.user.username}"

    def summary(self):
        """Return the first 100 characters of the post body."""
        return self.body[:100] + "..." if len(self.body) > 100 else self.body
