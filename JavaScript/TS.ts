// 1. Primitive Types
const Name: string = "John";
const age: number = 30;
const isActive: boolean = true;
const bigNumber: bigint = 100n;
const uniqueId: symbol = Symbol("id");

// 2. Object Types & Interfaces
interface User {
  readonly id: number;
  name: string;
  email?: string; // Optional property
  readonly createdAt: Date; // Readonly property
}

// Extending interfaces
interface Employee extends User {
  department: string;
  salary: number;
}

// 3. Literal Types
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

// 4. Type Indexing
type PersonInfo = {
  name: string;
  age: number;
  address: string;
};

type AgeType = PersonInfo["age"]; // number
type PersonKeys = keyof PersonInfo; // "name" | "age" | "address"

// 5. Generics
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

// Using the generic stack
const numberStack = new Stack<number>();
const stringStack = new Stack<string>();

// 6. Mapped Types
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type ReadonlyPerson = {
  readonly [K in keyof PersonInfo]: PersonInfo[K];
};

// 7. Conditional Types
type IsString<T> = T extends string ? true : false;
type CheckString = IsString<"hello">; // true
type CheckNumber = IsString<42>; // false

// 8. Utility Types
type PartialUser = Partial<User>;
type UserNameAndId = Pick<User, "name" | "id">;
type UserWithoutEmail = Omit<User, "email">;

// 9. Control Flow Analysis & Type Guards
function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// Discriminated Unions
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "rectangle"; width: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      const _exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${_exhaustiveCheck}`);
  }
}

// 10. Class with Access Modifiers
class Animal {
  protected name: string;
  private age: number;
  readonly species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public getInfo(): string {
    return `${this.name} is a ${this.species} aged ${this.age}`;
  }
}

// 11. Async Types with Promises
async function fetchUserData(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 12. Type Assertions
const input = document.getElementById("myInput") as HTMLInputElement;
const value = <string>input.value; // Alternative syntax

// 13. Index Signatures
interface Dictionary<T> {
  [key: string]: T;
}

const numberDict: Dictionary<number> = {
  "one": 1,
  "two": 2
};

// 14. Function Overloads
function createElement(tag: "a"): HTMLAnchorElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}