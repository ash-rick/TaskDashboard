import React from "react";
import TaskCard from "../../molecules/TaskCard/index";
import { Task } from "../../../types/tasks";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./index.module.css";
import Button from "@/components/atoms/Button/index";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
};

const TaskList: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskRow}>
          <TaskCard className={styles.taskCardCustom} {...task} />
          <div className={styles.taskActions}>
            <FaEdit
              className={styles.icon}
              onClick={() => onEdit(task)}
              title="Edit Task"
            />
            <FaTrashAlt
              className={`${styles.icon} ${styles.deleteIcon}`}
              onClick={() => onDelete(task?.id as any)}
              title="Delete Task"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
