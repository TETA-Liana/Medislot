'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Star,
    MapPin,
    Clock,
    Calendar,
    Shield,
    MessageSquare,
    Phone,
    Award,
    BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DoctorDetailsModalProps {
    doctor: any;
    isOpen: boolean;
    onClose: () => void;
    onBook: (doctor: any) => void;
}

export default function DoctorDetailsModal({ doctor, isOpen, onClose, onBook }: DoctorDetailsModalProps) {
    if (!doctor) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-slate-800 hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side - Profile Summary */}
                        <div className="md:w-1/3 bg-emerald-950 p-10 text-white flex flex-col items-center text-center relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

                            <div className="relative mb-8">
                                <div className="w-32 h-32 rounded-[2.5rem] bg-emerald-800 border-4 border-emerald-900/50 flex items-center justify-center shadow-2xl">
                                    <BookOpen size={64} className="text-emerald-400" />
                                </div>
                                {doctor.available && (
                                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-green-500 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Available</div>
                                )}
                            </div>

                            <h3 className="text-2xl font-black mb-2">{doctor.name}</h3>
                            <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs mb-6">{doctor.specialty}</p>

                            <div className="flex items-center gap-2 mb-8 bg-emerald-900/50 px-4 py-2 rounded-xl border border-emerald-800">
                                <Star size={16} fill="#fbbf24" className="text-yellow-400" />
                                <span className="font-black text-sm">{doctor.rating}</span>
                                <span className="text-emerald-100/40 text-xs">(124 Reviews)</span>
                            </div>

                            <div className="w-full space-y-3">
                                <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold" onClick={() => onBook(doctor)}>Book Appointment</Button>
                                <Button variant="outline" className="w-full h-12 rounded-xl border-emerald-800 text-emerald-400 hover:bg-emerald-900 font-bold flex items-center justify-center gap-2">
                                    <MessageSquare size={18} />
                                    Send Message
                                </Button>
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="flex-1 p-10 overflow-y-auto bg-slate-50">
                            <div className="space-y-10">
                                {/* About Section */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-4">
                                        <Shield size={16} />
                                        Biography
                                    </h4>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                        {doctor.name} is a board-certified {doctor.specialty} with over 15 years of experience in specialized healthcare.
                                        Practicing at {doctor.hospital}, they have pioneered several patient-centric approaches
                                        and are known for their commitment to medical excellence and compassionate care.
                                    </p>
                                </div>

                                {/* Qualifications */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
                                        <Award size={20} className="text-emerald-600 mb-3" />
                                        <h5 className="font-bold text-slate-800 text-sm mb-1">Education</h5>
                                        <p className="text-xs text-slate-500 font-medium">Harvard Medical School</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
                                        <MapPin size={20} className="text-emerald-600 mb-3" />
                                        <h5 className="font-bold text-slate-800 text-sm mb-1">Clinic</h5>
                                        <p className="text-xs text-slate-500 font-medium">{doctor.hospital}</p>
                                    </div>
                                </div>

                                {/* Availability Slots */}
                                <div>
                                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-600 mb-6">
                                        <Clock size={16} />
                                        Available Slots
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {['09:00 AM', '10:30 AM', '02:00 PM', '04:15 PM'].map(time => (
                                            <button key={time} className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-xs font-black text-slate-600 shadow-sm hover:border-emerald-500 hover:text-emerald-600 hover:shadow-emerald-500/10 transition-all active:scale-95">
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Contact */}
                                <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Emergency Line</p>
                                            <p className="text-sm font-black text-slate-800">+250 123 456</p>
                                        </div>
                                    </div>
                                    <Button className="h-10 px-6 rounded-xl bg-emerald-600 text-white font-bold text-xs">Call Now</Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
