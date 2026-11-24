import { useState, useMemo } from 'react';
import { Search, MessageSquare, Mail, Calendar, CheckCircle2, Clock, Check } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              SUPPORT & MESSAGES
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">INBOX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            CONTACT ENQUIRIES
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
          New Unresolved: <strong className="text-amber-600">{enquiries.filter((e) => e.status === 'New').length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'New', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === st ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sender, email, subject, message..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
          />
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono">
                    {enq.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{enq.name}</div>
                    <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Mail size={11} />
                      <span>{enq.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{enq.date}</span>
                  </div>
                  <StatusBadge status={enq.status} />
                </div>
              </div>

              {/* Subject & Message */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  {enq.subject}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {enq.message}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <div className="text-[10px] font-mono text-slate-400">ID: {enq.id}</div>
                <div className="flex items-center gap-2">
                  {enq.status !== 'In Progress' && enq.status !== 'Resolved' && (
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'In Progress')}
                      className="px-2.5 py-1 text-xs font-mono font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded transition-colors flex items-center gap-1"
                    >
                      <Clock size={12} />
                      <span>Mark In Progress</span>
                    </button>
                  )}
                  {enq.status !== 'Resolved' && (
                    <button
                      onClick={() => updateEnquiryStatus(enq.id, 'Resolved')}
                      className="px-2.5 py-1 text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                  <a
                    href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject)}`}
                    className="px-3 py-1 text-xs font-mono font-semibold bg-slate-900 text-white hover:bg-black rounded transition-colors flex items-center gap-1"
                  >
                    <Mail size={12} />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-400 font-mono text-xs">
            No contact enquiries found.
          </div>
        )}
      </div>
    </div>
  );
}
