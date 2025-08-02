1. What is an API?
    1. An API, or Application Programming Interface, is a defined set of rules and protocols that allow different software components to communicate with each other. It acts as an interface between different systems—often between a frontend application and a backend service—without exposing the internal logic or implementation details.For example, in a web application, the frontend sends HTTP requests to backend APIs to retrieve or update data. The most widely used type is REST API, which leverages standard HTTP methods like GET, POST, PUT, and DELETE.
 ---       
2. Difference btw SDK & API
    1. An API defines how software components communicate—it’s the *interface*. An SDK, or Software Development Kit, is a collection of tools, libraries, and documentation that helps developers integrate or build on top of a platform more efficiently.
    For example, when building authentication features, I could use Clerk's SDK like `clerk.js`, which abstracts away much of the boilerplate needed for login/signup flows. Under the hood, the SDK typically uses APIs but also includes helper functions, UI components, and docs to speed up development
---     
3. What is the difference between REST and SOAP?
    
    **REST** (Representational State Transfer) and **SOAP** (Simple Object Access Protocol) are two approaches for building APIs, but they differ in design principles, flexibility, and complexity:
    
    - **SOAP** is a **protocol** that uses XML for all messages and follows strict standards.
    - **REST** is an **architectural style** that uses standard HTTP methods (GET, POST, etc.) and supports multiple data formats (JSON, XML, etc.).
---
4. What are HTTP methods and what are they used for?
    - GET vs POST vs PUT vs DELETE
        - **GET** → Retrieve data
        - **POST** → Create data
        - **PUT** → Update data
        - **DELETE** → Remove data
 ---       
5. What is the difference between PUT and PATCH?
    1. (There's also **PATCH**, which partially updates a resource and differs from PUT, which typically replaces the entire resource.)
---
6.