import { useState } from 'react';
import { useAppContext, DEFAULT_COLOR } from '../context';
import type { TaskStatus } from '../types';
import './Modal.css';

interface Props {
  onClose: () => void;
}

export default function CreateModal({ onClose }: Props) {
  const { addTask, colors } = useAppContext();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [color, setColor] = useState(colors[0]?.hex || DEFAULT_COLOR);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Title harus diisi!');
      return;
    }
    addTask(title.trim(), desc.trim(), status, color);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-controls">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="header-controls">
            <label>Color</label>
            <div className="color-options">
              {colors.map(c => (
                <button
                  key={c.id}
                  className={`color-opt ${color === c.hex ? 'active' : ''}`}
                  style={{ background: `#${c.hex}` }}
                  onClick={() => setColor(c.hex)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="field">
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title..." />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Task description..." rows={5} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
