import { useState } from 'react';
import { Save, Store, Lock, ShieldCheck } from 'lucide-react';
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
      confirmButtonColor: '#040d12',
    });

    if (res.isConfirmed) {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      Swal.fire('Success', 'Admin password updated successfully!', 'success');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              PREFERENCES
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              CONFIGURATION
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            STORE SETTINGS
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Store Details & Contact Info */}
        <div className="lg:col-span-7 bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#deded8]">
            <Store size={20} className="text-[#028f99]" />
            <h3 className="font-bold text-base text-neutral-900 font-heading uppercase tracking-wider">
              Store Profile & Contact Information
            </h3>
          </div>

          <form onSubmit={handleSaveStore} className="space-y-5 text-sm">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                Store Name
              </label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-heading font-bold text-neutral-900"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formData.storeTagline}
                onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                  Support Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                  Customer Helpline
                </label>
                <input
                  type="text"
                  required
                  value={formData.supportPhone}
                  onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                Studio & Warehouse Address
              </label>
              <textarea
                rows={3}
                value={formData.storeAddress}
                onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-sans leading-relaxed text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                  Currency Display
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                  GST / Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-xs"
              >
                <Save size={15} />
                <span>Save Store Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Admin Profile & Password */}
        <div className="lg:col-span-5 space-y-6">
          {/* Admin Profile */}
          <div className="bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#deded8]">
              <ShieldCheck size={20} className="text-[#028f99]" />
              <h3 className="font-bold text-base text-neutral-900 font-heading uppercase tracking-wider">
                Admin Profile
              </h3>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Admin Name
                </span>
                <span className="font-bold text-neutral-900 text-base font-heading mt-0.5 block">{formData.adminName}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Super Admin Email
                </span>
                <span className="font-mono text-neutral-800 text-sm mt-0.5 block">{formData.adminEmail}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Access Level
                </span>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#028f99]/10 text-[#028f99] border border-[#028f99]/25 uppercase tracking-wider">
                  FULL HQ ACCESS (ALL PERMISSIONS)
                </span>
              </div>
            </div>
          </div>

          {/* Password Change Form */}
          <div className="bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[#deded8]">
              <Lock size={20} className="text-[#028f99]" />
              <h3 className="font-bold text-base text-neutral-900 font-heading uppercase tracking-wider">
                Update Admin Password
              </h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
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
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 mb-1.5 font-mono text-xs">
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
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-xs"
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
