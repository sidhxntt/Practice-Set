### 1. What is an API?

An API, or Application Programming Interface, is a defined set of rules and protocols that allow different software components to communicate with each other. It acts as an interface between different systems—often between a frontend application and a backend service—without exposing the internal logic or implementation details.For example, in a web application, the frontend sends HTTP requests to backend APIs to retrieve or update data. The most widely used type is REST API, which leverages standard HTTP methods like GET, POST, PUT, and DELETE.

---

### 2. Difference b/w SDK & API

An API defines how software components communicate—it’s the _interface_. An SDK, or Software Development Kit, is a collection of tools, libraries, and documentation that helps developers integrate or build on top of a platform more efficiently.
For example, when building authentication features, I could use Clerk's SDK like `clerk.js`, which abstracts away much of the boilerplate needed for login/signup flows. Under the hood, the SDK typically uses APIs but also includes helper functions, UI components, and docs to speed up development

---

### 3. What is the difference between REST and SOAP?

**REST** (Representational State Transfer) and **SOAP** (Simple Object Access Protocol) are two approaches for building APIs, but they differ in design principles, flexibility, and complexity:

- **SOAP** is a **protocol** that uses XML for all messages and follows strict standards.
- **REST** is an **architectural style** that uses standard HTTP methods (GET, POST, etc.) and supports multiple data formats (JSON, XML, etc.).

---

### 4. What are HTTP methods and what are they used for?

GET vs POST vs PUT vs DELETE

- **GET** → Retrieve data
- **POST** → Create data
- **PUT** → Update data
- **DELETE** → Remove data

---

### 5. What is the difference between PUT and PATCH?

There's also **PATCH**, which partially updates a resource and differs from PUT, which typically replaces the entire resource.

---

### 6. What is an Endpoint ?

An endpoint is a specific URL path that represents a resource or action in an API. It defines where an API can be accessed by a client.
In REST APIs, endpoints are usually structured around resources (like users, posts, or orders), and paired with HTTP methods to perform actions.

---

### 7. What is a request and response in HTTP? What are HTTP headers and cookies?

- A request is when client asks for resource from server/ wants to put/post a resource where as server providing resource or making the applied chages is a response. An this request-response cycle takes place in HTTP protocol.
- HTTP headers are key-value pairs sent between clients and servers in HTTP requests and responses. They carry metadata about the request or response, such as content type, authorization info, caching rules, and more.
- Cookies are small pieces of data stored on the client (browser) and sent automatically with every HTTP request to the server that set them. They are mainly used to maintain state, like session IDs, user preferences, or tracking info.

---

### 8. What is the difference between 200, 201, 400, 401, 403, 404, and 500 status codes?

    ✅ 2xx – Success

        1. 200 OK:
            - The request was successful. Used for GET, PUT, or DELETE when everything works as expected.
        2. 201 Created:
            - The request was successful and a new resource was created. Commonly used after a POST request.

    ❌ 4xx – Client Errors

        1. 400 Bad Request:
             - The server couldn’t understand the request due to malformed syntax, missing fields, or invalid parameters.

        2. 401 Unauthorized:
            - The request requires authentication. Either the auth token is missing or invalid.

        3. 403 Forbidden:
            - The user is authenticated, but does not have permission to perform the requested action.

        4. 404 Not Found:
            - The requested resource does not exist on the server (wrong endpoint or missing ID).

    💥 5xx – Server Errors

        1. 500 Internal Server Error:
            - A generic error indicating something went wrong on the server side — often due to unhandled exceptions or misconfigurations.

---

### 9. What are query parameters vs path parameters?

- **Path Parameters** are part of the URL and identify a specific resource.

  - Example: `/users/123` → `123` is a path parameter (User ID).

- **Query Parameters** are used to filter, sort, or paginate results, and appear after a `?` in the URL.

  - Example: `/users?age=25&sort=desc`

> ✅ Path = **resource identifier**
> ✅ Query = **modifiers or filters**

---

### 10. What is idempotency in APIs?

- **Idempotency** means that making the same request **multiple times** will have **the same effect** as making it once.

  - Example: A `PUT /users/123` with the same data updates the user identically every time.

- **GET, PUT, DELETE** are **idempotent**,
  while **POST** is **not**, because it creates a new resource each time.

> ✅ Idempotency is critical for **safe retries** in distributed systems.

---

### 11. How to handle idempotency in APIs

1. find out with request that cannot be idempotent for eg POST payment/orders, PUT Orders etc.
2. Generate an idempotent key attach as request header from client side
3. Api will receive it store it in redis cache
4. Next time api can tally then

---

### 12. What is a RESTful API?

- A **RESTful API** follows the principles of **REST** (Representational State Transfer), an architectural style for designing networked applications.
- Key characteristics:

  - Uses standard HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
  - Resource-based URIs: `/users`, `/products/123`
  - Stateless communication
  - Supports multiple formats (typically JSON)

---

### 13. Explain Statefulness for RESTF APIs

- REST APIs are stateless, meaning each request must contain all the necessary information for the server to process it. The server does not retain client session data between requests. such as JWT auth
- This makes REST APIs scalable, cacheable, and easier to distribute across multiple servers.
- In contrast, stateful APIs store session or context (e.g., via server-side sessions or cookies), and are often used in traditional web apps.
- While true REST requires statelessness, some APIs adopt stateful behavior for convenience — especially in internal apps or legacy systems.

---

### 14. **What is HATEOAS in REST APIs?**

HATEOAS stands for **Hypermedia As The Engine Of Application State**.
It's a REST constraint where the **server includes links in the response**, telling the client what actions can be performed next.

For example, when you request order details, the API response might include links like:

```json
"_links": {
  "cancel": { "href": "/orders/123/cancel", "method": "POST" },
  "track": { "href": "/orders/123/track", "method": "GET" }
}
```

This way, the client doesn’t need to hardcode URLs or guess what to do next — the server guides it.

It improves **discoverability** and makes the API more **self-descriptive**, but it's **rarely used in public APIs** due to added complexity and because most frontends already know the routes & Good documentation often replaces it.

---

### 15. What are the different types of APIs?

1. **Open APIs (Public APIs):**

   - Available to anyone.
   - Example: Google Maps API, OpenWeather API.
   - Used for public integrations.

2. **Internal APIs (Private APIs):**

   - Only used within an organization.
   - Helps different internal systems communicate securely.
   - Not exposed to external developers.

3. **Partner APIs:**

   - Shared with specific business partners.
   - Requires authentication or API keys.
   - Example: Payment gateway APIs shared with merchant partners.

4. **Composite APIs:**

   - Combines multiple APIs into one call.
   - Useful in microservices where data from multiple services is needed.
   - Improves performance by reducing multiple roundtrips.

---

### 16. **What are the different types of APIs (technically)?**

1. **REST (Representational State Transfer):**

   - Most common and widely used.
   - Uses standard HTTP methods (GET, POST, PUT, DELETE).
   - Stateless, scalable, and easy to use with JSON data.
   - Example: GitHub REST API.

2. **SOAP (Simple Object Access Protocol):**

   - XML-based protocol.
   - Strict structure with built-in error handling and security (WS-Security).
   - Used in legacy systems or enterprise apps like banking.

3. **GraphQL:**

   - Query language for APIs developed by Facebook.
   - Allows clients to request exactly what they need — nothing more, nothing less.
   - Efficient for frontend-heavy apps with dynamic data needs.
   - Example: GitHub GraphQL API.

4. **gRPC (Google Remote Procedure Call):**

   - High-performance, contract-based API using Protocol Buffers (protobuf).
   - Suitable for microservices and internal service-to-service communication.
   - Works over HTTP/2 and supports streaming.

5. **WebSockets (for real-time APIs):**

   - Maintains a persistent connection between client and server.
   - Ideal for real-time apps like chat, gaming, live dashboards.

---

### 17. What is Overfetching and Underfetching in APIs?

- **Overfetching** happens when an API returns **more data than needed**.
  _Example_: A REST endpoint returns the entire user object when you only need the user's name.

- **Underfetching** happens when an API returns **too little data**, forcing multiple API calls to get all required info.
  _Example_: You fetch a list of posts, but have to call another endpoint for each post’s author.

These are common limitations in REST APIs, and technologies like **GraphQL** aim to solve them by allowing clients to request exactly what they need.

---

### 18 What’s the difference between synchronous and asynchronous APIs?

- Synchronous APIs are blocking — the client sends a request and waits until the server responds before doing anything else. They’re simple and predictable, but can slow down if the operation is long.
- Asynchronous APIs are non-blocking — the client sends a request and can do other work while waiting for the server’s response. The reply may come via a callback, event, or future. They’re great for handling many concurrent or long-running operations but require more complex code.

---

### 19. How would you implement API versioning & API documentation

- Use URI versioning for public APIs (clarity).
- Use header or media type versioning for internal APIs where URLs shouldn’t change.
- For Documentation: OpenAPI / Swagger Machine-readable specification that can auto-generate interactive docs.
  - Example: Swagger UI for testing endpoints directly in the browser.

---

### 20. How do you handle long-running API requests?

- Making it Async using queues
- webhooks (push model): Client provides a callback URL → server processes in the background → sends result when ready.
- or use websockets
- Serialise larg response data and sent in chunks

---

### 21. What are the Authentication Models for APIs

1.  Basic Auth - HTTP Basic Authentication - Sends a username:password (Base64 encoded) in the Authorization header.
2.  Token Based Auth - Use OAuth 2.0 / JWT for user-facing APIs.
    - OAuth 2.0 - Client gets a token from an authorization server using flows like Authorization Code or Client Credentials, then sends it in requests.
    - JWT - Server issues a signed JWT after login; client sends it in each request.
3.  Session Based

- Use HMAC or mTLS for server-to-server APIs.
  - Both client and server present TLS certificates to authenticate each other.
  - Client signs requests with a shared secret; server verifies signature.

4. Always enforce HTTPS and rotate keys/tokens regularly.

---

### 22. What are the Authorisation Models for APIs

1.  Role Based Access Control (RBAC) - Role-Based Access Control (RBAC) in API design assigns system access based on user roles, ensuring data security and integrity by assigning privileges based on job function.
2.  Attribute Based Access Control (ABAC) - Attribute Based Access Control (ABAC) is a flexible authorization method in API design, enhancing security and efficiency by using attributes associated with users, actions, resources, or environments.

---

### 23. What is CORS? How does it affect API communication?

CORS is a browser-enforced policy that controls cross-domain API access. Without correct CORS setup, browser clients will be blocked from calling your API.

---

### 24. Error Handling in REST

```json
{
  "status": "error", // This can be ‘error’ or ‘success’
  "statusCode": 404,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found.",
    "details": "The user with the ID '12345' does not exist in our records.",
    "timestamp": "2023-12-08T12:30:45Z",
    "path": "/api/v1/users/12345",
    "suggestion": "Please check if the user ID is correct or refer to our documentation at https://api.example.com/docs/errors#RESOURCE_NOT_FOUND for more information."
  },
  "requestId": "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8",
  "documentation_url": "https://api.example.com/docs/errors"
}
```

---

### 25. What are API keys & how are they managed ?

- API keys are unique identifiers used to authenticate and control access to APIs, typically sent with each request. 
- They help monitor usage, enforce rate limits, and can be revoked or rotated if compromised. 
- Best practices for managing API keys include generating strong keys, using HTTPS, limiting permissions, implementing quotas, securely distributing and storing keys, and monitoring for suspicious activity. 
- Proper API key management is essential to protect your API and ensure secure, controlled access.

---
### 26. Design a highly Concurrent API
   1. Non block code with [async](http://async.io) functions 
   2. redis caching for caching frequently queried data
   3. Queue system for offloading backgroud task such as emails/notifications
   4. rate limitters
   5. database sharding & **Connection pooling** for DBs
   6. **Circuit breakers and retries** for resilience
   7. **Horizontal scaling** via containerization 
   8. **Load balancing** with Nginx or API Gateways.