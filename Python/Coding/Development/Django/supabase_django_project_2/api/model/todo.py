from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

class Todo(models.Model):
    """
    A todo item representing a task for a user.
    """
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
        help_text=_("Title of the todo item")
    )
    completed = models.BooleanField(
        default=False,
        verbose_name=_("Completed"),
        help_text=_("Mark as completed")
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='todos',
        verbose_name=_("User"),
        help_text=_("User this task belongs to")
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
        verbose_name = _("Todo")
        verbose_name_plural = _("Todos")
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['completed']),
            models.Index(fields=['user']),
        ]

    def __str__(self):
        return f"[{'✓' if self.completed else ' '}] {self.title}"
