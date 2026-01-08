import Toolbar from '../components/Toolbar';
import TaskBoard from '../components/TaskBoard';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F5A962' }}>
      <Toolbar />
      <TaskBoard />
    </div>
  );
}
