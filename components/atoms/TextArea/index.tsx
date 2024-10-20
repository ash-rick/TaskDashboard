import React from "react";
import styles from "./index.module.css";

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  value,
  placeholder,
  onChange,
}) => (
  <textarea
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className={styles.textArea}
  />
);

export default TextArea;
