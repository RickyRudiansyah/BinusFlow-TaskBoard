import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import type { Task } from '../types';
import './TaskCard.css';

interface Props {
  task: Task;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

// cek warna terang atau gelap buat text color
function isLight(hex: string) {
  const r = parseInt(hex.slice(0,2), 16);
  const g = parseInt(hex.slice(2,4), 16);
  const b = parseInt(hex.slice(4,6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export default function TaskCard({ task, selected, onSelect, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task', task }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: `#${task.color}`,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${selected ? 'selected' : ''}`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      {selected && (
        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <X size={12} />
        </button>
      )}
      <span style={{ color: isLight(task.color) ? '#1a1a1a' : '#fff' }}>
        {task.title.length > 10 ? task.title.slice(0,10) + '...' : task.title}
      </span>
    </div>
  );
}
