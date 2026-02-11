'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    User,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    Calendar as CalendarIcon,
    XCircle
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
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles['Pending']}`}>
            {status}
        </span>
    );
};

export default function DashboardOverview({ appointments, doctors }: { appointments: any[], doctors: any[] }) {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Timeline & Calendar */}
            <div className="lg:col-span-2 space-y-8">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { title: 'Total Bookings', value: '48', change: '+12%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { title: 'Pending', value: '03', change: '-2', icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                        { title: 'Upcoming', value: '02', change: 'Today', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm"
                        >
                            <div className="flex flex-col gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.title}</span>
                                        <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-slate-400'}`}>{stat.change}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Appointments Timeline */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-slate-800">Appointment Timeline</h2>
                        <Button variant="outline" className="text-xs font-bold rounded-xl border-slate-200 h-9">View Full History</Button>
                    </div>

                    <div className="relative space-y-8 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                        {appointments.slice(0, 3).map((appt, idx) => (
                            <motion.div
                                key={appt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative flex gap-6 pl-14 group"
                            >
                                <div className={`absolute left-0 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${appt.status === 'Completed' ? 'bg-green-500' :
                                    appt.status === 'Cancelled' ? 'bg-red-500' :
                                        'bg-blue-500'
                                    }`}>
                                    {appt.status === 'Completed' ? <CheckCircle2 className="text-white" size={20} /> :
                                        appt.status === 'Cancelled' ? <XCircle className="text-white" size={20} /> :
                                            <Clock className="text-white" size={20} />}
                                </div>
                                <div className="flex-1 bg-slate-50/50 p-5 rounded-3xl border border-slate-100 group-hover:border-emerald-200 group-hover:bg-white transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-slate-800">{appt.doctor}</h4>
                                            <p className="text-xs text-slate-500 font-semibold uppercase">{appt.specialty}</p>
                                        </div>
                                        <StatusBadge status={appt.status} />
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarIcon size={14} />
                                            {appt.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            {appt.time}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column - Doctor Cards & Calendar Preview */}
            <div className="space-y-8">
                {/* Calendar Card Preview */}
                <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-900/10 relative overflow-hidden">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-6">Calendar Preview</h3>
                        <div className="grid grid-cols-7 gap-2 mb-6">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-[10px] font-bold text-emerald-400 text-center">{d}</div>)}
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div key={i} className={`h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${(i + 1) === 24 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' :
                                    [10, 15, 22].includes(i + 1) ? 'text-emerald-300 bg-emerald-900/50' :
                                        'text-emerald-100/40 hover:bg-emerald-900'
                                    }`}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl h-12 shadow-lg shadow-emerald-500/20">
                            Schedule New Slot
                        </Button>
                    </div>
                </div>

                {/* Top Doctors Mini Grid */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 px-2 flex justify-between items-center">
                        Suggested Doctors
                        <span className="text-emerald-500 text-xs cursor-pointer hover:underline">View All</span>
                    </h3>
                    {doctors.map((doctor, idx) => (
                        <motion.div
                            key={doctor.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                    <User size={24} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-sm">{doctor.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">{doctor.specialty}</p>
                                        {doctor.available && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        )}
                                    </div>
                                </div>
                                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
