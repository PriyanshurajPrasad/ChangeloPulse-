import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminAccessPage() {
  const [codeCells, setCodeCells] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { adminAccess, isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated as admin, redirect to admin dashboard immediately
  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === 'admin') {
      const origin = location.state?.from?.pathname || '/admin/dashboard';
      navigate(origin, { replace: true });
    }
  }, [isAuthenticated, user, loading, navigate, location]);

  // Focus first cell on mount
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Filter only single alphanumeric character
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (!cleaned) {
      const newCells = [...codeCells];
      newCells[index] = '';
      setCodeCells(newCells);
      setError('');
      return;
    }

    const char = cleaned.slice(-1);
    const newCells = [...codeCells];
    newCells[index] = char;
    setCodeCells(newCells);
    setError('');

    // Auto focus next input cell
    if (index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!codeCells[index] && index > 0) {
        // Move to previous cell on backspace if current cell is empty
        inputRefs[index - 1].current?.focus();
        const newCells = [...codeCells];
        newCells[index - 1] = '';
        setCodeCells(newCells);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').trim().replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (!pastedText) return;

    const chars = pastedText.slice(0, 4).split('');
    const newCells = ['', '', '', ''];
    chars.forEach((ch, idx) => {
      newCells[idx] = ch;
    });

    setCodeCells(newCells);
    setError('');

    const nextIndex = Math.min(chars.length, 3);
    inputRefs[nextIndex].current?.focus();
  };

  const fullCode = codeCells.join('');
  const isCodeComplete = fullCode.length === 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCodeComplete || submitting) return;

    setError('');
    setSubmitting(true);

    try {
      const res = await adminAccess(fullCode);
      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(res.message || 'Invalid access code.');
        setCodeCells(['', '', '', '']);
        inputRefs[0].current?.focus();
      }
    } catch (err) {
      const errorMsg = err.message || 'Verification failed. Invalid access code.';
      setError(errorMsg);
      setCodeCells(['', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md space-y-8">
        {/* Header Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center ring-8 ring-purple-50/50 dark:ring-purple-950/30">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100/70 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              <Lock className="w-3 h-3" />
              <span>Restricted Access</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Admin Access
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Authorized administrators only. Enter your 4-character access code to continue to the management portal.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-3 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Code Input Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                4-Character Access Code
              </label>

              {/* 4 Cell OTP Grid */}
              <div className="flex justify-center items-center gap-3" onPaste={handlePaste}>
                {codeCells.map((char, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={char}
                    disabled={submitting}
                    aria-label={`Character ${index + 1} of 4-character access code`}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl font-black rounded-2xl border transition-all duration-200 outline-none uppercase shadow-sm ${
                      char
                        ? 'border-purple-600 dark:border-purple-400 bg-purple-50/50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-4 ring-purple-500/10'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15'
                    } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={!isCodeComplete || submitting}
              className={`w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold tracking-wide uppercase shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isCodeComplete && !submitting
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25 active:scale-[0.99]'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Access Code...</span>
                </>
              ) : (
                <>
                  <span>Access Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Notice */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              This area is strictly restricted to authorized administrators.
            </p>
            <div className="mt-3">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                Return to Gateway
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
