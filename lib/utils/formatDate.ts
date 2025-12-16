export function formatDate(input: string | number): string {
  const date = new Date(input)
  if (isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC', // <-- force UTC
  })
}
