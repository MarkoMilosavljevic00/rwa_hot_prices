export function calculateDiscount(price: number, oldPrice: number): number {
  if(oldPrice) {
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return Math.round(discount);
  }
  else return 0;
}

export function formatPostTime(postedDate: Date): string {
  const now = new Date();
  const diff = now.getTime() - postedDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just posted';
  }
}
