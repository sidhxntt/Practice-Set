ELASTI-USERNAME = elastic
ELASTI_PASS = F4utEKg7UHhCtrZIiP=C
KIBANA-ENROLLMENT = eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTcyLjIxLjAuMzo5MjAwIl0sImZnciI6ImYxODI5NDQ0MmMwYzAxN2JlYzY4MjcyODAyNWM0NGQ4ZTg3ODQ2ZTllYzZmODgxOGY4OTc0MDA3MTA1ZDZlYWMiLCJrZXkiOiJ3cWdaQnBjQlZ6clhmcEczWjdFajpYVTVNR0NpYzFhbW8zY3JWblllU3ZBIn0=


Create index patterns in Kibana:

Open Kibana at http://localhost:5601
Go to Management > Stack Management > Index Patterns
Create index pattern "filebeat-*"
Select @timestamp as the time field


View your logs:

Go to Analytics > Discover in Kibana
Select the filebeat-* index pattern
Your logs should appear in the interface



This approach:

Works without requiring changes to your application code
Handles log rotation and file watching automatically
Supports JSON logs natively
Is resilient to container restarts


docker run --name filebeat --net elastic \                                    
  --volume="/Users/siddhantgupta/Desktop/SID/DJANGO/src/filebeat-config/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro" \
  --volume="/Users/siddhantgupta/Desktop/SID/DJANGO/src/core/logs:/logs:ro" \
  --volume="/Users/siddhantgupta/Desktop/SID/DJANGO/http_ca.crt:/certs/http_ca.cert:ro" \
  docker.elastic.co/beats/filebeat:9.0.0


ELK
REDIS
SUPABASE
PROM+GRAFANA -> APM
MAIL USING CELERY
MEDIA STORAGE