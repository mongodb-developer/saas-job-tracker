import { useCallback, useEffect, useState } from 'react';
import StatsBar from './components/StatsBar';
import Toolbar from './components/Toolbar';
import KanbanBoard from './components/KanbanBoard';
import ApplicationModal from './components/ApplicationModal';
import ConfirmDialog from './components/ConfirmDialog';
import {
  fetchApplications,
  fetchStats,
  createApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
} from './api/applications';

export default function App() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [apps, statsData] = await Promise.all([
        fetchApplications({ search, status: statusFilter || undefined }),
        fetchStats(),
      ]);
      setApplications(apps);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(loadData, 250);
    return () => clearTimeout(timeout);
  }, [loadData]);

  function openCreateModal() {
    setEditingApplication(null);
    setFormErrors([]);
    setModalOpen(true);
  }

  function openEditModal(application) {
    setEditingApplication(application);
    setFormErrors([]);
    setModalOpen(true);
  }

  async function handleSubmit(payload) {
    try {
      setSubmitting(true);
      if (editingApplication) {
        await updateApplication(editingApplication.id, payload);
      } else {
        await createApplication(payload);
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      setFormErrors(err.details?.length ? err.details : [err.message]);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(id, status) {
    const previous = applications;
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
    try {
      await updateApplicationStatus(id, status);
      const statsData = await fetchStats();
      setStats(statsData);
    } catch (err) {
      setApplications(previous);
      setError(err.message);
    }
  }

  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;
    try {
      await deleteApplication(deleteTarget.id);
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      setError(err.message);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
              J
            </div>
            <h1 className="text-lg font-semibold text-slate-900">Job Tracker</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <StatsBar stats={stats} />

        <Toolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onNewApplication={openCreateModal}
        />

        {error && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {loading && applications.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">Loading applications…</div>
        ) : (
          <KanbanBoard
            applications={applications}
            onEdit={openEditModal}
            onDelete={setDeleteTarget}
            onStatusChange={handleStatusChange}
          />
        )}
      </main>

      <ApplicationModal
        open={modalOpen}
        application={editingApplication}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
        errors={formErrors}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete application"
        message={
          deleteTarget
            ? `Are you sure you want to delete the application for ${deleteTarget.role} at ${deleteTarget.company}?`
            : ''
        }
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
