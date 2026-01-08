import React, { useState, useMemo } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { ListTodo, Loader, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context';
import type { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import ViewModal from './ViewModal';
import DeleteModal from './DeleteModal';
import './TaskBoard.css';

const columns: { id: TaskStatus; title: string; icon: React.ReactNode }[] = [
  { id: 'todo', title: 'To Do', icon: <ListTodo size={18} /> },
  { id: 'inprogress', title: 'In Progress', icon: <Loader size={18} /> },
  { id: 'done', title: 'Done', icon: <CheckCircle size={18} /> },
];

// komponen droppable column
function DroppableColumn({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div 
      ref={setNodeRef} 
      className={`col-content ${isOver ? 'drag-over' : ''}`}
    >
      {children}
    </div>
  );
}

export default function TaskBoard() {
  const { tasks, searchQuery, moveTask } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [tasks, searchQuery]);

  const grouped = useMemo(() => {
    const result: Record<TaskStatus, Task[]> = { todo: [], inprogress: [], done: [] };
    filtered.forEach(t => result[t.status].push(t));
    return result;
  }, [filtered]);

  // kurangi distance biar lebih responsif
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const onDragStart = (e: DragStartEvent) => {
    const task = tasks.find(t => t.id === e.active.id);
    if (task) {
      setActiveTask(task);
      setSelectedId(null);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveTask(null);
    if (!e.over) return;
    
    const activeId = e.active.id as string;
    const overId = e.over.id as string;
    
    // cek kalo drop ke column
    if (['todo', 'inprogress', 'done'].includes(overId)) {
      moveTask(activeId, overId as TaskStatus);
    } else {
      // drop ke task lain, pake status task itu
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) {
        moveTask(activeId, overTask.status);
      }
    }
  };

  const handleCardClick = (task: Task) => {
    if (selectedId === task.id) {
      setViewTask(task);
      setSelectedId(null);
    } else {
      setSelectedId(task.id);
    }
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="board" onClick={() => setSelectedId(null)}>
          {columns.map(col => (
            <div key={col.id} className="column">
              <div className="col-header">
                {col.icon}
                <span>{col.title}</span>
              </div>
              <SortableContext items={grouped[col.id].map(t => t.id)} strategy={rectSortingStrategy}>
                <DroppableColumn id={col.id}>
                  {grouped[col.id].map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      selected={selectedId === task.id}
                      onSelect={() => handleCardClick(task)}
                      onDelete={() => { setDeleteTask(task); setSelectedId(null); }}
                    />
                  ))}
                  {grouped[col.id].length === 0 && (
                    <p className="empty">Drop tasks here</p>
                  )}
                </DroppableColumn>
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="drag-preview" style={{ backgroundColor: `#${activeTask.color}` }}>
              {activeTask.title.slice(0, 10)}
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {viewTask && <ViewModal task={viewTask} onClose={() => setViewTask(null)} />}
      {deleteTask && <DeleteModal task={deleteTask} onClose={() => setDeleteTask(null)} />}
    </>
  );
}