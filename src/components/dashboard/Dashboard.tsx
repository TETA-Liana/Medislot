'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    Clock,
    LayoutDashboard,
    Users,
    Settings,
    Bell,
    Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import DashboardOverview from './DashboardOverview';
import DashboardAppointments from './DashboardAppointments';
import DashboardDoctors from './DashboardDoctors';
import DashboardCalendar from './DashboardCalendar';
import DashboardProfile from './DashboardProfile';
import BookingModal from './BookingModal';
import DoctorDetailsModal from './DoctorDetailsModal';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

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
        { id: 4, name: 'Dr. Michael Chen', specialty: 'Dermatology', hospital: 'Legacy Medical', rating: 4.7, available: true },
        { id: 5, name: 'Dr. Robert Fox', specialty: 'General Practice', hospital: 'Sunset Health', rating: 4.9, available: true },
        { id: 6, name: 'Dr. Leslie Alexander', specialty: 'Dentistry', hospital: 'Smile Care', rating: 4.8, available: true },
    ];

    const handleOpenBooking = (doctor: any = null) => {
        setSelectedDoctor(doctor);
        setIsBookingOpen(true);
    };

    const handleOpenDetails = (doctor: any) => {
        setSelectedDoctor(doctor);
        setIsDetailsOpen(true);
    };

    return (
        <div className="pt-0 min-h-screen bg-slate-50 flex">
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                doctors={doctors}
                preSelectedDoctor={selectedDoctor}
            />
            <DoctorDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                doctor={selectedDoctor}
                onBook={(doc) => {
                    setIsDetailsOpen(false);
                    handleOpenBooking(doc);
                }}
            />

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-8 gap-10 fixed h-full z-10 selection:bg-emerald-500/30">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-600/20">M</div>
                    <span className="text-2xl font-black text-slate-800 tracking-tighter">MediSlot</span>
                </div>

                <nav className="flex flex-col gap-3">
                    {[
                        { name: 'Overview', icon: LayoutDashboard },
                        { name: 'Appointments', icon: Clock },
                        { name: 'Doctors', icon: Users },
                        { name: 'Calendar', icon: CalendarIcon },
                        { name: 'Profile', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black tracking-tight transition-all ${activeTab === item.name
                                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20'
                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 group'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.name ? 'text-white' : 'group-hover:text-emerald-500 transition-colors'} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto bg-emerald-50 rounded-[2rem] p-6 text-emerald-900 relative overflow-hidden group border border-emerald-100">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <h4 className="font-black text-sm mb-2 relative z-10">Care Pro Plan</h4>
                    <p className="text-[10px] text-emerald-600/70 mb-5 relative z-10 font-bold uppercase tracking-widest leading-relaxed">Unlimited history & smart insights.</p>
                    <Button className="w-full h-10 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl relative z-10 border-0 shadow-lg shadow-emerald-500/20" onClick={() => handleOpenBooking()}>Upgrade</Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-6 md:p-12 pb-20">
                {/* Top bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-3xl font-black text-slate-900 mb-1">{activeTab}</h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Dashboard • Home • {activeTab}</p>
                    </motion.div>
                    <div className="flex items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Global search..."
                                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-emerald-500/10 focus:ring-4 focus:border-emerald-500 outline-none transition-all w-72 shadow-sm"
                            />
                        </div>
                        <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all relative group">
                            <Bell size={22} className="group-hover:animate-bounce" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-white shadow-lg overflow-hidden flex items-center justify-center text-emerald-600 font-black cursor-pointer hover:scale-105 transition-transform">S</div>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                    {activeTab === 'Overview' && (
                        <DashboardOverview
                            appointments={appointments}
                            doctors={doctors}
                            onOpenBooking={handleOpenBooking}
                            onOpenDetails={handleOpenDetails}
                        />
                    )}
                    {activeTab === 'Appointments' && (
                        <DashboardAppointments
                            appointments={appointments}
                            onOpenBooking={handleOpenBooking}
                        />
                    )}
                    {activeTab === 'Doctors' && (
                        <DashboardDoctors
                            doctors={doctors}
                            onOpenDetails={handleOpenDetails}
                            onOpenBooking={handleOpenBooking}
                        />
                    )}
                    {activeTab === 'Calendar' && (
                        <DashboardCalendar
                            onOpenBooking={handleOpenBooking}
                        />
                    )}
                    {activeTab === 'Profile' && <DashboardProfile />}
                </div>
            </main>
        </div>
    );
}
