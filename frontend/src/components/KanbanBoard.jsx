import KanbanColumn from './KanbanColumn';
import { STATUSES } from '../utils/constants';

export default function KanbanBoard({ applications, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          applications={applications.filter((app) => app.status === status)}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onDrop={(id, newStatus) => onStatusChange(id, newStatus)}
        />
      ))}
    </div>
  );
}
