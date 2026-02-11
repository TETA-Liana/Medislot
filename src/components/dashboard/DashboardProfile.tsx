'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Shield,
    Bell,
    CreditCard,
    ChevronRight,
    Camera,
    LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DashboardProfileProps {
    onLogout: () => void;
    user: any;
}

export default function DashboardProfile({ onLogout, user }: DashboardProfileProps) {
    const fullName = user ? `${user.firstName} ${user.lastName}` : 'User Profile';
    const email = user?.email || 'user@example.com';
    const phone = user?.phone || '+250 000 000 000';

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            {/* Profile Hero */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -tr-20 group-hover:bg-emerald-50 transition-colors" />
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-center md:text-left">
                    <div className="relative group/avatar">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xl shadow-emerald-600/10 border-4 border-white">
                            <User size={64} />
                        </div>
                        <button className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform opacity-0 group-hover/avatar:opacity-100">
                            <Camera size={18} />
                        </button>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">{fullName}</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">Platinum Health Member • Since 2024</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <Button className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/20">Edit Profile</Button>
                            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Manage Privacy</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Categories */}
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    {
                        title: 'Personal Information', items: [
                            { icon: User, label: 'Full Name', value: fullName },
                            { icon: Mail, label: 'Email', value: email },
                            { icon: Phone, label: 'Phone', value: phone }
                        ]
                    },
                    {
                        title: 'Account Security', items: [
                            { icon: Shield, label: 'Two-Factor', value: 'Enabled' },
                            { icon: CreditCard, label: 'Default Payment', value: 'Visa ending 4242' },
                            { icon: Bell, label: 'Notifications', value: 'Push & Email' }
                        ]
                    }
                ].map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm"
                    >
                        <h3 className="text-lg font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">{category.title}</h3>
                        <div className="space-y-6">
                            {category.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-800 tracking-tight">{item.value}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-200 group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-red-900 mb-1">Account Management</h3>
                    <p className="text-red-600/70 text-sm font-medium">Be careful, these actions are permanent and cannot be undone.</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <Button
                        onClick={onLogout}
                        className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/10 transition-all flex items-center justify-center gap-2 border-0"
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
