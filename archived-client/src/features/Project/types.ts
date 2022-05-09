export interface UserDict {
  [index: string]: Memberships;
}

export interface ColumnDict {
  [index: string]: Column;
}

export interface TaskDict {
  [index: string]: Task;
}

export interface Params {
  id: string;
}

export interface Project {
  id: string;
  name: string;
  prefix: string;
  description: string;
  teamId?: string;
  userId: string;
  active: boolean;
  public: boolean;
  columnOrder: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
}

enum Role {
  Administrator = "administrator",
  Editor = "editor",
  Commenter = "commenter",
  Viewer = "viewer",
}

export interface Memberships {
  id: string;
  role: Role;
  userId: string;
  email: string;
  picture: string;
  firstName: string;
  lastName: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface Board {
  columns: ColumnDict;
  tasks: TaskDict;
}

export interface Column {
  id: string;
  projectId: string;
  title: string;
  columnName: string;
  taskIds: string[];
  created: string;
}

export interface Task {
  id: string;
  key: string;
  seq: number;
  title: string;
  points: number;
  assignedTo: string;
  comments: string[];
  attachments: string[];
  content: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTask {
  projectId: string;
  columnId: string;
  task: string;
}

export interface DeleteTask {
  projectId: string;
  columnId: string;
  taskId: string;
}

export interface MoveTask {
  projectId: string;
  to: string;
  from: string;
  taskId: string;
  taskIds: string[];
}
