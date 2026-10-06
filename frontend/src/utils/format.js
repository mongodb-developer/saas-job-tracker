export function formatSalary(salary) {
  if (!salary || (salary.min == null && salary.max == null)) {
    return null;
  }

  const currency = salary.currency || 'USD';
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  if (salary.min != null && salary.max != null) {
    return `${formatter.format(salary.min)} – ${formatter.format(salary.max)}`;
  }
  if (salary.min != null) {
    return `From ${formatter.format(salary.min)}`;
  }
  return `Up to ${formatter.format(salary.max)}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
