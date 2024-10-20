import React from "react";
import Button from "@/components/atoms/Button/index";
import styles from "./index.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className={styles.pagination}>
      <Button
        label="Prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pages.map((page) => (
        <Button
          key={page}
          label={String(page)}
          onClick={() => onPageChange(page)}
          style={page === currentPage ? styles.active : styles.inactive}
        />
      ))}

      <Button
        label="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
