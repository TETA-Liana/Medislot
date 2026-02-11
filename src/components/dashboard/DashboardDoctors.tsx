'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Star,
    MapPin,
    User,
    ArrowRight,
    Heart,
    Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardDoctors({ doctors, onOpenDetails, onOpenBooking }: {
    doctors: any[],
    onOpenDetails: (doc: any) => void,
    onOpenBooking: (doc: any) => void
}) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-emerald-950 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-900/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -tr-20" />
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl font-black mb-3">Find Expert Care</h2>
                    <p className="text-emerald-100/70 text-sm leading-relaxed">
                        Connect with top-rated medical professionals in your area.
                        Same-day appointments available for critical slots.
                    </p>
                </div>
                <div className="relative w-full lg:w-96 z-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 pl-12 pr-6 bg-emerald-900/50 border border-emerald-800 rounded-2xl text-white placeholder-emerald-400 focus:ring-emerald-500 focus:ring-2 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredDoctors.map((doc, idx) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group relative overflow-hidden"
                    >
                        <button className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors">
                            <Heart size={20} />
                        </button>

                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner relative">
                                <User size={40} />
                                {doc.available && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white animate-pulse" />
                                )}
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{doc.name}</h4>
                                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mt-1">
                                    <Stethoscope size={14} />
                                    {doc.specialty}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                <MapPin size={16} className="text-slate-300" />
                                {doc.hospital}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                <div className="flex text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                </div>
                                <span className="font-bold text-slate-900">{doc.rating}</span>
                                <span className="text-slate-300">(124 Patients)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="h-12 rounded-xl border-slate-200 font-bold text-slate-600 text-sm"
                                onClick={() => onOpenDetails(doc)}
                            >
                                Profile
                            </Button>
                            <Button
                                className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all"
                                onClick={() => onOpenBooking(doc)}
                            >
                                Book Now
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-6">
                        <User size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No doctors matched your search</h3>
                    <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
                </div>
            )}
        </div>
    );
}
