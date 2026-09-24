import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { updateService } from '../../services/updateService';
import { useToast } from '../../context/ToastContext';
import UpdateForm from '../../components/admin/UpdateForm';

export default function CreateUpdatePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    setLoading(true);
    try {
      const res = await updateService.createUpdate(payload);
      if (res.success) {
        showToast('Product update created successfully!', 'success');
        navigate('/admin/updates');
      }
    } catch (err) {
      console.error('Failed to create update', err);
      showToast(err.message || 'Failed to create product update', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/updates"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manage Updates</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Create New Product Update
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Draft a new feature, improvement, bug fix, or announcement.
        </p>
      </div>

      <UpdateForm onSubmit={handleCreate} loading={loading} submitText="Create Product Update" />
    </div>
  );
}
