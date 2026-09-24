import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { updateService } from '../../services/updateService';
import { useToast } from '../../context/ToastContext';
import UpdateForm from '../../components/admin/UpdateForm';
import { DetailSkeleton } from '../../components/common/Skeleton';

export default function EditUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [initialValues, setInitialValues] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUpdate = async () => {
      setFetching(true);
      try {
        const res = await updateService.getUpdateById(id);
        if (res.success && res.data) {
          setInitialValues(res.data);
        }
      } catch (err) {
        showToast('Failed to fetch update details for editing', 'error');
        navigate('/admin/updates');
      } finally {
        setFetching(false);
      }
    };
    if (id) {
      fetchUpdate();
    }
  }, [id]);

  const handleUpdate = async (payload) => {
    setLoading(true);
    try {
      const res = await updateService.updateUpdate(id, payload);
      if (res.success) {
        showToast('Product update saved successfully!', 'success');
        navigate('/admin/updates');
      }
    } catch (err) {
      console.error('Failed to edit update', err);
      showToast(err.message || 'Failed to edit product update', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <DetailSkeleton />
      </div>
    );
  }

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
          Edit Product Update
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Modify update content, change status, or regenerate URL slug.
        </p>
      </div>

      <UpdateForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        loading={loading}
        submitText="Save Changes"
      />
    </div>
  );
}
