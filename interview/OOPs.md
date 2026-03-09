## **Core Principles of OOP**

OOP (**Object-Oriented Programming**) is based on four main pillars — think of them like the “DNA” of most modern programming.

### 1️⃣ **Encapsulation**

- **Definition:** Bundle data (attributes) and methods (functions) that operate on that data into a single unit (class) and hide the internal details from outside.
- **Why:** Protects internal state and enforces controlled access.
- **Python Example:**

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # private attribute

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance
```

---

### 2️⃣ **Abstraction**

- **Definition:** Show only _essential_ features, hide complex implementation details.
- **Why:** Reduces complexity for the user of the class.
- **Python Example:**

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2
```

---

### 3️⃣ **Inheritance**

- **Definition:** Create new classes that reuse, extend, or modify existing classes.
- **Why:** Promotes code reusability.
- **Python Example:**

```python
class Animal:
    def speak(self):
        print("Some sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")
```

---

### 4️⃣ **Polymorphism**

- **Definition:** Same interface, different behavior.
- **Why:** Makes code flexible and interchangeable.
- **Python Example:**

```python
def make_animal_speak(animal):
    animal.speak()

make_animal_speak(Dog())  # Woof!
make_animal_speak(Animal())  # Some sound
```

---

## **DRY Principle**

**DRY** = **Don't Repeat Yourself**

- **Definition:** Every piece of knowledge/code should exist in _one place_ in your system.
- **Why:** Avoids duplication → easier maintenance, fewer bugs.
- **Bad ❌:**

```python
def calc_area_circle(radius):
    return 3.14 * radius * radius

def calc_area_cylinder(radius, height):
    return (2 * 3.14 * radius * height) + (2 * 3.14 * radius * radius)
```

Here, the formula for the circle’s area is repeated.

- **Good ✅:**

```python
def area_circle(radius):
    return 3.14 * radius * radius

def area_cylinder(radius, height):
    return (2 * 3.14 * radius * height) + (2 * area_circle(radius))
```

Now, if you change the circle’s formula, it updates everywhere.

---
The **SOLID principles** are five design guidelines that help you write cleaner, more maintainable, and less bug-prone code — in Python or any other object-oriented language.
They’re like “diet and exercise” for your code: follow them, and your codebase stays healthy. Ignore them, and you eventually get spaghetti 🍝.

Here’s the breakdown, with Python examples:

---

## **S — Single Responsibility Principle (SRP)**

**Definition:** A class should have **only one reason to change** — it should do one job only.

Bad ❌:

```python
class User:
    def __init__(self, name):
        self.name = name

    def save_to_db(self):
        print("Saving user to DB...")

    def send_email(self, message):
        print(f"Sending email to {self.name}: {message}")
```

Here, `User` handles **data storage** and **email sending** — two different responsibilities.

Good ✅:

```python
class User:
    def __init__(self, name):
        self.name = name

class UserRepository:
    def save(self, user: User):
        print("Saving user to DB...")

class EmailService:
    def send_email(self, user: User, message: str):
        print(f"Sending email to {user.name}: {message}")
```

Now, each class has **one reason to change**.

---

## **O — Open/Closed Principle (OCP)**

**Definition:** Software should be **open for extension** but **closed for modification**.
You should add new features without changing existing code.

Bad ❌:

```python
class Discount:
    def get_discount(self, customer_type):
        if customer_type == "Regular":
            return 5
        elif customer_type == "VIP":
            return 20
```

If you add a new customer type, you **must** edit the method — risk of breaking old code.

Good ✅ (use inheritance or strategy pattern):

```python
from abc import ABC, abstractmethod

class Discount(ABC):
    @abstractmethod
    def get_discount(self):
        pass

class RegularDiscount(Discount):
    def get_discount(self):
        return 5

class VIPDiscount(Discount):
    def get_discount(self):
        return 20
```

You can now **add new discount types** without touching old code.

---

## **L — Liskov Substitution Principle (LSP)**

**Definition:** Subclasses should be **replaceable** with their base classes **without breaking** the program.

Bad ❌:

```python
class Bird:
    def fly(self):
        print("Flying...")

class Ostrich(Bird):
    def fly(self):
        raise Exception("I can't fly!")
```

An `Ostrich` **is-a** `Bird` but breaks `fly()` expectations.

Good ✅:

```python
class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        print("Flying...")

class Ostrich(Bird):
    def run(self):
        print("Running...")
```

Here, we separated flying birds from non-flying birds.

---

## **I — Interface Segregation Principle (ISP)**

**Definition:** Don’t force classes to implement **methods they don’t use**.
In Python, we don’t have interfaces per se, but abstract base classes (ABCs) help.

Bad ❌:

```python
class Machine:
    def print(self): pass
    def scan(self): pass
    def fax(self): pass

class Printer(Machine):
    def print(self): print("Printing...")
    def scan(self): raise NotImplementedError()
    def fax(self): raise NotImplementedError()
```

`Printer` is forced to implement things it doesn’t need.

Good ✅:

```python
class PrinterInterface:
    def print(self): pass

class ScannerInterface:
    def scan(self): pass

class Printer(PrinterInterface):
    def print(self):
        print("Printing...")
```

Each class only implements what it needs.

---

## **D — Dependency Inversion Principle (DIP)**

**Definition:** High-level modules shouldn’t depend on low-level modules; both should depend on **abstractions**.

Bad ❌:

```python
class MySQLDatabase:
    def connect(self):
        print("Connecting to MySQL...")

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # tightly coupled
```

Good ✅:

```python
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self): pass

class MySQLDatabase(Database):
    def connect(self):
        print("Connecting to MySQL...")

class UserService:
    def __init__(self, db: Database):
        self.db = db  # depends on abstraction

db = MySQLDatabase()
service = UserService(db)
service.db.connect()
```

Now, you can swap `MySQLDatabase` for `PostgreSQLDatabase` without touching `UserService`.

---
Alright — here’s a **single Python example** that applies **all five SOLID principles** in one coherent mini-project.
We’ll build a tiny “Order Processing” system that sends receipts and saves orders to a database.

---

## **Full Example — SOLID in Action**

```python
from abc import ABC, abstractmethod

# =========================================
# S — Single Responsibility Principle
# =========================================
class Order:
    """Holds order details."""
    def __init__(self, items, total):
        self.items = items
        self.total = total


class OrderRepository:
    """Handles saving orders to the database."""
    def save(self, order: Order):
        print(f"Saving order with total ${order.total} to DB")


class EmailService:
    """Handles sending emails."""
    def send_email(self, to: str, subject: str, body: str):
        print(f"Email to {to} - {subject}: {body}")


# =========================================
# O — Open/Closed Principle
# =========================================
class Discount(ABC):
    """Abstract base class for discounts."""
    @abstractmethod
    def apply(self, total: float) -> float:
        pass


class NoDiscount(Discount):
    def apply(self, total: float) -> float:
        return total


class PercentageDiscount(Discount):
    def __init__(self, percent: float):
        self.percent = percent

    def apply(self, total: float) -> float:
        return total * (1 - self.percent / 100)


# =========================================
# L — Liskov Substitution Principle
# =========================================
class PaymentProcessor(ABC):
    """Abstract payment processor."""
    @abstractmethod
    def pay(self, amount: float):
        pass


class CreditCardProcessor(PaymentProcessor):
    def pay(self, amount: float):
        print(f"Paid ${amount} with credit card")


class PayPalProcessor(PaymentProcessor):
    def pay(self, amount: float):
        print(f"Paid ${amount} via PayPal")


# =========================================
# I — Interface Segregation Principle
# =========================================
class ReceiptPrinterInterface(ABC):
    @abstractmethod
    def print_receipt(self, order: Order):
        pass


class EmailReceiptInterface(ABC):
    @abstractmethod
    def send_receipt(self, order: Order, email: str):
        pass


class ReceiptPrinter(ReceiptPrinterInterface):
    def print_receipt(self, order: Order):
        print(f"Printing receipt for order total: ${order.total}")


class EmailReceiptSender(EmailReceiptInterface):
    def __init__(self, email_service: EmailService):
        self.email_service = email_service

    def send_receipt(self, order: Order, email: str):
        self.email_service.send_email(
            email,
            "Your Order Receipt",
            f"Thank you for your order. Total: ${order.total}"
        )


# =========================================
# D — Dependency Inversion Principle
# =========================================
class OrderService:
    """High-level order processing logic."""
    def __init__(self, 
                 repository: OrderRepository,
                 payment_processor: PaymentProcessor,
                 discount: Discount,
                 receipt_sender: EmailReceiptInterface):
        self.repository = repository
        self.payment_processor = payment_processor
        self.discount = discount
        self.receipt_sender = receipt_sender

    def process_order(self, order: Order, email: str):
        discounted_total = self.discount.apply(order.total)
        self.payment_processor.pay(discounted_total)
        self.repository.save(order)
        self.receipt_sender.send_receipt(order, email)


# =========================================
# USAGE
# =========================================
if __name__ == "__main__":
    # Setup dependencies
    repo = OrderRepository()
    email_service = EmailService()
    discount_strategy = PercentageDiscount(10)  # 10% off
    payment_method = CreditCardProcessor()
    receipt_sender = EmailReceiptSender(email_service)

    # Inject dependencies into high-level service
    service = OrderService(repo, payment_method, discount_strategy, receipt_sender)

    # Create and process an order
    order = Order(items=["Laptop", "Mouse"], total=1500)
    service.process_order(order, "customer@example.com")
```

---

## **Where SOLID Fits Here**

1. **SRP** — Each class does *one thing*:

   * `Order` → data
   * `OrderRepository` → database
   * `EmailService` → email sending
   * No class tries to do everything at once.

2. **OCP** — You can add new `Discount` types (e.g., `BuyOneGetOneDiscount`) without changing old code.

3. **LSP** — `CreditCardProcessor` and `PayPalProcessor` can be swapped without breaking anything.

4. **ISP** — Separate `ReceiptPrinterInterface` and `EmailReceiptInterface` so classes don’t implement unused methods.

5. **DIP** — `OrderService` depends on abstractions (`PaymentProcessor`, `Discount`, `EmailReceiptInterface`)
   — not on concrete MySQL, SMTP, or PayPal implementations.

---
