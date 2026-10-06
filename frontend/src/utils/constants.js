export const STATUSES = ['SAVED', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];

export const STATUS_LABELS = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
};

export const STATUS_STYLES = {
  SAVED: {
    column: 'bg-slate-100/70',
    badge: 'bg-slate-200 text-slate-700',
    dot: 'bg-slate-400',
  },
  APPLIED: {
    column: 'bg-blue-50/70',
    badge: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
  },
  INTERVIEW: {
    column: 'bg-amber-50/70',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
  },
  OFFER: {
    column: 'bg-emerald-50/70',
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  REJECTED: {
    column: 'bg-rose-50/70',
    badge: 'bg-rose-100 text-rose-700',
    dot: 'bg-rose-500',
  },
};

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR'];
