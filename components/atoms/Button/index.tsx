import React from "react";
import styles from "./index.module.css";

interface ButtonProps {
  label: string;
  style?: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, style, onClick, disabled }) => (
  <button
    className={`${styles.button} ${style}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
