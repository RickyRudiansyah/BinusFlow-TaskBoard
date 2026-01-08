import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task, ColorItem, TaskStatus } from './types';

// warna default
const defaultColors: ColorItem[] = [
  { id: '1', hex: 'FF6B6B' },
  { id: '2', hex: '4ECDC4' },
  { id: '3', hex: 'FFE66D' },
  { id: '4', hex: '95E1D3' },
  { id: '5', hex: 'C084FC' },
];

export const DEFAULT_COLOR = 'A0A0A0';

interface ContextType {
  tasks: Task[];
  colors: ColorItem[];
  sidebarOpen: boolean;
  searchQuery: string;
  addTask: (title: string, desc: string, status: TaskStatus, color: string) => void;
  deleteTask: (id: string) => void;
  deleteAllTasks: () => void;
  moveTask: (id: string, status: TaskStatus) => void;
  addColor: (hex: string) => void;
  removeColor: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<ContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // load dari localstorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('bf_tasks');
    if (saved) {
      return JSON.parse(saved).map((t: Task) => ({ ...t, createdAt: new Date(t.createdAt) }));
    }
    return [];
  });

  const [colors, setColors] = useState<ColorItem[]>(() => {
    const saved = localStorage.getItem('bf_colors');
    return saved ? JSON.parse(saved) : defaultColors;
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // save ke localstorage tiap ada perubahan
  useEffect(() => {
    localStorage.setItem('bf_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bf_colors', JSON.stringify(colors));
  }, [colors]);

  const addTask = (title: string, desc: string, status: TaskStatus, color: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description: desc,
      status,
      color,
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const deleteAllTasks = () => setTasks([]);

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const addColor = (hex: string) => {
    setColors(prev => [...prev, { id: uuidv4(), hex: hex.toUpperCase() }]);
  };

  const removeColor = (id: string) => {
    const colorToRemove = colors.find(c => c.id === id);
    if (colorToRemove) {
      // update task yg pake warna ini ke default
      setTasks(prev => prev.map(t => 
        t.color.toUpperCase() === colorToRemove.hex.toUpperCase() 
          ? { ...t, color: DEFAULT_COLOR } 
          : t
      ));
    }
    setColors(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AppContext.Provider value={{
      tasks, colors, sidebarOpen, searchQuery,
      addTask, deleteTask, deleteAllTasks, moveTask,
      addColor, removeColor, setSidebarOpen, setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext harus dipake dalam AppProvider');
  return ctx;
}
