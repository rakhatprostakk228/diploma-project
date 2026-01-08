import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';

export const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={styles.adminSidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.adminLogo}>
          <div className={styles.logoIcon}>⚙️</div>
          <span className={styles.logoText}>Admin Panel</span>
        </div>
      </div>
      
      <nav className={styles.sidebarNav}>
        <Link 
          to="/admin/dashboard" 
          className={`${styles.navItem} ${isActive('/admin/dashboard') ? styles.active : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Дашборд</span>
        </Link>
        <Link 
          to="/admin/jobs" 
          className={`${styles.navItem} ${isActive('/admin/jobs') ? styles.active : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>Вакансии</span>
        </Link>
        <Link 
          to="/admin/users" 
          className={`${styles.navItem} ${isActive('/admin/users') ? styles.active : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Пользователи</span>
        </Link>
      </nav>
      
      <div className={styles.sidebarFooter}>
        <Link to="/" className={styles.navItem}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>На сайт</span>
        </Link>
      </div>
    </aside>
  );
};

