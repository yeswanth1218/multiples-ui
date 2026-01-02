import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/dashboard/HomePage';
import SectorPage from './pages/dashboard/SectorPage';
import CompanyPage from './pages/dashboard/CompanyPage';
import OverviewPage from './pages/dashboard/OverviewPage';
import PortfolioPage from './pages/dashboard/PortfolioPage';
import WorkflowPage from './pages/dashboard/WorkflowPage';
import NotificationsPage from './pages/dashboard/NotificationsPage';
import NotesPage from './pages/dashboard/NotesPage';
import EmailsPage from './pages/dashboard/EmailsPage';
import SchedulePage from './pages/dashboard/SchedulePage';
import TeamPage from './pages/dashboard/TeamPage';
import ActionItemsPage from './pages/dashboard/ActionItemsPage';
import ActionItemDetailPage from './pages/dashboard/ActionItemDetailPage';

// Chart and table data for OverviewPage
const chartData = [
  { label: 'Oct 1-7', thisYear: '60%', lastYear: '40%' },
  { label: 'Oct 8-14', thisYear: '80%', lastYear: '65%' },
  { label: 'Oct 15-21', thisYear: '45%', lastYear: '30%' },
  { label: 'Oct 22-28', thisYear: '90%', lastYear: '70%' },
  { label: 'Oct 29-31', thisYear: '75%', lastYear: '50%' },
];

const tableData = [
  { name: 'Dena Neek', traits: ['Serial Founder', 'Technical Founder', 'Masters Degree'], company: 'Loom', dueDate: '26/10/2025' },
  { name: 'Ruchio Mang', traits: ['Serial Founder', 'Technical Founder', 'Former FAANG'], company: 'Figma', dueDate: '24/10/2025' },
  { name: 'John Wick', traits: ['Serial Founder', 'Masters Degree'], company: 'Notion', dueDate: '27/10/2025' },
  { name: 'Sarah Connor', traits: ['Technical Founder', 'Former FAANG'], company: 'Linear', dueDate: '28/10/2025' },
  { name: 'Neo Anderson', traits: ['Serial Founder', 'Technical Founder', 'Masters Degree'], company: 'Matrix', dueDate: '30/10/2025' },
];

import { TaskProvider } from './context/TaskContext';
import { SectorProvider } from './context/SectorContext';

export default function App() {
  return (
    <SectorProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
          {/* Login Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="sector/:sectorId" element={<SectorPage />} />
            <Route path="company/:companyId" element={<CompanyPage />} />
            <Route path="overview" element={<OverviewPage chartData={chartData} tableData={tableData} />} />
            <Route path="action-items" element={<ActionItemsPage />} />
            <Route path="action-items/:itemId" element={<ActionItemDetailPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="workflow" element={<WorkflowPage />} />
            
            {/* Newly implemented pages */}
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="emails" element={<EmailsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </TaskProvider>
    </SectorProvider>
  );
}
