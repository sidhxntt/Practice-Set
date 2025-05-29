core.views.home_views = landing page of api
core.urls = main router of the api
core.settings = MAIN SERVER CONFIG
core.celery = celery settings (queue system)
core.logs.req_logs & core.logs.error_logs = logs of the api resp.
core.oauth.github & core.oauth.google = OAUTH points of the api
core.utils.db_and_cache.caching = CACHE SETTINGS
core.utils.db_and_cache.database= DB SETTINGS
core.utils.db_and_cache.database= DB SETTINGS
core.utils.drf.app_pass_validators= validators for password while making user
core.utils.drf.middleware= All the apps/packages we are using in our backend
core.utils.db_and_cache.database= DB SETTINGS

eyJ2ZXIiOiI4LjE0LjAiLCJhZHIiOlsiMTcyLjIxLjAuMzo5MjAwIl0sImZnciI6IjNiZjAxYmYxMWQ2NmE1YWM5OGZlMTllYzhkODNiOWY4Njg1NGM0MThlNGZhNmFiZTVjNzc5NTM1ODIwN2M2NmEiLCJrZXkiOiI0ZzZsRzVjQkNlTmhtVFJwdzdKNjpTaTJEanRRWV9XT2tNX0gwRWNmeHNnIn0=

Nginix
K8s
S3

steps
1. DOwnload Redis docker img and run it
2. pdm run migrate
3. pdm run user
4. pdm run seed
5. Make ENABLE_ELASTICSEARCH=True & and start new terminal
6. Stop/ delete Redis container
7. pdm run elk in new terminal
8. pdm run elasti in new terminal



deployment.apps/redis condition met
deployment.apps/elasticsearch condition met
I0529 17:29:37.806490   88056 reflector.go:556] "Warning: watch ended with error" reflector="k8s.io/client-go/tools/watch/informerwatcher.go:162" type="*unstructured.Unstructured" err="an error on the server (\"unable to decode an event from the watch stream: http2: client connection lost\") has prevented the request from succeeding"
E0529 17:29:49.409448   88056 reflector.go:200] "Failed to watch" err="failed to list *unstructured.Unstructured: Get \"https://127.0.0.1:56886/apis/apps/v1/namespaces/monitoring-stack/deployments?fieldSelector=metadata.name%3Dkibana&resourceVersion=11332\": net/http: TLS handshake timeout" reflector="k8s.io/client-go/tools/watch/informerwatcher.go:162" type="*unstructured.Unstructured"
I0529 17:31:11.748710   88056 reflector.go:556] "Warning: watch ended with error" reflector="k8s.io/client-go/tools/watch/informerwatcher.go:162" type="*unstructured.Unstructured" err="an error on the server (\"unable to decode an event from the watch stream: http2: client connection lost\") has prevented the request from succeeding"
E0529 17:31:26.668618   88056 reflector.go:200] "Failed to watch" err="failed to list *unstructured.Unstructured: Get \"https://127.0.0.1:56886/apis/apps/v1/namespaces/monitoring-stack/deployments?fieldSelector=metadata.name%3Dkibana&resourceVersion=11332\": net/http: TLS handshake timeout" reflector="k8s.io/client-go/tools/watch/informerwatcher.go:162" type="*unstructured.Unstructured"
I0529 17:33:32.838973   88056 reflector.go:556] "Warning: watch ended with error" reflector="k8s.io/client-go/tools/watch/informerwatcher.go:162" type="*unstructured.Unstructured" err="an error on the server (\"unable to decode an event from the watch stream: http2: client connection lost\") has prevented the request from succeeding"
E0529 17:33:44.036640   88056 reflector.go:200] "Failed to watch" err="failed to list *unstructured.Unstructured: Get \"https://127.0.0.1:56886/apis/apps/v1/namespaces/monitoring-stack/deployments?fieldSelector=metadata.name%3Dkibana&resourceVersion=11822\": net/http: TLS handshake timeout" reflector="k8s.io/client-go/tools/watch/informerwatcher.go:162" type="*unstructured.Unstructured"
error: timed out waiting for the condition on deployments/kibana