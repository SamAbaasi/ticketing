# 📘 TypeScript Best Practices for React Apps

A comprehensive guide to writing clean, scalable, and type-safe code in your React + TypeScript projects.  
This guide is based on real-world experience and trusted sources including:

* [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
* [TypeScript Handbook: Declaration Files Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

## 🔧 Compiler Configuration: `tsconfig.json`

Enable strict options for maximum type safety and safe code:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "skipLibCheck": false
  }
}
````

---

## 🧱 Project Structure

* Use a clear folder structure:
  `components/`, `hooks/`, `types/`, `utils/`, `services/`
* Co-locate type files with components, e.g. `Component.types.ts` or group shared types in a central `/types` folder
* Use `.tsx` for files that include JSX

---

## 1. 🎯 Use Types and Interfaces Wisely

* Use `interface` for describing object shapes, especially when you want extendability:

```ts
interface User {
  id: number
  name: string
  email: string
}
```

* Use `type` for unions, intersections, and advanced compositions:

```ts
type Status = "active" | "inactive" | "pending"
type APIResponse<T> = { data: T; error?: string }
```

> **Tip:** Prefer `type` by default and use `interface` when extending or for OOP-style patterns.

---

## 2. 🧱 Prefer `unknown` over `any`

```ts
function processInput(input: unknown) {
  if (typeof input === "string") {
    console.log(input.toUpperCase())
  }
}
```

`unknown` forces you to check types before use, while `any` disables all type checking.

---

## 3. 🔒 Readonly and Immutable Types

Prevent unwanted mutation by using `readonly`:

```ts
interface Product {
  readonly id: number
  readonly name: string
  price: number
}
```

Use especially in reducers or state objects.

---

## 4. 🔁 Utility Types

Leverage built-in utility types to simplify and DRY your code:

```ts
type OptionalUser = Partial<User>
type IDOnly = Pick<User, "id">
type WithoutEmail = Omit<User, "email">
```

---

## 5. 🧾 Always Define Return Types Explicitly

Explicit return types improve clarity and catch mistakes early:

```ts
function getUser(id: number): User | null {
  return users.find(u => u.id === id) || null
}
```

---

## 6. ⚠️ Null and Undefined Safety

Use optional chaining (`?.`) and nullish coalescing (`??`) to avoid runtime errors:

```ts
const userName = user?.profile?.name ?? "Guest"
```

---

## 7. 🧩 Enums for Semantic Values

Use enums or string unions for well-defined sets of values:

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

function assignRole(role: Role) {
  // ...
}
```

---

## 8. 🔍 `never` for Exhaustive Checks

Use `never` in switch defaults to enforce exhaustiveness:

```ts
type Shape = Circle | Square | Triangle

function getArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.side * shape.side
    default:
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
  }
}
```

---

## 9. 🏷️ Type-only Imports and Exports

Use `import type` and `export type` to avoid bundling types in JS output:

```ts
import type { User } from "../types"
export type { Product } from "./product.types"
```

This helps with tree-shaking and smaller builds.

---

## 10. 🧰 Developer Tools

* **VSCode** — best editor support for TypeScript
* **ESLint** with `@typescript-eslint` plugin
* Run `tsc --noEmit` in CI to catch type errors early
* Use TypeScript Playground: [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play)

---

## 🔤 Typing React Components

* Prefer explicit prop types over `React.FC` unless you need implicit `children` typing:

```tsx
// With children
import { FC, ReactNode } from 'react'

type CardProps = {
  children: ReactNode
}

const Card: FC<CardProps> = ({ children }) => <div>{children}</div>

// Without children
type ButtonProps = {
  label: string
  onClick: () => void
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
```

---

## 🧠 Type Inference vs Explicit Typing

* Let TypeScript infer types inside functions and variables when obvious
* Always explicitly type inputs and outputs of public APIs

```ts
// Inference
const count = 0 // inferred as number

// Explicit
function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}
```

---

## 🧪 Generics for Reusable Code

Use generics to write reusable components and hooks:

```ts
function identity<T>(value: T): T {
  return value
}

function getKey<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
```

---

## 🪝 Typing Hooks

Explicitly type state and returns in hooks:

```ts
function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null)
  return user
}

function useData<T>(): { data: T | null; error: Error | null } {
  // ...
}
```

---

## 🧼 Clean Code Practices

* Avoid `any`; prefer `unknown` with proper type narrowing
* Use descriptive and consistent naming (`UserProps`, `FetchConfig`)
* Split large complex types into smaller, readable ones
* Keep union types concise and clear

---

## 🛡️ Declaration Files Do's and Don'ts

(from official docs)

* Always export declarations
* Use `declare module '...'` for global packages
* Avoid `declare global` unless necessary
* Avoid `export =` unless dealing with legacy code

---

## 🧾 Other Useful TS Features

* Use `// @ts-ignore` **only as a last resort** with a comment explaining why

```ts
// @ts-ignore: third-party types are incorrect
someLegacyFunction()
```

* Use `typeof`, `keyof`, `ReturnType` for type extraction:

```ts
const person = { name: 'Ali', age: 25 }
type Person = typeof person

function getUser() {
  return { id: 1, name: 'John' }
}
type User = ReturnType<typeof getUser>
```

* Built-in utility types: `Partial<T>`, `Required<T>`, `Pick<T,K>`, `Omit<T,K>`, `Record<K,T>`

---

## ✍️ Naming Conventions (Google Style Guide)

* Use `PascalCase` for types, interfaces, enums
* Use `camelCase` for variables, functions, props
* Use `UPPER_CASE` for constants
* Avoid prefixing interfaces with `I` (e.g. avoid `IUser`)

---

## 🔁 Linting & CI

* Use `@typescript-eslint/eslint-plugin` for linting
* Run `tsc --noEmit` in CI pipelines to catch errors early

---

## ✅ Final Checklist

| Feature                           | Followed |
| --------------------------------- | -------- |
| Strict mode enabled               | \[ ]     |
| No `any` usage                    | \[ ]     |
| Use utility types                 | \[ ]     |
| Function return types defined     | \[ ]     |
| Immutability with `readonly`      | \[ ]     |
| Union types exhaustively handled  | \[ ]     |
| Type-only imports used            | \[ ]     |
| Clear naming and structure        | \[ ]     |
| Typed props and state             | \[ ]     |
| Avoid type assertions (`as`)      | \[ ]     |
| Reusable types in `types/` folder | \[ ]     |
| ESLint + type-checking in CI      | \[ ]     |
| Used generics for reusability     | \[ ]     |
| Descriptive naming conventions    | \[ ]     |

---

> *TypeScript isn't just a tool — it's your project’s first line of defense. Write safe, scalable TypeScript, not just working code.*

