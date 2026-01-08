import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context';
import './Sidebar.css';

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <div className="logo">
        <span>📋</span>
        {sidebarOpen && <span>BinusFlow</span>}
      </div>

      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          <LayoutDashboard size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/config" className={({ isActive }) => isActive ? 'active' : ''}>
          <Settings size={20} />
          {sidebarOpen && <span>Configuration</span>}
        </NavLink>
      </nav>
    </div>
  );
}
