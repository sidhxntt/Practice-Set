import os

def caching(env):
    if env.get('prod') or env.get('stage'):
        return {
            'cache_config': {
                'default': {
                    'BACKEND': 'django_redis.cache.RedisCache',
                    'LOCATION': os.getenv('REDIS_URL', 'redis://127.0.0.1:6379/1'),
                    'OPTIONS': {
                        'CLIENT_CLASS': 'django_redis.client.DefaultClient',
                        'SOCKET_CONNECT_TIMEOUT': 5,
                        'SOCKET_TIMEOUT': 5,
                        'CONNECTION_POOL_KWARGS': {'max_connections': 50},
                        'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
                        'IGNORE_EXCEPTIONS': True,
                    },
                    'KEY_PREFIX': 'django_',
                }
            },
            'SESSION_ENGINE': 'django.contrib.sessions.backends.cache',
            'SESSION_CACHE_ALIAS': 'default',
        }
    else:
        return {
            'cache_config': {
                'default': {
                    'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
                    'LOCATION': 'unique-snowflake',
                }
            }
        }
