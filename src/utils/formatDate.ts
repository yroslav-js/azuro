export const formatDate = (seconds: number) => {
  const now = new Date()
  const date = new Date(seconds * 1000)
  const putZero = (date: number) => date <= 9 ? '0' + date : date
  if (now.getDate() === date.getDate()) return `Today ${putZero(date.getHours())}:${putZero(date.getMinutes())}`
  return putZero(date.getDate()) + '.' + putZero(date.getMonth()) + '.' + putZero(date.getFullYear())
}