import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { AdminDashboardPage } from '@pages/admin-dashboard';
import { AdminJobsPage } from '@pages/admin-jobs';
import { AdminUsersPage } from '@pages/admin-users';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/jobs" element={<AdminJobsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

