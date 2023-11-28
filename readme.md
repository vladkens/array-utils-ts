# array-utils-ts

<div align="center">
  <a href="https://npmjs.org/package/array-utils-ts">
    <img src="https://badgen.net/npm/v/array-utils-ts" alt="version" />
  </a>
  <a href="https://github.com/vladkens/array-utils-ts/actions">
    <img src="https://github.com/vladkens/array-utils-ts/workflows/test/badge.svg" alt="test status" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=array-utils-ts">
    <img src="https://badgen.net/packagephobia/publish/array-utils-ts" alt="size" />
  </a>
  <!-- <a href="https://npmjs.org/package/array-utils-ts">
    <img src="https://badgen.net/npm/dm/array-utils-ts" alt="downloads" />
  </a> -->
  <a href="https://github.com/vladkens/array-utils-ts/blob/main/LICENSE">
    <img src="https://badgen.net/github/license/vladkens/array-utils-ts" alt="license" />
  </a>
</div>

A set of functions for working with arrays, often necessary for working with state, but absent in lodash.

## Install

```sh
yarn add array-utils-ts
```

## Usage

### filterNullable

```typescript
import { filterNullable } from "array-utils-ts"

filterNullable([1, null, 2, undefined])
// -> [1, 2]
```

### filterEmpty

```typescript
import { filterEmpty } from "array-utils-ts"

filterEmpty([1, null, 2, undefined, 3, "", "a"])
// -> [1, 2, 3, "a"]
```

### isUniq

```typescript
import { isUniq } from "array-utils-ts"

isUniq([1, 2, 3])
// -> true

isUniq([1, 2, 1])
// -> false
```

### hasEmpty

```typescript
import { hasEmpty } from "array-utils-ts"

hasEmpty(["a", "b", "c"])
// -> false

hasEmpty(["a", "", "c"])
// -> true

hasEmpty(["a", undefined, "c"])
// -> true
```

### toggleItem

For example useful in `<select>` component

```typescript
import { toggleItem } from "array-utils-ts"

toggleItem([1, 2, 3], 4)
// -> [1, 2, 3, 4]

toggleItem([1, 2, 3], 3)
// -> [1, 2]
```

### updateByKey

```typescript
import { updateByKey } from "array-utils-ts"

// prettier-ignore
const arr1 = [{ id: 1, v: 1 }, { id: 2, v: 1 }]

const arr2 = updateByKey(arr1, "id", { id: 1, v: 2 })
// -> [{ id: 1, v: 2 }, { id: 2, v: 1 }]
// arr1 !== arr2

const arr3 = updateByKey(arr2, "id", { id: 3, v: 1 })
// -> [{ id: 1, v: 2 }, { id: 2, v: 1 }]
// arr2 === arr3 // note: item not found, nothing changed
```

### upsertByKey

```typescript
import { upsertByKey } from "array-utils-ts"

// prettier-ignore
const arr1 = [{ id: 1, v: 1 }, { id: 2, v: 1 }]

const arr2 = upsertByKey(arr1, "id", { id: 1, v: 2 })
// -> [{ id: 1, v: 2 }, { id: 2, v: 1 }]
// arr1 !== arr2

const arr3 = upsertByKey(arr2, "id", { id: 3, v: 1 })
// -> [{ id: 1, v: 2 }, { id: 2, v: 1 }, { id: 3, v: 1 }]
// arr2 !== arr3
```

### toggleByKey

```typescript
import { toggleByKey } from "array-utils-ts"

// prettier-ignore
const arr1 = [{ id: 1, v: 1 }, { id: 2, v: 1 }]

const arr2 = toggleByKey(arr1, "id", { id: 1, v: 2 })
// -> [{ id: 2, v: 1 }]; arr1 !== arr2

const arr3 = toggleByKey(arr2, "id", { id: 3, v: 1 })
// -> [{ id: 2, v: 1 }, { id: 3, v: 1 }]; arr2 !== arr3
```

### isFirstByKey

Check if given object is first in collection by some key.

```typescript
import { isFirstByKey } from "array-utils-ts"

const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
isFirstByKey(arr, "id", { id: 1 }) // -> true
isFirstByKey(arr, "id", { id: 2 }) // -> false
isFirstByKey(arr, "id", { id: 3 }) // -> false
```

### isLastByKey

Check if given object is last in collection by some key.

```typescript
import { isLastByKey } from "array-utils-ts"

const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
isLastByKey(arr, "id", { id: 1 }) // -> false
isLastByKey(arr, "id", { id: 2 }) // -> false
isLastByKey(arr, "id", { id: 3 }) // -> true
```

### enumerate

```typescript
import { enumerate } from "array-utils-ts"

const arr = ["a", "b", "c"]
enumerate(arr) // -> [[0, "a"], [1, "b"], [2, "c"]]
enumerate(arr, 1) // -> [[1, "a"], [2, "b"], [3, "c"]]
```
