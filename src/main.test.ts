import { test } from "uvu"
import { equal } from "uvu/assert"
import { filterEmpty, filterNullable, hasEmpty, isUniq } from "./main"

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

test.run()
