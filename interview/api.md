1. What is an API?

   An API, or Application Programming Interface, is a defined set of rules and protocols that allow different software components to communicate with each other. It acts as an interface between different systems—often between a frontend application and a backend service—without exposing the internal logic or implementation details.For example, in a web application, the frontend sends HTTP requests to backend APIs to retrieve or update data. The most widely used type is REST API, which leverages standard HTTP methods like GET, POST, PUT, and DELETE.

---

2. Difference btw SDK & API

   An API defines how software components communicate—it’s the _interface_. An SDK, or Software Development Kit, is a collection of tools, libraries, and documentation that helps developers integrate or build on top of a platform more efficiently.
   For example, when building authentication features, I could use Clerk's SDK like `clerk.js`, which abstracts away much of the boilerplate needed for login/signup flows. Under the hood, the SDK typically uses APIs but also includes helper functions, UI components, and docs to speed up development

---

3. What is the difference between REST and SOAP?

   **REST** (Representational State Transfer) and **SOAP** (Simple Object Access Protocol) are two approaches for building APIs, but they differ in design principles, flexibility, and complexity:

   - **SOAP** is a **protocol** that uses XML for all messages and follows strict standards.
   - **REST** is an **architectural style** that uses standard HTTP methods (GET, POST, etc.) and supports multiple data formats (JSON, XML, etc.).

---

4. What are HTTP methods and what are they used for?

   GET vs POST vs PUT vs DELETE

   - **GET** → Retrieve data
   - **POST** → Create data
   - **PUT** → Update data
   - **DELETE** → Remove data

---

5. What is the difference between PUT and PATCH?

   There's also **PATCH**, which partially updates a resource and differs from PUT, which typically replaces the entire resource.

---

6. What is an Endpoint ?

   An endpoint is a specific URL path that represents a resource or action in an API. It defines where an API can be accessed by a client.
   In REST APIs, endpoints are usually structured around resources (like users, posts, or orders), and paired with HTTP methods to perform actions.

---

7. What is a request and response in HTTP?

   A request is when client asks for resource from server/ wants to put/post a resource where as server providing resource or making the applied chages is a response. An this request-response cycle takes place in HTTP protocol.

---

8.  What is the difference between 200, 201, 400, 401, 403, 404, and 500 status codes?

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
