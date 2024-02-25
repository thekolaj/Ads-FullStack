export default function localeDate(date: Date) {
  const dateObject = new Date(date)
  return dateObject.toLocaleString()
}
