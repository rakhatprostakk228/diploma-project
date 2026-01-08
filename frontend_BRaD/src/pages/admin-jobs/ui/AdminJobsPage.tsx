import { useEffect, useState } from 'react';
import { AdminSidebar } from '@widgets/admin-sidebar';
import { useJobStore } from '@entities/job';
import { JobForm } from '@features/job-form';
import { Button } from '@shared/ui';
import styles from './AdminJobsPage.module.css';

export const AdminJobsPage = () => {
  const { jobs, fetchJobs, deleteJob, setSelectedJob, selectedJob, isLoading } = useJobStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowForm(true);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (confirm('Вы уверены, что хотите удалить эту вакансию?')) {
      await deleteJob(jobId);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedJob(null);
    fetchJobs();
  };

  return (
    <div className={styles.adminPage}>
      <AdminSidebar />
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Управление вакансиями</h1>
            <p className={styles.pageSubtitle}>Создание, редактирование и модерация вакансий</p>
          </div>
          <div className={styles.headerRight}>
            <Button onClick={() => { setSelectedJob(null); setShowForm(true); }}>
              Добавить вакансию
            </Button>
            <div className={styles.adminUser}>
              <div className={styles.userAvatar}>A</div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>Администратор</div>
                <div className={styles.userRole}>Admin</div>
              </div>
            </div>
          </div>
        </header>

        {showForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>{selectedJob ? 'Редактировать вакансию' : 'Создать вакансию'}</h2>
              <JobForm onSuccess={handleFormSuccess} />
              <Button variant="outline" onClick={() => { setShowForm(false); setSelectedJob(null); }}>
                Отмена
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>Название</div>
                <div className={styles.tableCell}>Компания</div>
                <div className={styles.tableCell}>Тип</div>
                <div className={styles.tableCell}>Заявок</div>
                <div className={styles.tableCell}>Статус</div>
                <div className={styles.tableCell}>Дата</div>
                <div className={styles.tableCell}>Действия</div>
              </div>
            </div>
            <div className={styles.tableBody}>
              {jobs.map((job) => (
                <div key={job.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <strong>{job.title}</strong>
                    <span className={styles.cellMeta}>{job.location} • {job.type}</span>
                  </div>
                  <div className={styles.tableCell}>{job.company}</div>
                  <div className={styles.tableCell}>
                    <span className={styles.badge}>{job.type}</span>
                  </div>
                  <div className={styles.tableCell}>{job.applicationsCount}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${styles[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleEdit(job.id)} className={styles.actionBtn}>
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(job.id)} className={styles.actionBtn}>
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

