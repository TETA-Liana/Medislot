'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    Calendar as CalendarIcon,
    MoreVertical,
    Search,
    Filter,
    FileText,
    MessageSquare,
    Video,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Upcoming': 'bg-blue-100 text-blue-600 border-blue-200',
        'Completed': 'bg-green-100 text-green-600 border-green-200',
        'Cancelled': 'bg-red-100 text-red-600 border-red-200',
        'Pending': 'bg-yellow-100 text-yellow-600 border-yellow-200',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles['Pending']}`}>
            {status}
        </span>
    );
};

export default function DashboardAppointments({ appointments, onOpenBooking }: { appointments: any[], onOpenBooking: (doc?: any) => void }) {
    const [filter, setFilter] = useState('All');

    const filteredAppointments = filter === 'All'
        ? appointments
        : appointments.filter(a => a.status === filter);

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">My Appointments</h2>
                    <p className="text-slate-500 text-sm">Manage and track your medical consultations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['All', 'Upcoming', 'Completed', 'Cancelled'].map(t => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === t ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <Button
                    className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all"
                    onClick={() => onOpenBooking()}
                >
                    <Plus size={18} />
                    Book New Appointment
                </Button>
            </div>

            {/* List */}
            <div className="grid gap-6">
                {filteredAppointments.map((appt, idx) => (
                    <motion.div
                        key={appt.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6 w-full lg:w-auto">
                                <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                                    <CalendarIcon size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-xl font-black text-slate-900">{appt.doctor}</h4>
                                        <StatusBadge status={appt.status} />
                                    </div>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-3">{appt.specialty}</p>
                                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                            <CalendarIcon size={14} className="text-emerald-500" />
                                            {appt.date}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                            <Clock size={14} className="text-emerald-500" />
                                            {appt.time}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                                {appt.status === 'Upcoming' && (
                                    <Button className="flex-1 lg:flex-none h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                                        <Video size={18} />
                                        Launch Meeting
                                    </Button>
                                )}
                                <button className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-all">
                                    <MessageSquare size={20} />
                                </button>
                                <button className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-all">
                                    <FileText size={20} />
                                </button>
                                <button className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredAppointments.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-6">
                            <CalendarIcon size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No appointments found</h3>
                        <p className="text-slate-500 mb-8">You don't have any appointments matching this category.</p>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold" onClick={() => onOpenBooking()}>Book a New Session</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
