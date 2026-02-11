'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    MoreVertical,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Plus,
    Search,
    Filter,
    LayoutDashboard,
    Users,
    Settings,
    Bell
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Status Badge Component
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

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('Overview');

    const appointments = [
        { id: 1, doctor: 'Dr. Sarah Mitchell', specialty: 'Cardiologist', time: '10:30 AM', date: 'Oct 24, 2024', status: 'Upcoming' },
        { id: 2, doctor: 'Dr. James Wilson', specialty: 'Neurologist', time: '02:00 PM', date: 'Oct 22, 2024', status: 'Completed' },
        { id: 3, doctor: 'Dr. Elena Rodriguez', specialty: 'Pediatrician', time: '09:15 AM', date: 'Oct 20, 2024', status: 'Cancelled' },
        { id: 4, doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', time: '11:45 AM', date: 'Oct 28, 2024', status: 'Pending' },
    ];

    const doctors = [
        { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Cardiology', hospital: 'Kigali Heights', rating: 4.9, available: true },
        { id: 2, name: 'Dr. James Wilson', specialty: 'Neurology', hospital: 'Downtown Clinic', rating: 4.8, available: false },
        { id: 3, name: 'Dr. Elena Rodriguez', specialty: 'Pediatrics', hospital: 'Unity Hospital', rating: 5.0, available: true },
    ];

    return (
        <div className="pt-24 min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 gap-8 fixed h-full z-10">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">M</div>
                    <span className="text-xl font-bold text-slate-800">MediSlot</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {['Overview', 'Appointments', 'Doctors', 'Calendar', 'Profile'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                        >
                            {item === 'Overview' && <LayoutDashboard size={18} />}
                            {item === 'Appointments' && <Clock size={18} />}
                            {item === 'Doctors' && <Users size={18} />}
                            {item === 'Calendar' && <CalendarIcon size={18} />}
                            {item === 'Profile' && <Settings size={18} />}
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto bg-emerald-600 rounded-2xl p-5 text-white relative overflow-hidden group">
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <h4 className="font-bold mb-2 relative z-10">Upgrade to Pro</h4>
                    <p className="text-xs text-emerald-100 mb-4 relative z-10 leading-relaxed">Specialized care and unlimited storage.</p>
                    <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 text-xs font-bold py-2 rounded-lg relative z-10">Upgrade</Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-6 md:p-10">
                {/* Top bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Welcome back, Sarah!</h1>
                        <p className="text-slate-500 text-sm">You have 2 appointments scheduled for today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-emerald-500 focus:ring-2 outline-none transition-all w-64 shadow-sm"
                            />
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="w-11 h-11 rounded-full bg-emerald-100 border-2 border-white shadow-md" />
                    </div>
                </div>

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
                                {appointments.map((appt, idx) => (
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
            </main>
        </div>
    );
}
