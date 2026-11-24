import { useState } from 'react';
import { Save, Store, Lock, Mail, Phone, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import Swal from 'sweetalert2';

export default function Settings() {
  const { settings, updateStoreSettings } = useAdmin();
  const [formData, setFormData] = useState({ ...settings });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveStore = (e) => {
    e.preventDefault();
    updateStoreSettings(formData);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire('Error', 'New password and confirm password do not match!', 'error');
      return;
    }

    const res = await Swal.fire({
      title: 'Update Password?',
      text: 'Are you sure you want to change your admin password?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update',
      confirmButtonColor: '#0f172a',
    });

    if (res.isConfirmed) {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      Swal.fire('Success', 'Admin password updated successfully!', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              PREFERENCES
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">CONFIGURATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            STORE SETTINGS
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Store Details & Contact Info */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <Store size={18} className="text-[#028f99]" />
            <h3 className="font-bold text-sm text-slate-900 font-mono uppercase tracking-wider">
              Store Profile & Contact Information
            </h3>
          </div>

          <form onSubmit={handleSaveStore} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                Store Name
              </label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formData.storeTagline}
                onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  Support Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  Customer Helpline
                </label>
                <input
                  type="text"
                  required
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                Studio & Warehouse Address
              </label>
              <textarea
                rows={3}
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  Currency Display
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  GST / Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-lg transition-colors shadow-xs"
              >
                <Save size={14} />
                <span>Save Store Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Admin Profile & Password */}
        <div className="lg:col-span-5 space-y-5">
          {/* Admin Profile */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <ShieldCheck size={18} className="text-[#028f99]" />
              <h3 className="font-bold text-sm text-slate-900 font-mono uppercase tracking-wider">
                Admin Profile
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Admin Name
                </span>
                <span className="font-bold text-slate-800 text-sm">{formData.adminName}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Super Admin Email
                </span>
                <span className="font-mono text-slate-800">{formData.adminEmail}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Access Level
                </span>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#028f99]/10 text-[#028f99] border border-[#028f99]/20">
                  FULL HQ ACCESS (ALL PERMISSIONS)
                </span>
              </div>
            </div>
          </div>

          {/* Password Change Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Lock size={18} className="text-[#028f99]" />
              <h3 className="font-bold text-sm text-slate-900 font-mono uppercase tracking-wider">
                Update Admin Password
              </h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  placeholder="admin123"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-600 mb-1 font-mono">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-lg transition-colors shadow-xs"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
