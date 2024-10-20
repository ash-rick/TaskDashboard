import React from "react";
import styles from "./index.module.css";

interface SelectProps {
  label?: string;
  placeholder?: string; 
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}) => (
  <div className={styles.selectContainer}>
    {label && <label className={styles.label}>{label}</label>}
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option className={styles.optionCss} key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
