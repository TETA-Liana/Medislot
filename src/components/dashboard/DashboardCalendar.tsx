'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    Plus,
    MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardCalendar() {
    const [currentMonth, setCurrentMonth] = useState('October 2024');

    // Abstract calendar data
    const days = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        events: [10, 15, 24].includes(i + 1) ? [{ title: 'Checkup', type: 'Primary' }] : []
    }));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Platform Calendar</h2>
                    <p className="text-slate-500 text-sm">Synchronize your appointments and available slots.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-500 hover:text-emerald-600"><ChevronLeft size={20} /></button>
                        <span className="px-4 text-sm font-black text-slate-800">{currentMonth}</span>
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-500 hover:text-emerald-600"><ChevronRight size={20} /></button>
                    </div>
                    <Button className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all">
                        <Plus size={18} />
                        Add New
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] p-4 lg:p-10 border border-slate-200 shadow-sm overflow-hidden">
                {/* Week Header */}
                <div className="grid grid-cols-7 mb-6 border-b border-slate-100 pb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{day}</div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-3xl border border-slate-100 overflow-hidden">
                    {/* Empty Slots for padding if month starts on different day - omitted for brevity */}
                    {days.map((item) => (
                        <div key={item.day} className="min-h-[140px] bg-white p-4 hover:bg-slate-50 transition-all group flex flex-col gap-3 relative">
                            <span className={`text-sm font-black ${item.day === 24 ? 'text-emerald-600' : 'text-slate-400'} group-hover:text-slate-900 transition-colors`}>
                                {item.day < 10 ? `0${item.day}` : item.day}
                            </span>

                            {item.events.map((event, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-col gap-1 cursor-pointer hover:bg-emerald-100 transition-all"
                                >
                                    <span className="text-[10px] font-black text-emerald-700 uppercase">{event.title}</span>
                                    <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-600">
                                        <Clock size={8} /> 10:30 AM
                                    </div>
                                </motion.div>
                            ))}

                            {item.day === 24 && (
                                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
