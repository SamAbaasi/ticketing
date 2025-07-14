# 📘 TypeScript Best Practices for React Apps

Using TypeScript in a React project improves type safety, code readability, and long-term maintainability. This guide outlines best practices to follow.

---

## 🧱 Project Structure

- [ ] Use clear file/folder organization (`components`, `hooks`, `types`, `utils`, etc.)
- [ ] Co-locate `*.types.ts` or `types.ts` files near components or group them in a shared `/types` folder
- [ ] Always use `.tsx` for files containing JSX

---

## 🔤 Typing Components

### ✅ Use `FC` (FunctionComponent) only if needed (e.g. for `children`)

```tsx
// ✅ With children
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Card: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}
```

```tsx
// ✅ Without children
type ButtonProps = {
  onClick: () => void
  label: string
}

function Button({ onClick, label }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
```

---

## 🧑‍🏫 Type Inference & Explicitness

* ✅ Prefer `type` over `interface` for consistency unless extending large models
* ✅ Let TS infer when possible, but annotate public APIs

```ts
// Let inference work
const count = useState(0) // inferred as number

// Annotate outward-facing functions
function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}
```

---

## 🧪 Props and State

* [ ] Always type props explicitly
* [ ] Use generics for reusable components
* [ ] Type state using `useState<Type>()` when it’s not obvious

```tsx
const [user, setUser] = useState<User | null>(null)
```

---

## 📚 Reusable Types and Enums

* ✅ Create central `types/` folder for shared types
* ✅ Use enums or union types for predictable values

```ts
// Enums or string literal unions
type Status = 'loading' | 'success' | 'error'
```

---

## 🪝 Typing Hooks

```ts
function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null)
  // logic...
  return user
}
```

For custom hooks with complex returns:

```ts
type UseDataResult = {
  data: Data | null
  isLoading: boolean
  error: Error | null
}

function useData(): UseDataResult {
  // implementation
}
```

---

## 🧼 Clean Code Tips

* [ ] Avoid `any` — use `unknown` if needed
* [ ] Avoid using `as` unless absolutely necessary
* [ ] Keep types readable — prefer named types over long inline objects
* [ ] Split large types into smaller ones

---

## 🛡️ Safety + Strictness

In your `tsconfig.json`, enable strict rules:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## 🧰 Recommended Tools

* 🧪 **ESLint** with `@typescript-eslint`
* ✅ **Type-check** in CI: `tsc --noEmit`
* 💡 **VS Code** for excellent TS support
* ⌨️ **Typesafe forms** with libraries like `react-hook-form`, `zod`, `yup`

---

## 🧾 Naming Conventions

* ✅ Use `Props`, `Params`, `Config` suffixes for clarity
* ✅ Capitalize all type and interface names (`User`, `UserProps`)
* ❌ Avoid single-letter types like `T`, `V`, etc. unless in generics

---

## ✅ Summary Checklist

| Practice                          | Done |
| --------------------------------- | ---- |
| Typed props and state             | [ ]  |
| Avoid `any`                       | [ ]  |
| Type-safe APIs and hooks          | [ ]  |
| Reusable types in `types/` folder | [ ]  |
| Strict mode enabled               | [ ]  |
| Lint rules configured             | [ ]  |

---

> *TypeScript isn't about writing more code — it's about writing safer code.*
