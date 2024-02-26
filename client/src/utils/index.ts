import noImage from '@/assets/noImage.png'

export function replaceByDefaultImage(event: any) {
  event.target.src = noImage
}

export function localeDate(date: Date) {
  const dateObject = new Date(date)
  return dateObject.toLocaleString()
}
