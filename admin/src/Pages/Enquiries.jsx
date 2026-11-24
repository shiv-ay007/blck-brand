import { useState, useMemo } from 'react';
import { Search, Mail, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Enquiries() {
  const { enquiries, updateEnquiryStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const matchSearch =
        enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enq.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || enq.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              SUPPORT & MESSAGES
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              INBOX
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            CONTACT ENQUIRIES
          </h1>
        </div>

        <div className="text-xs font-mono text-neutral-600 bg-white border border-[#deded8] px-4 py-2 rounded-xl shadow-xs">
          New Unresolved: <strong className="text-amber-600 font-bold">{enquiries.filter((e) => e.status === 'New').length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#deded8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'New', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
                statusFilter === st ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:bg-[#f7f7f4]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sender, email, subject, message..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
          />
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-5">
        {filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs hover:shadow-sm transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#deded8]/60">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#040d12] text-white flex items-center justify-center font-bold text-sm font-heading">
                    {enq.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-base text-neutral-900 font-heading">{enq.name}</div>
                    <div className="text-xs text-neutral-500 font-mono flex items-center gap-1.5 mt-0.5">
                      <Mail size={12} className="text-neutral-400" />
                      <span>{enq.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{enq.date}</span>
                  </div>
                  <StatusBadge status={enq.status} />
                </div>
              </div>

              {/* Subject & Message */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-heading">
                  {enq.subject}
                </h4>
                <p className="text-sm text-neutral-700 mt-2 leading-relaxed bg-[#f7f7f4] p-4 rounded-xl border border-[#deded8]/70 font-sans">
                  {enq.message}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs font-mono text-neutral-400 font-medium">ID: {enq.id}</div>
                <div className="flex items-center gap-2.5">
                  {enq.status !== 'In Progress' && enq.status !== 'Resolved' && (
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'In Progress')}
                      className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Clock size={14} />
                      <span>In Progress</span>
                    </button>
                  )}
                  {enq.status !== 'Resolved' && (
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'Resolved')}
                      className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      <span>Resolve</span>
                    </button>
                  )}
                  <a
                    href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject)}`}
                    className="px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-neutral-900 text-white hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Mail size={13} />
                    <span>Reply</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-[#deded8] rounded-2xl p-14 text-center text-neutral-400 font-mono text-sm">
            No contact enquiries found.
          </div>
        )}
      </div>
    </div>
  );
}
