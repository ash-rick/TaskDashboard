import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Task } from "../types/tasks";
import { createTask, updateTask, deleteTask } from "../services/taskService";
import { ITEMS_PER_PAGE, ASSIGNEE_USERS_LIST } from "@/constants/index";

const useDashboard = (allTasks: Task[]) => {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [users] = useState<string[]>(ASSIGNEE_USERS_LIST);
  const [currentPage, setCurrentPage] = useState(1);

 useEffect(() => {
   // Filter tasks based on the selected status. If "All" is selected, use all tasks.
   const newFilteredTasks =
     statusFilter === "All"
       ? tasks
       : tasks.filter((task) => task.status === statusFilter);

   setFilteredTasks(newFilteredTasks); 
   setCurrentPage(1); // Reset the current page to 1 when filtering tasks
 }, [tasks, statusFilter]);

 // Calculate tasks to display for the current page based on pagination
 const tasksToDisplay = filteredTasks.slice(
   (currentPage - 1) * ITEMS_PER_PAGE,
   currentPage * ITEMS_PER_PAGE
 );

 // Calculate the total number of pages based on the filtered tasks
 const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusFilter = (selectedStatus: string) => {
    setStatusFilter(selectedStatus);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    handleOpenModal();
  };

  const handleSubmitTask = async (task: Task) => {
    try {
      let updatedTasks: Task[];

      if (currentTask) {
        const updatedTask = await updateTask(task);
        updatedTasks = tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        toast.success("Task updated successfully!");
      } else {
        const newTask = await createTask({ ...task });
        updatedTasks = [...tasks, newTask];
        toast.success("Task created successfully!");
      }

      setTasks(updatedTasks);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to submit task:", error);
      toast.error("Failed to submit task."); 
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task."); 
    }
  };

  return {
    tasks: tasksToDisplay,
    statusFilter,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleSubmitTask,
    currentTask,
    setCurrentTask,
    users,
    handleDeleteTask,
    handleEditTask,
    totalPages,
    currentPage,
    handlePageChange,
    handleStatusFilter,
  };
};

export default useDashboard;
