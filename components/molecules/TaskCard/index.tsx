import React from "react";
import { Task } from "../../../types/tasks";
import { BsFillCircleFill } from "react-icons/bs";
import styles from "./index.module.css";
import { PRIORITY_COLOR_PALETTE } from "@/constants";

type TaskCardProps = Task & {
  className?: string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  status,
  assignee,
  priority,
  dueDate,
  className = "",
}) => (
  <div
    className={`${styles.taskCard} ${
      styles[status.replace(/\s/g, "")]
    } ${className}`}
  >
    <span className={styles.title}>
      Title: <strong>{title}</strong>
    </span>
    <span className={styles.assignee}>
      Assigned To: <strong>{assignee}</strong>
    </span>
    <span className={styles.priority}>
      Priority:{" "}
      <span className={styles.priorityIcon}>
        <BsFillCircleFill color={PRIORITY_COLOR_PALETTE[priority || "None"]} />
      </span>
      <strong>{priority}</strong>
    </span>
    <span className={styles.status}>{status}</span>
    <span className={styles.dueDate}>
      Due Date: <strong>{new Date(dueDate).toLocaleDateString()}</strong>
    </span>
  </div>
);


export default TaskCard;
