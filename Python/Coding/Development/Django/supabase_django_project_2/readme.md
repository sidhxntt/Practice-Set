todo:
analysis of MVS anaology to express

By default, django-prometheus provides:

1. Request count, latency
2. View count by endpoint
3. Middleware timing
4. Database queries per model/table
5. Cache usage
6. Migrations (success/fail)
7. Response statuses

## Teck Stack Used

1. DRF
   - security header (SSL,XSS,CORS,CSRF),
   - django_filters (ORDERING, SEARCHING, FILTERING),
   - health_check (APP, DB, CACHE),
   - JWT AUTH
2. Supabase & Redis
3. OpenAPI schema, Swagger UI & Redoc UI
4. Prometheus & Grafana
5. Elastisearch, Logstash, Kibana (ELK Stash)
6. Sentry
7. Celery
8. Docker & Docker Compose
