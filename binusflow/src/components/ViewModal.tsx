import type { Task } from '../types';
import './Modal.css';

interface Props {
  task: Task;
  onClose: () => void;
}

const statusText: Record<string, string> = {
  todo: 'To Do',
  inprogress: 'In Progress', 
  done: 'Done'
};

export default function ViewModal({ task, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-controls">
            <label>Status</label>
            <span className="status-badge">{statusText[task.status]}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="field">
            <label>Title</label>
            <div className="readonly-field">{task.title}</div>
          </div>
          <div className="field">
            <label>Description</label>
            <div className="readonly-field textarea">{task.description || 'No description'}</div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
