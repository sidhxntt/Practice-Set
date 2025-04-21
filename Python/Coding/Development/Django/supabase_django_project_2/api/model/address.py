from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Address(models.Model):
    """
    Stores the user's address information with a one-to-one relationship to User.
    """
    street = models.CharField(
        max_length=255,
        verbose_name=_("Street Address"),
        help_text=_("Street name and number")
    )
    suite = models.CharField(
        max_length=255,
        verbose_name=_("Suite/Apt"),
        help_text=_("Apartment, suite, unit, etc."),
        blank=True,
        null=True
    )
    city = models.CharField(
        max_length=255,
        verbose_name=_("City")
    )
    zipcode = models.CharField(
        max_length=20,
        verbose_name=_("ZIP/Postal Code")
    )
    state = models.CharField(
        max_length=100,
        verbose_name=_("State/Province"),
        blank=True,
        null=True  # Consider allowing null here for consistency
    )
    country = models.CharField(
        max_length=100,
        verbose_name=_("Country"),
        default="United States"
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='address',
        verbose_name=_("User")
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Created At")
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Updated At")
    )
    # meta is like settings nothing here will get stored in DB but  Some things do affect database schema or behavior (like indexes or constraints), but none of them create fields (columns) that hold user-entered or model-stored data.
    class Meta:
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")
        indexes = [
            models.Index(fields=['zipcode']),
            models.Index(fields=['city', 'state']),
        ]
        ordering = ['user__username']

    def __str__(self):
        """_summary_
        🔹 Purpose: Readability in admin, shell, logs, etc.
        ❌ Not stored in DB.
        """
        return f"{self.street}, {self.city}, {self.state or ''} {self.zipcode}"

    def address_info(self):
        """
        Return a formatted full address.
        Custom display, API usage via SerializerMethodField, etc.
        Also not stored in DB.
        """
        parts = [self.street]
        if self.suite:
            parts.append(f"Suite {self.suite}")
        city_state_zip = ", ".join(filter(None, [self.city, self.state, self.zipcode]))
        parts.append(city_state_zip)
        parts.append(self.country)
        return ", ".join(parts)
