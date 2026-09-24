import React from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import Modal from '../common/Modal';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemTitle, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product Update" maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-200">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <p className="text-xs font-semibold">This action is permanent and cannot be undone.</p>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete <span className="font-bold text-slate-900 dark:text-slate-100">"{itemTitle}"</span>?
        </p>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-500/20 disabled:opacity-50 transition"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loading ? 'Deleting...' : 'Confirm Delete'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
