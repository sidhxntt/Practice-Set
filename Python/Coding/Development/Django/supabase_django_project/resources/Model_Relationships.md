
## 🔗 Django Model Relationships (All 4 Types)

---

### 1. **One-to-One** (`OneToOneField`)

- A row in Table A **has exactly one** row in Table B and vice versa.
- Common for extending User models (like Profile, Address).

#### Django

```python
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
```

#### Access

```python
profile.user  # Forward
user.profile  # Reverse (if default, it's user.profile)
```

#### Prisma Equivalent

```prisma
model Profile {
  id     Int    @id @default(autoincrement())
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique
}

model User {
  id      Int     @id @default(autoincrement())
  profile Profile?
}
```

---

### 2. **One-to-Many** (`ForeignKey`)

- A row in Table A can be **referenced by many** rows in Table B.
- Most common relationship (e.g., User → Posts).

#### Django

```python
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
```

#### Access

```python
post.user         # Forward
user.posts.all()  # Reverse
```

#### Prisma Equivalent

```prisma
model Post {
  id     Int    @id @default(autoincrement())
  user   User   @relation(fields: [userId], references: [id])
  userId Int
}

model User {
  id    Int     @id @default(autoincrement())
  posts Post[]
}
```

---

### 3. **Many-to-Many** (`ManyToManyField`)

- Table A and Table B can reference **each other multiple times**.
- Django creates a join table automatically (unless custom through model is specified).

#### Django

```python
class Student(models.Model):
    courses = models.ManyToManyField('Course', related_name='students')

class Course(models.Model):
    name = models.CharField(max_length=100)
```

#### Access

```python
student.courses.all()  # Courses the student takes
course.students.all()  # Students in a course
```

#### Prisma Equivalent

```prisma
model Student {
  id      Int      @id @default(autoincrement())
  courses Course[] @relation("Enrollments")
}

model Course {
  id       Int       @id @default(autoincrement())
  students Student[] @relation("Enrollments")
}
```

⚠️ Prisma needs explicit join tables if you want to store extra metadata (like enrollment date).

---

### 4. **Self-Referential Relationships**

- A model can relate to itself (e.g., `friends`, `parent`, `manager`).

#### Django

```python
class Employee(models.Model):
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
```

#### Prisma

```prisma
model Employee {
  id        Int       @id @default(autoincrement())
  managerId Int?
  manager   Employee? @relation("Manager", fields: [managerId], references: [id])
  subordinates Employee[] @relation("Manager")
}
```

---

## ✅ Summary Table

| Relationship Type   | Django Field         | Example                            | Reverse Access                    |
|---------------------|----------------------|------------------------------------|-----------------------------------|
| One-to-One          | `OneToOneField`      | `User ↔ Profile`                   | `user.profile`, `profile.user`    |
| One-to-Many         | `ForeignKey`         | `User → Posts`                     | `post.user`, `user.posts.all()`   |
| Many-to-Many        | `ManyToManyField`    | `Student ↔ Course`                 | `student.courses.all()`           |
| Self-Referential    | `ForeignKey('self')` | `Employee → Manager`              | `emp.manager`, `manager.employee_set.all()` |

---

Want a small working Django code snippet with all 4 in one place?
