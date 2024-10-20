import { Task } from "../types/tasks";
import { api } from "./api"; 
const API_URL = "/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  return await api.get<Task[]>(API_URL);
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  return await api.post<Task>(API_URL, task);
};

export const updateTask = async (task: Task): Promise<Task> => {
  return await api.put<Task>(`${API_URL}/${task.id}`, task);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await api.delete<void>(`${API_URL}/${taskId}`);
};
