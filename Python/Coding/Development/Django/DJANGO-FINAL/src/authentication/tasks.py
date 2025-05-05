# authentication/tasks.py
import logging
from celery import shared_task
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.apps import apps

logger = logging.getLogger(__name__)
dlq_logger = logging.getLogger("dead_letter")

@shared_task
def log_failed_email_task(task_name, user_id, email, reason, metadata=None):
    """
    Log failed email deliveries to a dead-letter queue for later review/retry.
    """
    dlq_logger.error(f"[DLQ] Task `{task_name}` failed for {email} | Reason: {reason} | User ID: {user_id} | Metadata: {metadata}")

@shared_task
def send_welcome_email(user_id, email, full_name):
    """
    Send a welcome email to newly registered users.
    
    Args:
        user_id: UUID string of the user
        email: Email address of the user
        full_name: Full name of the user for personalization
    """
    try:
        # Use a friendly name or username if available
        recipient_name = full_name if full_name else email.split('@')[0]
        
        # HTML email version with template
        html_content = render_to_string('authentication/emails/welcome_email.html', {
            'user_name': recipient_name,
            'site_name': settings.SITE_NAME if hasattr(settings, 'SITE_NAME') else 'Our Platform',
            'login_url': f"{settings.SITE_URL}/login" if hasattr(settings, 'SITE_URL') else '/login',
            'contact_email': settings.CONTACT_EMAIL if hasattr(settings, 'CONTACT_EMAIL') else settings.DEFAULT_FROM_EMAIL,
        })
        
        # Plain text version of the email
        text_content = strip_tags(html_content)
        
        # Create email message
        subject = f"Welcome to {settings.SITE_NAME if hasattr(settings, 'SITE_NAME') else 'Our Platform'}"
        from_email = settings.DEFAULT_FROM_EMAIL
        
        # Send email with both HTML and plain text
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[email],
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
        
        # Update user's email_sent status if needed
        User = apps.get_model('authentication', 'User')
        user = User.objects.get(id=user_id)
        user.welcome_email_sent = True
        user.save(update_fields=['welcome_email_sent'])
        
        logger.info(f"Welcome email sent to {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send welcome email to {email}: {str(e)}")
        log_failed_email_task.delay(
        task_name='send_welcome_email',
        user_id=user_id,
        email=email,
        reason=str(e),
        metadata={'full_name': full_name}
    )
        return False


@shared_task
def send_password_reset_email(user_id, email, reset_token, reset_url):
    """
    Send password reset email with token.
    
    Args:
        user_id: UUID string of the user
        email: Email address of the user
        reset_token: Password reset token
        reset_url: Complete URL for password reset
    """
    try:
        # HTML email version with template
        html_content = render_to_string('authentication/emails/password_reset_email.html', {
            'reset_url': reset_url,
            'site_name': settings.SITE_NAME if hasattr(settings, 'SITE_NAME') else 'Our Platform',
            'expiry_hours': 24,  # Token expiry in hours
        })
        
        # Plain text version of the email
        text_content = strip_tags(html_content)
        
        # Create email message
        subject = "Reset Your Password"
        from_email = settings.DEFAULT_FROM_EMAIL
        
        # Send email with both HTML and plain text
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[email],
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
        
        logger.info(f"Password reset email sent to {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send password reset email to {email}: {str(e)}")
        return False


@shared_task
def send_account_locked_notification(user_id, email):
    """
    Send notification when account is locked due to multiple failed login attempts.
    
    Args:
        user_id: UUID string of the user
        email: Email address of the user
    """
    try:
        # HTML email version with template
        html_content = render_to_string('authentication/emails/account_locked_email.html', {
            'support_email': settings.SUPPORT_EMAIL if hasattr(settings, 'SUPPORT_EMAIL') else settings.DEFAULT_FROM_EMAIL,
            'site_name': settings.SITE_NAME if hasattr(settings, 'SITE_NAME') else 'Our Platform',
        })
        
        # Plain text version of the email
        text_content = strip_tags(html_content)
        
        # Create email message
        subject = "Account Security Alert: Your Account Has Been Locked"
        from_email = settings.DEFAULT_FROM_EMAIL
        
        # Send email with both HTML and plain text
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[email],
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
        
        logger.info(f"Account locked notification sent to {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send account locked notification to {email}: {str(e)}")
        return False


@shared_task
def send_email_verification(user_id, email, verification_token, verification_url):
    """
    Send email verification link to user.
    
    Args:
        user_id: UUID string of the user
        email: Email address of the user
        verification_token: Email verification token
        verification_url: Complete URL for email verification
    """
    try:
        # HTML email version with template
        html_content = render_to_string('authentication/emails/email_verification.html', {
            'verification_url': verification_url,
            'site_name': settings.SITE_NAME if hasattr(settings, 'SITE_NAME') else 'Our Platform',
            'expiry_hours': 48,  # Token expiry in hours
        })
        
        # Plain text version of the email
        text_content = strip_tags(html_content)
        
        # Create email message
        subject = "Verify Your Email Address"
        from_email = settings.DEFAULT_FROM_EMAIL
        
        # Send email with both HTML and plain text
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=[email],
        )
        email.attach_alternative(html_content, "text/html")
        email.send()
        
        logger.info(f"Email verification sent to {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email verification to {email}: {str(e)}")
        return False