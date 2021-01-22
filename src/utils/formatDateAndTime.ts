export default function formatDateAndTime(date: string) {
  if (!date) return '';
  return (
    new Date(date).toDateString() + ' ' + new Date(date).toLocaleTimeString()
  );
}
