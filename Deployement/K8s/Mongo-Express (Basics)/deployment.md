### 1. **Deployment**

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

---

### 2. **Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
  labels:
    app: mongo-express
spec:
  selector:
    app: mongo-express
  ports:
    - protocol: TCP
      port: 8081
      targetPort: 8081
  type: ClusterIP
```

### Explanation:

#### 1. `apiVersion: v1`
Specifies the API version for the Kubernetes object. In this case, `v1` is used for core objects like `Service`.

#### 2. `kind: Service`
Defines the type of Kubernetes object. A `Service` provides a stable IP address and DNS name for a set of pods, allowing them to be accessed internally or externally.

#### 3. `metadata`
Contains metadata about the Service.
- **`name: mongo-express-service`**: The name of the Service is `mongo-express-service`.
- **`labels`**: Labels help categorize the Service.
  - **`app: mongo-express`**: The label indicates that this Service is part of the `mongo-express` application.

#### 4. `spec`
Defines the desired state of the Service.
- **`selector`**: Specifies which pods this Service will route traffic to.
  - **`app: mongo-express`**: The Service will route traffic to pods that have the label `app: mongo-express`.
- **`ports`**: Specifies the ports that the Service should expose.
  - **`protocol: TCP`**: The protocol used is TCP.
  - **`port: 8081`**: The port that the Service will expose within the cluster.
  - **`targetPort: 8081`**: The port on the pod that the traffic will be forwarded to.
- **`type: ClusterIP`**: The Service type is `ClusterIP`, which means the Service is accessible only within the Kubernetes cluster.

---

### 3. **ConfigMap**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service
```

### Explanation:

#### 1. `apiVersion: v1`
Specifies the API version for the Kubernetes object. Here, `v1` is used for core objects like `ConfigMap`.

#### 2. `kind: ConfigMap`
Defines the type of Kubernetes object. A `ConfigMap` is used to store non-confidential configuration data in key-value pairs.

#### 3. `metadata`
Contains metadata about the ConfigMap.
- **`name: mongodb-configmap`**: The name of the ConfigMap is `mongodb-configmap`.

#### 4. `data`
Contains the actual key-value pairs that make up the ConfigMap.
- **`database_url: mongodb-service`**: The key `database_url` is set to the value `mongodb-service`, which could be the name of a service or another relevant configuration value.

---

### 4. **Secret**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-secret
type: Opaque
data:
  mongo-root-username: bXlVc2Vy
  mongo-root-password: c2VjcmV0UGFzc3dvcmQ=
```

### Explanation:

#### 1. `apiVersion: v1`
Specifies the API version for the Kubernetes object. `v1` is used for core objects like `Secret`.

#### 2. `kind: Secret`
Defines the type of Kubernetes object. A `Secret` is used to store sensitive information, such as passwords, tokens, or keys.

#### 3. `metadata`
Contains metadata about the Secret.
- **`name: mongodb-secret`**: The name of the Secret is `mongodb-secret`.

#### 4. `type: Opaque`
Specifies the type of Secret. `Opaque` is a generic type for arbitrary user-defined data.

#### 5. `data`
Contains the actual key-value pairs that make up the Secret. The values are base64 encoded.
- **`mongo-root-username: bXlVc2Vy`**: The `mongo-root-username` key contains a base64-encoded value (in this case, `bXlVc2Vy` which decodes to `myUser`).
- **`mongo-root-password: c2VjcmV0UGFzc3dvcmQ=`**: The `mongo-root-password` key contains a base64-encoded value (in this case, `c2VjcmV0UGFzc3dvcmQ=` which decodes to `secretPassword`).

---

### 5. **PersistentVolumeClaim**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

### Explanation:

#### 1. `apiVersion: v1`
Specifies the API version for the Kubernetes object. `v1` is used for core objects like `PersistentVolumeClaim`.

#### 2. `kind: PersistentVolumeClaim`
Defines the type of Kubernetes object. A `PersistentVolumeClaim` (PVC) is a request for storage by a user.

#### 3. `metadata`
Contains metadata about the PVC.
- **`name: mongodb-pvc`**: The name of the PVC is `mongodb-pvc`.

#### 4. `spec`
Defines the desired state of the PVC.
- **`accessModes`**: Specifies the access modes for the volume.
  - **`ReadWriteOnce`**: The volume can be mounted as read-write by a single node.
- **`resources`**: Specifies the resources required by the PVC.
  - **`requests`**: Requests specific amounts of resources.
    - **`storage: 1Gi`**: Requests 1 GiB of storage.
