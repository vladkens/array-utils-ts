type NotNullable<T> = Exclude<T, null | undefined>
type NotEmpty<T> = Exclude<T, null | undefined | "">
type Dict = Record<string, any>

// export const uniq = <T>(arr: T[]): T[] => {
//   return Array.from(new Set(arr))
// }

export const filterNullable = <T>(items: T[]): NotNullable<T>[] => {
  return items.filter((x): x is NotNullable<T> => x !== undefined && x !== null)
}

export const filterEmpty = <T>(items: T[]): NotEmpty<T>[] => {
  return items.filter((x): x is NotEmpty<T> => x !== undefined && x !== null && x !== "")
}

export const isUniq = <T>(arr: T[]): boolean => {
  return arr.length === new Set(arr).size
}

export const hasEmpty = <T>(arr: T[]): boolean => {
  return !arr.every((el) => el !== null && el !== undefined && el !== "")
}

export const toggleItem = <T>(arr: T[], item: T): T[] => {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]
}

// By Key

export const updateByKey = <T extends Dict>(arr: T[], key: keyof T, obj: T): T[] => {
  if (!arr.map((x) => x[key]).includes(obj[key])) return arr
  return arr.map((x) => (x[key] === obj[key] ? { ...x, ...obj } : x))
}

export const upsertByKey = <T extends Dict>(arr: T[], key: keyof T, obj: T): T[] => {
  if (arr.map((x) => x[key]).includes(obj[key])) {
    return arr.map((x) => (x[key] === obj[key] ? { ...x, ...obj } : x))
  }
  return [...arr, obj]
}

export const toggleByKey = <T extends Dict>(arr: T[], key: keyof T, obj: T) => {
  const ids = arr.map((x) => x[key])
  return ids.includes(obj[key]) ? arr.filter((x) => x[key] !== obj[key]) : [...arr, obj]
}

export const isFirstByKey = <T extends Dict>(arr: T[], key: keyof T, obj: T): boolean => {
  return arr.findIndex((x) => x[key] === obj[key]) === 0
}

export const isLastByKey = <T extends Dict>(arr: T[], key: keyof T, obj: T): boolean => {
  return arr.findIndex((x) => x[key] === obj[key]) === arr.length - 1
}
