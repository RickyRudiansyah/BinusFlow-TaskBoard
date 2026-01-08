import { useAppContext } from '../context';
import './Modal.css';

interface Props {
  onClose: () => void;
}

export default function DeleteAllModal({ onClose }: Props) {
  const { deleteAllTasks } = useAppContext();

  const handleDelete = () => {
    deleteAllTasks();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal delete-modal" onClick={e => e.stopPropagation()}>
        <div className="delete-content">
          <p>
            Are you sure you want to delete all the tasks?{' '}
            <span className="warning">this action will delete all existing tasks</span>
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
