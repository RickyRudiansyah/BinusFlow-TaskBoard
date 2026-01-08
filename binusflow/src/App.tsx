import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Configuration from './pages/Configuration';
import './App.css';

function Layout() {
  const { sidebarOpen } = useAppContext();
  
  return (
    <div className="app">
      <Sidebar />
      <main style={{ marginLeft: sidebarOpen ? 200 : 60, transition: 'margin 0.3s' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/config" element={<Configuration />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
