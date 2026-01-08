import { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import './Modal.css';

interface Props {
  onClose: () => void;
}

// validasi hex code
function isValidHex(hex: string) {
  return /^[0-9A-Fa-f]{6}$/.test(hex.replace('#', ''));
}

export default function AddColorModal({ onClose }: Props) {
  const { addColor } = useAppContext();
  const [hex, setHex] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(isValidHex(hex));
  }, [hex]);

  const handleSave = () => {
    if (valid) {
      addColor(hex.replace('#', ''));
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal color-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-body">
          <div className="field">
            <label>Color</label>
            <input 
              value={hex} 
              onChange={e => setHex(e.target.value.toUpperCase())} 
              placeholder="562CF0"
              maxLength={7}
            />
          </div>
          <div className="field">
            <label>Preview</label>
            {valid ? (
              <div className="color-preview" style={{ background: `#${hex.replace('#', '')}` }} />
            ) : (
              <div className="color-preview no-preview">
                <span>No Preview Available</span>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSave} disabled={!valid}>Save</button>
        </div>
      </div>
    </div>
  );
}
