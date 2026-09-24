import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Send,
  Archive,
  Eye
} from 'lucide-react';
import { updateService } from '../../services/updateService';
import { useDebounce } from '../../hooks/useDebounce';
import { useToast } from '../../context/ToastContext';
import { useSocket } from '../../context/SocketContext';
import CategoryBadge from '../../components/common/CategoryBadge';
import StatusBadge from '../../components/common/StatusBadge';
import Pagination from '../../components/changelog/Pagination';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import { TableSkeleton } from '../../components/common/Skeleton';

export default function ManageUpdates({ defaultStatus = '' }) {
  const { showToast } = useToast();
  const { lastEvent } = useSocket();
  const [updates, setUpdates] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(defaultStatus);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 350);

  // Delete Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await updateService.getUpdates({
        page,
        limit: 10,
        search: debouncedSearch,
        status: statusFilter,
        category: categoryFilter
      });

      if (res.success && res.data) {
        setUpdates(res.data);
        setPagination(res.pagination || null);
      }
    } catch (err) {
      console.error('Failed to load admin updates', err);
      showToast('Failed to fetch updates list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();

    const handleUpdateEvent = () => fetchUpdates();
    window.addEventListener('changelog:update', handleUpdateEvent);
    window.addEventListener('focus', handleUpdateEvent);

    return () => {
      window.removeEventListener('changelog:update', handleUpdateEvent);
      window.removeEventListener('focus', handleUpdateEvent);
    };
  }, [page, debouncedSearch, statusFilter, categoryFilter]);

  // Real-time Socket Listener for Admin Manage Updates Table
  useEffect(() => {
    if (
      lastEvent &&
      [
        'updateCreated',
        'updatePublished',
        'updateUpdated',
        'updateArchived',
        'updateDeleted'
      ].includes(lastEvent.type)
    ) {
      fetchUpdates();
    }
  }, [lastEvent]);

  // Status Action Handlers (Publish / Archive)
  const handlePublish = async (id, title) => {
    try {
      const res = await updateService.publishUpdate(id);
      if (res.success) {
        showToast(`"${title}" published successfully!`, 'success');
        fetchUpdates();
      }
    } catch (err) {
      showToast(err.message || 'Failed to publish update', 'error');
    }
  };

  const handleArchive = async (id, title) => {
    try {
      const res = await updateService.archiveUpdate(id);
      if (res.success) {
        showToast(`"${title}" archived.`, 'info');
        fetchUpdates();
      }
    } catch (err) {
      showToast(err.message || 'Failed to archive update', 'error');
    }
  };

  // Delete Handler
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      const res = await updateService.deleteUpdate(itemToDelete._id);
      if (res.success) {
        showToast('Update deleted successfully.', 'success');
        setDeleteModalOpen(false);
        setItemToDelete(null);
        fetchUpdates();
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete update', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Manage Product Updates
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create, publish, edit, archive or delete product updates.
          </p>
        </div>

        <Link
          to="/admin/updates/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md shadow-indigo-500/20 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Update</span>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="relative sm:col-span-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search title, tags..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium"
            >
              <option value="">All Statuses (Draft, Published, Archived)</option>
              <option value="published">Published Only</option>
              <option value="draft">Draft Only</option>
              <option value="archived">Archived Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium"
            >
              <option value="">All Categories</option>
              <option value="feature">Feature</option>
              <option value="improvement">Improvement</option>
              <option value="bug-fix">Bug Fix</option>
              <option value="announcement">Announcement</option>
              <option value="release">Release</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        {loading ? (
          <TableSkeleton rows={6} />
        ) : updates.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No product updates match your current filter parameters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Version</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {updates.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      <div className="truncate font-bold">{item.title}</div>
                      <div className="text-xs text-slate-400 truncate max-w-xs font-normal">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <CategoryBadge category={item.category} size="xs" />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-slate-600 dark:text-slate-400 font-bold">
                      {item.version}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right space-x-1">
                      {/* View Public Detail Eye Button */}
                      <Link
                        to={`/user/changelog/${item.slug}`}
                        className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="View Public Detail"
                        aria-label="View Public Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      {/* Publish Action button */}
                      {item.status !== 'published' && (
                        <button
                          onClick={() => handlePublish(item._id, item.title)}
                          className="inline-flex p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition"
                          title="Publish Update"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}

                      {/* Archive Action button */}
                      {item.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(item._id, item.title)}
                          className="inline-flex p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60 transition"
                          title="Archive Update"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}

                      {/* Edit button */}
                      <Link
                        to={`/admin/updates/${item._id}/edit`}
                        className="inline-flex p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition"
                        title="Edit Update"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      {/* Delete button */}
                      <button
                        onClick={() => {
                          setItemToDelete(item);
                          setDeleteModalOpen(true);
                        }}
                        className="inline-flex p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition"
                        title="Delete Update"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && pagination && (
        <Pagination pagination={pagination} onPageChange={(p) => setPage(p)} />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemTitle={itemToDelete?.title || ''}
        loading={deleting}
      />
    </div>
  );
}
