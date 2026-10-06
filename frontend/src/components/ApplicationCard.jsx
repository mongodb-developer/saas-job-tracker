import { formatSalary, formatDate } from '../utils/format';
import { STATUSES, STATUS_LABELS } from '../utils/constants';

export default function ApplicationCard({ application, onEdit, onDelete, onStatusChange, draggable, onDragStart }) {
  const salaryText = formatSalary(application.salary);
  const appliedText = formatDate(application.appliedDate);

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, application.id)}
      className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{application.company}</p>
          <p className="truncate text-sm text-slate-600">{application.role}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={() => onEdit(application)}
            title="Edit"
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(application)}
            title="Delete"
            className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {application.location && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {application.location}
        </p>
      )}

      {salaryText && <p className="mt-1 text-xs font-medium text-slate-600">{salaryText}</p>}

      {application.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {application.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {application.notes && (
        <p className="mt-2 line-clamp-2 text-xs text-slate-500">{application.notes}</p>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
        {appliedText ? (
          <span className="text-[11px] text-slate-400">Applied {appliedText}</span>
        ) : (
          <span className="text-[11px] text-slate-300">Not applied yet</span>
        )}

        <select
          value={application.status}
          onChange={(e) => onStatusChange(application.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
