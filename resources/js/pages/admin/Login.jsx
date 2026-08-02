import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../../services/api';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const { isRtl } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await adminLogin(email, password);
      if (res.token) {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || (isRtl ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Header & Isolation Notice */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isRtl ? 'تسجيل دخول الإدارة' : 'Management Security Portal'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isRtl 
              ? 'صفحة الإدارة مخصصة ومحمية، تتطلب إدخال كلمة المرور في كل محاولة دخول' 
              : 'Isolated management portal requiring password verification for access'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs font-bold flex items-center gap-2 border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isRtl ? 'اسم المستخدم / البريد الإلكتروني' : 'Username / Email'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {isRtl ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-xl text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 rtl:right-3 rtl:left-auto top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-extrabold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (isRtl ? 'جاري التحقق والمصادقة...' : 'Authenticating...') : (isRtl ? 'دخول قسم الإدارة' : 'Login to Management')}
          </button>
        </form>

      </div>
    </div>
  );
}
