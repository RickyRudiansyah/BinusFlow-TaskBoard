import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAppContext } from '../context';
import AddColorModal from '../components/AddColorModal';
import './Config.css';

export default function Configuration() {
  const { colors, removeColor } = useAppContext();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="config-page">
      <div className="config-header">
        <h1>This is configuration page</h1>
      </div>

      <div className="config-content">
        <h2>Color list</h2>
        <div className="color-list">
          {colors.map(c => (
            <div key={c.id} className="color-item">
              <button className="remove-btn" onClick={() => removeColor(c.id)}>
                <X size={10} />
              </button>
              <div className="color-box" style={{ background: `#${c.hex}` }} />
            </div>
          ))}
          <button className="add-btn" onClick={() => setShowAdd(true)}>
            <Plus size={20} />
            <span>Add Color</span>
          </button>
        </div>
      </div>

      {showAdd && <AddColorModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
