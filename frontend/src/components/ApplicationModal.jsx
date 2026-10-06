import { useEffect, useState } from 'react';
import { STATUSES, STATUS_LABELS, CURRENCIES } from '../utils/constants';

const EMPTY_FORM = {
  company: '',
  role: '',
  location: '',
  status: 'SAVED',
  salaryMin: '',
  salaryMax: '',
  currency: 'USD',
  jobUrl: '',
  notes: '',
  tags: '',
  appliedDate: '',
};

function toFormState(application) {
  if (!application) return EMPTY_FORM;
  return {
    company: application.company || '',
    role: application.role || '',
    location: application.location || '',
    status: application.status || 'SAVED',
    salaryMin: application.salary?.min ?? '',
    salaryMax: application.salary?.max ?? '',
    currency: application.salary?.currency || 'USD',
    jobUrl: application.jobUrl || '',
    notes: application.notes || '',
    tags: (application.tags || []).join(', '),
    appliedDate: application.appliedDate || '',
  };
}

export default function ApplicationModal({ open, application, onClose, onSubmit, submitting, errors }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (open) {
      setForm(toFormState(application));
    }
  }, [open, application]);

  if (!open) return null;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      company: form.company.trim(),
      role: form.role.trim(),
      location: form.location.trim() || null,
      status: form.status,
      salary: {
        min: form.salaryMin === '' ? null : Number(form.salaryMin),
        max: form.salaryMax === '' ? null : Number(form.salaryMax),
        currency: form.currency,
      },
      jobUrl: form.jobUrl.trim() || null,
      notes: form.notes.trim() || null,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      appliedDate: form.appliedDate || null,
    };

    onSubmit(payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {application ? 'Edit application' : 'New application'}
          </h2>
          <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          {errors?.length > 0 && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              <ul className="list-inside list-disc space-y-0.5">
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">Company *</label>
              <input
                required
                value={form.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-xs font-medium text-slate-600">Role *</label>
              <input
                required
                value={form.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Location</label>
              <input
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Salary min</label>
              <input
                type="number"
                min="0"
                value={form.salaryMin}
                onChange={(e) => handleChange('salaryMin', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Salary max</label>
              <input
                type="number"
                min="0"
                value={form.salaryMax}
                onChange={(e) => handleChange('salaryMax', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Currency</label>
              <select
                value={form.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Job URL</label>
            <input
              type="url"
              value={form.jobUrl}
              onChange={(e) => handleChange('jobUrl', e.target.value)}
              placeholder="https://…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Tags (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="java, remote"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Applied date</label>
              <input
                type="date"
                value={form.appliedDate || ''}
                onChange={(e) => handleChange('appliedDate', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? 'Saving…' : application ? 'Save changes' : 'Create application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
