export const today = () => new Date().toISOString().slice(0, 10);

export const money = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(n);

export function loadStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export const initials = (name) =>
  name.split(' ').map(x => x[0]).slice(0, 2).join('');
