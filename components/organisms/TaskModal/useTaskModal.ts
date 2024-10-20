import { useState, useEffect } from "react";
import { Task } from "../../../types/tasks";
import * as Yup from "yup";
import { PRIORITY_OPTION_LIST } from "@/constants";

// Set today's date to the start of the day (00:00:00)
const today = new Date();
today.setHours(0, 0, 0, 0);

// Validation schema for task fields
const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().optional(),
  assignee: Yup.string().required("Assignee is required"),
  priority: Yup.string().oneOf(PRIORITY_OPTION_LIST).required(),
  dueDate: Yup.date()
    .required("Due date is required")
    .min(today, "Due date can't be in the past"),
  status: Yup.string().oneOf(["To Do", "In Progress", "Completed"]).required(),
});

type UseTaskModalProps = {
  initialValues?: Task;
  onSubmit: (task: Task) => void;
};

export const useTaskModal = ({
  initialValues,
  onSubmit,
}: UseTaskModalProps) => {
  const [task, setTask] = useState<Task>(
    initialValues || {
      title: "",
      description: "",
      assignee: "",
      priority: "",
      dueDate: "",
      status: "",
    }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate individual fields on change
  const validateField = async (field: keyof Task, value: any) => {
    try {
      await taskValidationSchema.validateAt(field, { [field]: value });
      setErrors((prev) => {
        const { [field]: _, ...remainingErrors } = prev;
        return remainingErrors; 
      });
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        [field]: err.message,
      }));
    }
  };

  const handleChange = (
    field: keyof Task,
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | string
  ) => {
    const value = typeof e === "string" ? e : e.target.value;
    setTask((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  // Validate the entire task object
  const validateTask = async () => {
    try {
      await taskValidationSchema.validate(task, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: { [key: string]: string } = {};
      err.inner.forEach((error: Yup.ValidationError) => {
        validationErrors[error.path!] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const isValid = await validateTask();
    // Call the onSubmit function if valid
    if (isValid) {
      onSubmit(task);
    }
  };

  // Update task state when initial values change
  useEffect(() => {
    if (initialValues) {
      setTask(initialValues);
    }
  }, [initialValues]);

  return {
    task,
    errors,
    handleChange,
    handleSubmit,
  };
};
