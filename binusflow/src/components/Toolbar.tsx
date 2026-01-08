import { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { useAppContext } from '../context';
import CreateModal from './CreateModal';
import DeleteAllModal from './DeleteAllModal';
import './Toolbar.css';

export default function Toolbar() {
  const { searchQuery, setSearchQuery, tasks } = useAppContext();
  const [showCreate, setShowCreate] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);

  return (
    <>
      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="toolbar-btns">
          <button className="btn-add" onClick={() => setShowCreate(true)}>
            <Plus size={22} />
          </button>
          <button 
            className="btn-delete" 
            onClick={() => setShowDeleteAll(true)}
            disabled={tasks.length === 0}
          >
            <Trash2 size={28} />
          </button>
        </div>
      </div>

      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
      {showDeleteAll && <DeleteAllModal onClose={() => setShowDeleteAll(false)} />}
    </>
  );
}
