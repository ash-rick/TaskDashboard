import React from "react";
import DashboardLayout from "../components/templates/DashboardLayout/index";
import TaskList from "../components/organisms/TaskList/index";
import Select from "../components/atoms/Select/index";
import TaskModal from "../components/organisms/TaskModal/index";
import useDashboard from "../hooks/useDashboard";
import { Task } from "../types/tasks";
import { api } from "@/services/api";
import Button from "../components/atoms/Button/index";
import styles from "../styles/dashboard.module.css";
import { STATUS_OPTION_LIST } from "@/constants/index";
import Pagination from "@/components/molecules/Pagination";

const Dashboard: React.FC<{ allTasks: Task[] }> = ({ allTasks }) => {
  const {
    tasks,
    statusFilter,
    handleStatusFilter,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleSubmitTask,
    currentTask,
    handleEditTask,
    users,
    handleDeleteTask,
    currentPage,
    totalPages,
    handlePageChange,
  } = useDashboard(allTasks);

  return (
    <DashboardLayout>
      <div className={styles.dashboardHeader}>
        <Select
          label="Status"
          placeholder="Select status"
          options={["All", ...STATUS_OPTION_LIST]}
          value={statusFilter}
          onChange={handleStatusFilter}
        />
        <Button onClick={handleOpenModal} label="Add task" />
      </div>

      <TaskList
        tasks={tasks.filter(
          (task) => statusFilter === "All" || task.status === statusFilter
        )}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      {isModalOpen ? (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitTask}
          initialValues={currentTask || undefined}
          users={users}
        />
      ) : null}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </DashboardLayout>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  try {
    const allTasks = await api.get<Task[]>("tasks");
    return { props: { allTasks } };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { props: { allTasks: [] } };
  }
}
