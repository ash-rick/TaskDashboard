export interface Task {
  id?: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed" | "";
  assignee: string;
  priority: "Low" | "Medium" | "High" | "";
  dueDate: string;
}
