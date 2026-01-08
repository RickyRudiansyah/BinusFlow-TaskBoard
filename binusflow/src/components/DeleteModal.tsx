import { useAppContext } from '../context';
import type { Task } from '../types';
import './Modal.css';

interface Props {
  task: Task;
  onClose: () => void;
}

export default function DeleteModal({ task, onClose }: Props) {
  const { deleteTask } = useAppContext();

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal delete-modal" onClick={e => e.stopPropagation()}>
        <div className="delete-content">
          <p>Are you sure you want to delete this task?</p>
          <div className="task-name">{task.title} - Delete</div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
