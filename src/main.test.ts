import { test } from "uvu"
import { equal, not } from "uvu/assert"
import {
  enumerate,
  filterEmpty,
  filterNullable,
  hasEmpty,
  isFirstByKey,
  isLastByKey,
  isUniq,
  toggleByKey,
  toggleItem,
  updateByKey,
  upsertByKey,
} from "./main"

test("filterNullable", () => {
  equal(filterNullable([1, 2, 3]), [1, 2, 3])
  equal(filterNullable([1, null, 3]), [1, 3])
  equal(filterNullable([1, undefined, 3]), [1, 3])
  equal(filterNullable([1, null, undefined, 3]), [1, 3])
  equal(filterNullable(["a", "b", "c"]), ["a", "b", "c"])
  equal(filterNullable(["a", null, "c"]), ["a", "c"])
  equal(filterNullable(["a", undefined, "c"]), ["a", "c"])
  equal(filterNullable(["a", null, undefined, "c"]), ["a", "c"])
  equal(filterNullable([1, "b", 3]), [1, "b", 3])
  equal(filterNullable([1, null, "c"]), [1, "c"])
  equal(filterNullable([1, undefined, "c"]), [1, "c"])
  equal(filterNullable([1, null, undefined, "c"]), [1, "c"])
  equal(filterNullable([]), [])
  equal(filterNullable([null]), [])
  equal(filterNullable([undefined]), [])
  equal(filterNullable([null, undefined]), [])
  equal(filterNullable([{ a: 1 }, { a: 2 }, { a: 3 }]), [{ a: 1 }, { a: 2 }, { a: 3 }])
  equal(filterNullable([{ a: 1 }, null, { a: 3 }]), [{ a: 1 }, { a: 3 }])
  equal(filterNullable([{ a: 1 }, undefined, { a: 3 }]), [{ a: 1 }, { a: 3 }])
  equal(filterNullable([{ a: 1 }, null, undefined, { a: 3 }]), [{ a: 1 }, { a: 3 }])
  equal(filterNullable([1, { a: 2 }, 3]), [1, { a: 2 }, 3])
  equal(filterNullable([1, null, { a: 3 }]), [1, { a: 3 }])
  equal(filterNullable([1, undefined, { a: 3 }]), [1, { a: 3 }])
  equal(filterNullable([1, null, undefined, { a: 3 }]), [1, { a: 3 }])
})

test("filterEmpty", () => {
  equal(filterEmpty([1, 2, 3]), [1, 2, 3])
  equal(filterEmpty([1, "", 3]), [1, 3])
  equal(filterEmpty([1, undefined, 3]), [1, 3])
  equal(filterEmpty([1, null, undefined, 3]), [1, 3])
  equal(filterEmpty(["a", "b", "c"]), ["a", "b", "c"])
  equal(filterEmpty(["a", "", "c"]), ["a", "c"])
  equal(filterEmpty(["a", undefined, "c"]), ["a", "c"])
  equal(filterEmpty(["a", null, undefined, "c"]), ["a", "c"])
  equal(filterEmpty([1, "b", 3]), [1, "b", 3])
  equal(filterEmpty([1, "", "c"]), [1, "c"])
  equal(filterEmpty([1, undefined, "c"]), [1, "c"])
})

test("isUniq", () => {
  equal(isUniq([1, 2, 3]), true)
  equal(isUniq([1, 2, 1]), false)
  equal(isUniq(["a", "b", "c"]), true)
  equal(isUniq(["a", "b", "a"]), false)
  equal(isUniq([1, "b", 3]), true)
  equal(isUniq([1, "b", 1]), false)
  equal(isUniq([]), true)
  equal(isUniq([null]), true)
  equal(isUniq([undefined]), true)
  equal(isUniq([null, undefined]), true)
  equal(isUniq([1, true]), true)
  equal(isUniq([true, true]), false)

  const a = { a: 1 }
  equal(isUniq([a, { b: 2 }]), true)
  equal(isUniq([a, a]), false)
})

test("hasEmpty", () => {
  equal(hasEmpty([1, 2, 3]), false)
  equal(hasEmpty(["a", "b"]), false)
  equal(hasEmpty(["a", "b", ""]), true)
  equal(hasEmpty(["a", "b", null]), true)
  equal(hasEmpty(["a", "b", undefined]), true)
})

test("toggleItem", () => {
  const arr1 = [1, 2, 3]

  const arr2 = toggleItem(arr1, 4)
  equal(arr2.length, 4)
  equal(arr2, [1, 2, 3, 4])
  not.equal(arr2, arr1)

  const arr3 = toggleItem(arr1, 3)
  equal(arr3.length, 2)
  equal(arr3, [1, 2])
  not.equal(arr3, arr1)

  const arrobj1 = [{ id: 1 }, { id: 2 }, { id: 3 }]

  // new ref so always add
  const arrobj2 = toggleItem(arrobj1, { id: 1 })
  equal(arrobj2.length, 4)
  // prettier-ignore
  equal(arrobj2.map(x => x.id), [1, 2, 3, 1])

  // existing ref so remove
  const arrobj3 = toggleItem(arrobj2, arrobj2[0])
  equal(arrobj3.length, 3)
  // prettier-ignore
  equal(arrobj3.map(x => x.id), [2, 3, 1])
})

test("updateByKey", () => {
  // prettier-ignore
  const arr1 = [{ id: 1, v: 1 }, { id: 2, v: 1 }]

  const arr2 = updateByKey(arr1, "id", { id: 1, v: 2 })
  equal(arr2.length, 2)
  // prettier-ignore
  equal(arr2, [{ id: 1, v: 2 }, { id: 2, v: 1 }])
  not.equal(arr2, arr1)

  const arr3 = updateByKey(arr2, "id", { id: 3, v: 1 })
  equal(arr3.length, 2)
  // prettier-ignore
  equal(arr3, [{ id: 1, v: 2 }, { id: 2, v: 1 }])
  equal(arr2, arr3)
})

test("upsertByKey", () => {
  // prettier-ignore
  const arr1 = [{ id: 1, v: 1 }, { id: 2, v: 1 }]

  const arr2 = upsertByKey(arr1, "id", { id: 1, v: 2 })
  equal(arr2.length, 2)
  // prettier-ignore
  equal(arr2, [{ id: 1, v: 2 }, { id: 2, v: 1 }])
  not.equal(arr2, arr1)

  const arr3 = upsertByKey(arr2, "id", { id: 3, v: 1 })
  equal(arr3.length, 3)
  // prettier-ignore
  equal(arr3, [{ id: 1, v: 2 }, { id: 2, v: 1 }, { id: 3, v: 1 }])
  not.equal(arr3, arr2)
})

test("toggleByKey", () => {
  const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }]

  const arr2 = toggleByKey(arr1, "id", { id: 1 })
  equal(arr2.length, 2)
  equal(arr2, [{ id: 2 }, { id: 3 }])
  not.equal(arr2, arr1)

  const arr3 = toggleByKey(arr2, "id", { id: 1 })
  equal(arr3.length, 3)
  equal(arr3, [{ id: 2 }, { id: 3 }, { id: 1 }])
  not.equal(arr3, arr2)
})

test("isFirstByKey", () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
  equal(isFirstByKey(arr, "id", { id: 1 }), true)
  equal(isFirstByKey(arr, "id", { id: 2 }), false)
  equal(isFirstByKey(arr, "id", { id: 3 }), false)
})

test("isLastByKey", () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
  equal(isLastByKey(arr, "id", { id: 1 }), false)
  equal(isLastByKey(arr, "id", { id: 2 }), false)
  equal(isLastByKey(arr, "id", { id: 3 }), true)
})

test("enumerate", () => {
  // prettier-ignore
  equal(enumerate(["a", "b", "c"]), [[0, "a"], [1, "b"], [2, "c"]])
  // prettier-ignore
  equal(enumerate(["a", "b", "c"], 1), [[1, "a"], [2, "b"], [3, "c"]])
})

test.run()
