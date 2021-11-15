import { ListBook } from 'constants/mocks'

export const debounce = (cb: Function, wait = 20) => {
  let h: any = 0
  let callable = (...args: any) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
  return callable
}

export const randomAmountIndex = (
  amount: number = 10,
  maxRange: number = ListBook.length,
) => {
  const indexes = new Set()
  while (indexes.size !== amount) {
    indexes.add(Math.floor(Math.random() * maxRange) + 1)
  }

  return [...indexes]
}
