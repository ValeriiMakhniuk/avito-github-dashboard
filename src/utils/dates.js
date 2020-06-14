import { formatDistanceToNow } from 'date-fns';

export function formatToNow(date) {
  return formatDistanceToNow(date, { addSuffix: true });
}
