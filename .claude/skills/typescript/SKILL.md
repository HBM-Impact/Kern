---
name: typescript
description: TypeScript patterns for safety, readability, and maintainability
---

# TypeScript

## Prefer `unknown` over `any`

`unknown` forces validation before use. `any` silently bypasses the type system.

```ts
function parse(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
}
```

## Let inference work

Don't annotate what TypeScript can infer. Over-annotation widens types and creates maintenance overhead.

```ts
// good
const name = 'Ada';

// bad
const name: string = 'Ada';
```

## Prefer `satisfies` over `as`

`satisfies` validates the shape without losing narrowed inference. `as` silences the compiler.

```ts
// good
const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, string>;

// bad — loses literal types, no validation
const routes = {
  home: '/',
  about: '/about',
} as Record<string, string>;
```

## Derive types from values

Keep runtime values and types in sync — don't duplicate.

```ts
const roles = ['admin', 'user', 'guest'] as const;
type Role = (typeof roles)[number];
```

## Model impossible states with discriminated unions

Prefer discriminated unions over optional-property blobs. Impossible states become unrepresentable.

```ts
type State =
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };
```

## Exhaustive checks with `never`

Pair discriminated unions with exhaustiveness checks. Future refactors become compiler errors instead of runtime bugs.

```ts
switch (state.status) {
  case "loading": ...
  case "success": ...
  case "error": ...
  default: {
    const exhaustive: never = state;
    return exhaustive;
  }
}
```

## `as const` for constants and config

Without `as const`, object/array values widen to their base types. With it, values become literal types.

```ts
const theme = {
  mode: 'dark',
} as const;
// mode: "dark" not string
```

## Type predicates for reusable narrowing

Connect runtime checks to compile-time narrowing — especially useful at API/external-input boundaries.

```ts
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

## Build types from existing types

Prefer utility types over duplication.

- `Pick<T, K>` / `Omit<T, K>` — shape subsets
- `Partial<T>` / `Required<T>` — optionality
- Indexed access: `User["id"]`, `State["data"]`

```ts
type UserPreview = Pick<User, 'id' | 'name'>;
```

## Validate external data at runtime

TypeScript does not validate API responses. Type safety ends at runtime boundaries.

Use Zod (already in the project) to validate before trusting external data.

```ts
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// bad — type assertion, no actual validation
const user = (await response.json()) as User;

// good
const user = UserSchema.parse(await response.json());
```

## Avoid `enum`

Prefer `as const` unions — simpler to serialize, easier to refactor, no runtime surprises.

```ts
// good
const roles = ['admin', 'user'] as const;
type Role = (typeof roles)[number];

// avoid
enum Role {
  Admin,
  User,
}
```

## Prefer auto-inferring generics

Design generic APIs so callers don't need to pass type arguments manually.

```ts
// good — schema drives inference
getData(userSchema);

// worse — requires manual annotation
getData<User>();
```

## Template literal types

Use for routes, event names, CSS utilities, query keys, and design system tokens.

```ts
type Route = `/api/${string}`;
type EventName = `on${Capitalize<string>}`;
```

## Strict compiler options

Strict mode is where TypeScript pays off. Confirm these are on in `tsconfig.json`:

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
}
```
