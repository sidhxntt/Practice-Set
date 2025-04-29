from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Custom handler that wraps the default DRF handler
    and adds extra formatting, logging, and fallback behavior.
    """

    # Call DRF's default handler first to get the standard response.
    response = exception_handler(exc, context)

    # Get view info for logging
    view = context.get('view', None)
    view_name = view.__class__.__name__ if view else 'UnknownView'

    # Log the exception with context
    logger.error(
        f"Exception in {view_name}: {str(exc)}",
        exc_info=True,
        extra={'context': context}
    )

    # If DRF handled the exception (like ValidationError, AuthenticationFailed)
    if response is not None:
        return Response({
            'success': False,
            'status_code': response.status_code,
            'message': response.data,
        }, status=response.status_code)

    # If it’s an unhandled exception (500 error, etc.)
    return Response({
        'success': False,
        'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
        'message': 'Something went wrong on our end. Please try again later.',
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
