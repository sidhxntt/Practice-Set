## **1. Code Quality & Maintainability Principles**

| Principle                                        | Meaning                                                                    | Why it matters                         |
| ------------------------------------------------ | -------------------------------------------------------------------------- | -------------------------------------- |
| **DRY** (Don’t Repeat Yourself)                  | Avoid duplicating logic; reuse code.                                       | Easier maintenance, fewer bugs.        |
| **KISS** (Keep It Simple, Stupid)                | Prefer simple solutions over complex ones.                                 | Less cognitive load, easier debugging. |
| **YAGNI** (You Aren’t Gonna Need It)             | Don’t add features until they’re actually needed.                          | Prevents overengineering.              |
| **SOC** (Separation of Concerns)                 | Divide a program into distinct sections, each handling one responsibility. | Easier to update and test.             |
| **SLAP** (Single Level of Abstraction Principle) | Keep all code in a function at the same level of detail.                   | Improves readability.                  |
| **Boy Scout Rule**                               | Leave the code cleaner than you found it.                                  | Continuous improvement.                |

---

## **2. Object-Oriented & Design Principles**

| Principle                        | Meaning                                                            | Why it matters                    |
| -------------------------------- | ------------------------------------------------------------------ | --------------------------------- |
| **SOLID**                        | 5 guidelines for better OO design.                                 | Maintainable, extendable systems. |
| **Composition Over Inheritance** | Prefer combining small objects over deep class hierarchies.        | More flexibility, fewer bugs.     |
| **Law of Demeter** (LoD)         | Talk only to your immediate “friends” (limit object dependencies). | Reduces coupling.                 |
| **LSP** (from SOLID)             | Subtypes must be replaceable for their base types.                 | Prevents broken polymorphism.     |
| **ISP** (from SOLID)             | Don’t force classes to implement methods they don’t use.           | Reduces unnecessary complexity.   |

---

## **3. Architecture & System Design Principles**

| Principle                                           | Meaning                                                      | Why it matters                      |
| --------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| **High Cohesion, Low Coupling**                     | Modules should be self-contained but loosely connected.      | Makes changes safer and easier.     |
| **CQRS** (Command Query Responsibility Segregation) | Separate read and write models in data handling.             | Improves scalability and clarity.   |
| **Event Sourcing**                                  | Store changes as a sequence of events, not just final state. | Auditability, flexibility.          |
| **12-Factor App**                                   | Best practices for SaaS & cloud-native apps.                 | Consistency, scalability.           |
| **Fail Fast**                                       | Detect errors as early as possible.                          | Avoids cascading failures.          |
| **Design for Failure**                              | Assume components will fail and handle it gracefully.        | Reliability in distributed systems. |

---

## **4. Testing & Deployment Principles**

| Principle                                   | Meaning                                                   | Why it matters                        |
| ------------------------------------------- | --------------------------------------------------------- | ------------------------------------- |
| **Test Pyramid**                            | Unit > Integration > UI tests, in that order of quantity. | Faster, more reliable testing.        |
| **Shift Left**                              | Test earlier in the development process.                  | Catch bugs before they get expensive. |
| **Continuous Integration/Delivery (CI/CD)** | Automate testing & deployment.                            | Faster, safer releases.               |
| **Blue-Green Deployment**                   | Switch between two production environments.               | Zero downtime.                        |

---

## **5. Software Process & Team Principles**

| Principle                      | Meaning                                                 | Why it matters                     |
| ------------------------------ | ------------------------------------------------------- | ---------------------------------- |
| **Agile Manifesto Principles** | Individuals & interactions over processes & tools, etc. | Adaptability.                      |
| **Lean Software Development**  | Eliminate waste, build quality in, deliver fast.        | Efficiency.                        |
| **Pair Programming**           | Two devs, one computer.                                 | Knowledge sharing, fewer mistakes. |
| **Code Review Best Practices** | Small, frequent reviews.                                | Better quality, faster feedback.   |

---