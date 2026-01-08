// tipe data buat task
export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  color: string;
  createdAt: Date;
}

export interface ColorItem {
  id: string;
  hex: string;
}
