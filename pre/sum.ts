export const sum = (...numbers: number[]) => {
  return numbers.reduce((acc, number) => acc + number, 0)
}
