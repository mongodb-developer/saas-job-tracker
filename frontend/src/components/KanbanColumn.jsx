import ApplicationCard from './ApplicationCard';
import { STATUS_LABELS, STATUS_STYLES } from '../utils/constants';

export default function KanbanColumn({ status, applications, onEdit, onDelete, onStatusChange, onDrop }) {
  const styles = STATUS_STYLES[status];

  function handleDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id) onDrop(id, status);
  }

  return (
    <div
      className={`flex w-72 shrink-0 flex-col rounded-xl ${styles.column} border border-slate-200/60`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
          <h3 className="text-sm font-semibold text-slate-700">{STATUS_LABELS[status]}</h3>
        </div>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 shadow-sm">
          {applications.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-3" style={{ minHeight: '120px' }}>
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            draggable
            onDragStart={handleDragStart}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}

        {applications.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 py-6 text-center text-xs text-slate-400">
            No applications
          </div>
        )}
      </div>
    </div>
  );
}
