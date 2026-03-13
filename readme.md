# array-utils-ts

<div align="center">

[<img src="https://badges.ws/npm/v/array-utils-ts" alt="version" />](https://npmjs.org/package/array-utils-ts)
[<img src="https://packagephobia.com/badge?p=array-utils-ts" alt="size" />](https://packagephobia.com/result?p=array-utils-ts)
[<img src="https://badges.ws/npm/dm/array-utils-ts" alt="downloads" />](https://npmjs.org/package/array-utils-ts)
[<img src="https://badges.ws/github/license/vladkens/array-utils-ts" alt="license" />](https://github.com/vladkens/array-utils-ts/blob/main/LICENSE)
[<img src="https://badges.ws/badge/-/buy%20me%20a%20coffee/ff813f?icon=buymeacoffee&label" alt="donate" />](https://buymeacoffee.com/vladkens)

</div>

Array helpers for TypeScript that you keep writing by hand — filter nulls with real type narrowing, toggle and upsert objects by key, deduplicate. No lodash needed.

- **Tiny.** 418 bytes (minified and brotli). Zero dependencies.
- **Typed.** `filterNullable` actually narrows the return type — no more `(T | null)[]`.
- **Immutable.** Every function returns a new array, safe to use directly in React `setState`.
- **Fills the gap.** The specific helpers lodash skips: `upsertByKey`, `toggleByKey`, `filterNullable`.

## Install

```sh
npm i array-utils-ts
```

## Usage

```typescript
import {
  filterNullable,
  filterEmpty,
  hasEmpty,
  uniq,
  isUniq,
  toggleItem,
  updateByKey,
  upsertByKey,
  toggleByKey,
  isFirstByKey,
  isLastByKey,
  enumerate,
} from "array-utils-ts"
```

### Filter & Clean

**filterNullable** — removes `null` and `undefined`, narrows the return type

```typescript
filterNullable([1, null, 2, undefined]) // → [1, 2]  (typed as number[])
```

**filterEmpty** — also removes empty strings `""`

```typescript
filterEmpty([1, null, 2, undefined, 3, "", "a"]) // → [1, 2, 3, "a"]
```

**hasEmpty** — returns `true` if any element is `null`, `undefined`, or `""`

```typescript
hasEmpty(["a", "b", "c"]) // → false
hasEmpty(["a", "", "c"]) // → true
hasEmpty(["a", undefined, "c"]) // → true
```

### Deduplicate

**uniq** — removes duplicates

```typescript
uniq([1, 2, 1, 3]) // → [1, 2, 3]
```

**isUniq** — checks if all elements are unique

```typescript
isUniq([1, 2, 3]) // → true
isUniq([1, 2, 1]) // → false
```

### Toggle

**toggleItem** — adds an item if missing, removes it if present; useful in multi-select UI

```typescript
toggleItem([1, 2, 3], 4) // → [1, 2, 3, 4]
toggleItem([1, 2, 3], 3) // → [1, 2]
```

### Object Arrays (by key)

**updateByKey** — updates a matching object; returns the same reference if not found

```typescript
const arr = [
  { id: 1, v: 1 },
  { id: 2, v: 1 },
]

updateByKey(arr, "id", { id: 1, v: 2 }) // → [{ id: 1, v: 2 }, { id: 2, v: 1 }]
updateByKey(arr, "id", { id: 3, v: 1 }) // → arr (same reference, not found)
```

**upsertByKey** — updates if found, appends if not

```typescript
const arr = [
  { id: 1, v: 1 },
  { id: 2, v: 1 },
]

upsertByKey(arr, "id", { id: 1, v: 2 }) // → [{ id: 1, v: 2 }, { id: 2, v: 1 }]
upsertByKey(arr, "id", { id: 3, v: 1 }) // → [...arr, { id: 3, v: 1 }]
```

**toggleByKey** — removes an object if its key matches, appends it if not

```typescript
const arr = [
  { id: 1, v: 1 },
  { id: 2, v: 1 },
]

toggleByKey(arr, "id", { id: 1, v: 2 }) // → [{ id: 2, v: 1 }]
toggleByKey(arr, "id", { id: 3, v: 1 }) // → [...arr, { id: 3, v: 1 }]
```

**isFirstByKey** / **isLastByKey** — check an object's position in the array

```typescript
const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]

isFirstByKey(arr, "id", { id: 1 }) // → true
isFirstByKey(arr, "id", { id: 3 }) // → false
isLastByKey(arr, "id", { id: 3 }) // → true
isLastByKey(arr, "id", { id: 1 }) // → false
```

### Enumerate

**enumerate** — pairs each element with its index, like Python's `enumerate()`

```typescript
const arr = ["a", "b", "c"]

enumerate(arr) // → [[0, "a"], [1, "b"], [2, "c"]]
enumerate(arr, 1) // → [[1, "a"], [2, "b"], [3, "c"]]
```
