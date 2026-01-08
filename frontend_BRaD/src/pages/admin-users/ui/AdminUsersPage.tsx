import { useEffect, useState } from 'react';
import { AdminSidebar } from '@widgets/admin-sidebar';
import { useUserStore } from '@entities/user';
import { UserForm } from '@features/user-form';
import { Button } from '@shared/ui';
import styles from './AdminUsersPage.module.css';

export const AdminUsersPage = () => {
  const { users, fetchUsers, deleteUser, setSelectedUser, selectedUser, isLoading } = useUserStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setShowForm(true);
    }
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      await deleteUser(userId);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <div className={styles.adminPage}>
      <AdminSidebar />
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Управление пользователями</h1>
            <p className={styles.pageSubtitle}>Просмотр, редактирование и управление пользователями</p>
          </div>
          <div className={styles.headerRight}>
            <Button onClick={() => { setSelectedUser(null); setShowForm(true); }}>
              Добавить пользователя
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
              <h2>{selectedUser ? 'Редактировать пользователя' : 'Создать пользователя'}</h2>
              <UserForm onSuccess={handleFormSuccess} />
              <Button variant="outline" onClick={() => { setShowForm(false); setSelectedUser(null); }}>
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
                <div className={styles.tableCell}>Пользователь</div>
                <div className={styles.tableCell}>Email</div>
                <div className={styles.tableCell}>Роль</div>
                <div className={styles.tableCell}>Заявок</div>
                <div className={styles.tableCell}>Статус</div>
                <div className={styles.tableCell}>Регистрация</div>
                <div className={styles.tableCell}>Действия</div>
              </div>
            </div>
            <div className={styles.tableBody}>
              {users.map((user) => (
                <div key={user.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatarSmall}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <span className={styles.cellMeta}>ID: #{user.id.slice(0, 4)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tableCell}>{user.email}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className={styles.tableCell}>{user.applicationsCount}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleEdit(user.id)} className={styles.actionBtn}>
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(user.id)} className={styles.actionBtn}>
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

