import React from "react";
import Modal from "react-modal";
import Input from "../../atoms/Input/index";
import Select from "../../atoms/Select/index";
import TextArea from "../../atoms/TextArea/index";
import { Task } from "../../../types/tasks";

import { useTaskModal } from "./useTaskModal";
import "./index.module.css";
import Button from "@/components/atoms/Button/index";
import styles from "./index.module.css";
import { PRIORITY_OPTION_LIST, STATUS_OPTION_LIST } from "@/constants/index";
import { capitalizeText } from "@/utils";

// Set the app element for accessibility (can be the root element of your app)
Modal.setAppElement("#__next");

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialValues?: Task;
  users: string[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  users,
}) => {
  const { task, errors, handleChange, handleSubmit } = useTaskModal({
    initialValues,
    onSubmit,
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <h2>
        {initialValues ? `Edit Task: ${initialValues?.title}` : "Create Task"}
      </h2>

      <Input
        type="text"
        label="Title*"
        value={task.title}
        placeholder="Title"
        onChange={(e) => handleChange("title", e)}
      />
      {errors.title && <p className={styles.error}>{errors.title}</p>}

      <TextArea
        value={task.description || ""}
        placeholder="Description"
        onChange={(e) => handleChange("description", e)}
      />
      {errors.description && (
        <p className={styles.error}>{capitalizeText(errors.description)}</p>
      )}

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <Select
            label="Assignee*"
            placeholder="Select Assignee"
            options={users}
            value={task.assignee}
            onChange={(e) => handleChange("assignee", e)}
          />
          {errors.assignee && (
            <p className={styles.error}>{capitalizeText(errors.assignee)}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <Select
            label="Priority*"
            placeholder="Select Priority"
            options={PRIORITY_OPTION_LIST}
            value={task.priority}
            onChange={(value) => handleChange("priority", value)}
          />
          {errors.priority && (
            <p className={styles.error}>{capitalizeText(errors.priority)}</p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <Input
            label="Due Date*"
            type="date"
            value={task.dueDate}
            onChange={(e) => handleChange("dueDate", e)}
          />
          {errors.dueDate && (
            <p className={styles.error}>{capitalizeText(errors.dueDate)}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <Select
            label="Status*"
            placeholder="Select Status"
            options={STATUS_OPTION_LIST}
            value={task.status}
            onChange={(value) => handleChange("status", value)}
          />
          {errors.status && (
            <p className={styles.error}>{capitalizeText(errors.status)}</p>
          )}
        </div>
      </div>

      <div className={styles.modalActions}>
        <Button onClick={onClose} label="Cancel" />
        <Button onClick={handleSubmit} label="Submit" />
      </div>
    </Modal>
  );
};

export default TaskModal;
