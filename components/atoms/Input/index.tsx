import React from "react";
import styles from "./index.module.css";

interface InputProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  placeholder,
  onChange,
  label,
}) => (
  <div className={styles.inputContainer}>
    {label && <label className={styles.label}>{label}</label>}

    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={styles.inputField}
    />
  </div>
);

export default Input;
