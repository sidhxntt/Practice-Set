```
kubectl create secret docker-registry docker-login \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=dedsec2002 \
  --docker-password=Music@2002 \
  --docker-email=siddhantg2002@gmail.com \
  --namespace=auth
```