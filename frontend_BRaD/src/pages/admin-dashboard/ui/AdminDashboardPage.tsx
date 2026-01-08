import { AdminSidebar } from '@widgets/admin-sidebar';
import styles from './AdminDashboardPage.module.css';

export const AdminDashboardPage = () => {
  return (
    <div className={styles.adminPage}>
      <AdminSidebar />
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Дашборд</h1>
            <p className={styles.pageSubtitle}>Общая статистика и аналитика</p>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.adminUser}>
              <div className={styles.userAvatar}>A</div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>Администратор</div>
                <div className={styles.userRole}>Admin</div>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>1,234</div>
              <div className={styles.statLabel}>Всего пользователей</div>
              <div className={styles.statChange}>+12% за месяц</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>567</div>
              <div className={styles.statLabel}>Активных вакансий</div>
              <div className={styles.statChange}>+8% за месяц</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>892</div>
              <div className={styles.statLabel}>Заявок сегодня</div>
              <div className={styles.statChange}>+23% за день</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>78%</div>
              <div className={styles.statLabel}>Успешных размещений</div>
              <div className={styles.statChange}>+5% за месяц</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

