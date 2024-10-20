import React, { ReactNode } from "react";
import styles from "./index.module.css"; 

type LayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.dashboardLayout}>
    <header className={styles.header}>Task Dashboard</header>
    <main>{children}</main>
  </div>
);

export default DashboardLayout;
