export function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month < 10 ? (month = '0' + month) : month
  const day = date.getDate()
  return `${year}-${month}-${day}`
}
