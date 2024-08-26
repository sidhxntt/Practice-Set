```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo-express
  labels:
    app: mongo-express
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo-express
  template:
    metadata:
      labels:
        app: mongo-express
    spec:
      containers:
      - name: mongo-express
        image: mongo-express
        ports:
        - containerPort: 8081
        env:
        - name: ME_CONFIG_MONGODB_ADMINUSERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-username
        - name: ME_CONFIG_MONGODB_ADMINPASSWORD
          valueFrom: 
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-password
        - name: ME_CONFIG_MONGODB_SERVER
          valueFrom: 
            configMapKeyRef:
              name: mongodb-configmap
              key: database_url


```
### 1. `apiVersion: apps/v1`
This specifies the API version of the Kubernetes object you're using. In this case, it's `apps/v1`, which is the stable version for Deployment resources.

### 2. `kind: Deployment`
This specifies the type of Kubernetes object you're defining. A Deployment manages a set of identical pods, ensuring the desired number of them are running at all times.

### 3. `metadata`
This section contains metadata about the Deployment.
- **`name: mongodb-deployment`**: The name of the Deployment is `mongodb-deployment`.
- **`labels`**: Labels are key-value pairs that help to categorize Kubernetes objects.
  - **`app: mongodb`**: This label categorizes the Deployment as part of the `mongodb` application.

### 4. `spec`
This section defines the desired state of the Deployment.
- **`replicas: 1`**: Specifies that one pod should be running at all times. If the pod fails or is terminated, Kubernetes will create a new one to replace it.
- **`selector`**: This defines how to identify the pods that belong to this Deployment.
  - **`matchLabels`**: The Deployment will manage pods that have the label `app: mongodb`.

### 5. `template`
This section describes the pods that will be created by the Deployment.
- **`metadata`**: Similar to the Deployment's metadata, this section labels the pod.
  - **`labels`**: The pod will be labeled with `app: mongodb`, ensuring that it matches the Deployment's selector.
  
- **`spec`**: Defines the specifications for the pod.
  - **`containers`**: This is a list of containers that will run within the pod.
    - **`- name: mongodb`**: The name of the container is `mongodb`.
    - **`image: mongo`**: The container will use the official `mongo` image from Docker Hub.
    - **`ports`**: This specifies the ports that should be exposed.
      - **`containerPort: 27017`**: Exposes port `27017`, which is the default port MongoDB listens on.
    
    - **`env`**: Defines environment variables for the container.
      - **`- name: MONGO_INITDB_ROOT_USERNAME`**: This sets the `MONGO_INITDB_ROOT_USERNAME` environment variable. Instead of hardcoding the value, it references a Kubernetes Secret.
        - **`valueFrom`**: Indicates that the value will come from another Kubernetes resource.
          - **`secretKeyRef`**: This is a reference to a key within a Kubernetes Secret.
            - **`name: mongodb-secret`**: The name of the secret is `mongodb-secret`.
            - **`key: mongo-root-username`**: This specifies which key in the secret to use, in this case, `mongo-root-username`.

      - **`- name: MONGO_INITDB_ROOT_PASSWORD`**: Similar to the username, this sets the `MONGO_INITDB_ROOT_PASSWORD` environment variable.
        - **`valueFrom`**: The value will be retrieved from a Kubernetes Secret.
          - **`secretKeyRef`**: References a key within a Kubernetes Secret.
            - **`name: mongodb-secret`**: The name of the secret is `mongodb-secret`.
            - **`key: mongo-root-password`**: The key in the secret is `mongo-root-password`.
