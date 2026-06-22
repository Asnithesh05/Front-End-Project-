import React from 'react';
import { 
  Archive, 
  ShieldAlert, 
  Calendar, 
  Mail, 
  Phone, 
  Search,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { useStaffDatabase } from '../../hooks/useStaffDatabase';

export const EmployeeHistoryPage = () => {
  const { terminatedStaff } = useStaffDatabase();
  const [revealedPhoneId, setRevealedPhoneId] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-widest text-white uppercase flex items-center gap-4 italic opacity-50">
              <Archive className="text-white/40" size={40} />
              Personnel Archive
            </h1>
            <p className="text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase mt-2">
              Status: READ_ONLY // TERMINATED_SESSIONS_LOG
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex flex-col items-center opacity-40">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Total Terminated</span>
            <span className="text-xl font-black text-white/60 tabular-nums">{terminatedStaff.length}</span>
          </div>
        </div>

        {/* Search / Filter */}
        <div className="relative max-w-2xl group opacity-60">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
          <input 
            type="text" 
            placeholder="FILTER ARCHIVED RECORDS..." 
            className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-8 text-xs font-mono tracking-widest focus:outline-none focus:border-white/20 transition-all cursor-not-allowed"
            disabled
          />
        </div>

        {/* Archive Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          {/* Scanning Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <table className="w-full text-left border-collapse relative">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="p-8 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic">Unit Designation</th>
                <th className="p-8 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic">Former Role</th>
                <th className="p-8 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic">Termination Date</th>
                <th className="p-8 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase italic text-right">Records</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {terminatedStaff.map((member) => (
                <motion.tr 
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  className="group hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-6">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-14 h-14 rounded-2xl grayscale object-cover border border-white/10"
                      />
                      <div>
                        <p className="text-xl font-bold tracking-tight text-white/60">{member.name}</p>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">UID: {member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {member.role}
                    </span>
                  </td>
                  <td className="p-8 text-xs font-mono text-white/40 tracking-widest flex items-center gap-3">
                    <Calendar size={14} className="opacity-30" />
                    {member.terminationDate}
                  </td>
                  <td className="p-8 text-right space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="inline-flex p-3 bg-white/5 border border-white/5 rounded-xl text-white/20 hover:text-white/60 hover:bg-white/10 transition-all"
                      title={member.email}
                    >
                      <Mail size={16} />
                    </a>
                    <button 
                      onClick={() => setRevealedPhoneId(revealedPhoneId === member.id ? null : member.id)}
                      className={`inline-flex items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl transition-all ${
                        revealedPhoneId === member.id ? 'text-orange-500 bg-white/10' : 'text-white/20 hover:text-white/60 hover:bg-white/10'
                      }`}
                      title="Toggle Phone"
                    >
                      <Phone size={16} />
                      {revealedPhoneId === member.id && (
                        <span className="text-[10px] font-mono tracking-tighter animate-in fade-in slide-in-from-right-4">
                          {member.phone}
                        </span>
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {terminatedStaff.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center justify-center opacity-30">
              <ShieldAlert size={64} className="mb-6" />
              <p className="text-xs font-mono tracking-[0.5em] uppercase">No Archived Personnel Records Found</p>
            </div>
          )}
        </div>
        
        {/* Visual Decoration */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};
