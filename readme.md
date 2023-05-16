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

### replaceItem

```typescript
import { replaceItem } from "array-utils-ts"

toggleItem([1, 2, 3], 4)
// -> [1, 2, 3, 4]

toggleItem([1, 2, 3], 3)
// -> [1, 2]
```

### updateByKey

```typescript
import { updateByKey } from "array-utils-ts"

const arr = [{ id: 1 }, { id: 2 }]

updateByKey([1, 2, 3], 4)
// -> [1, 2, 3, 4]

updateByKey([1, 2, 3], 3)
// -> [1, 2]
```
