'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Calendar,
    Clock,
    User,
    CreditCard,
    ShieldCheck,
    CheckCircle2,
    Search,
    ChevronRight,
    Stethoscope
} from 'lucide-react';
import { Button } from '../ui/Button';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedDoctor?: any;
    doctors: any[];
}

export default function BookingModal({ isOpen, onClose, preSelectedDoctor, doctors }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(preSelectedDoctor || null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsConfirmed(true);
        }, 2000);
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-[#f8fafc] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-8 pb-4 flex justify-between items-center bg-white border-b border-slate-100">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {isConfirmed ? 'Booking Confirmed' : 'Schedule Appointment'}
                            </h3>
                            {!isConfirmed && (
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Step {step} of 3</p>
                            )}
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8">
                        {!isConfirmed ? (
                            <>
                                {/* Progress Bar */}
                                <div className="flex gap-2 mb-10">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                    ))}
                                </div>

                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                        <h4 className="text-lg font-black text-slate-800 mb-6">Select Primary Specialist</h4>
                                        <div className="space-y-3">
                                            {doctors.map(doc => (
                                                <button
                                                    key={doc.id}
                                                    onClick={() => { setSelectedDoctor(doc); nextStep(); }}
                                                    className={`w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all group ${selectedDoctor?.id === doc.id ? 'border-emerald-500 bg-emerald-50' : 'border-white bg-white hover:border-emerald-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedDoctor?.id === doc.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                                                            }`}>
                                                            <User size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-800 text-sm">{doc.name}</p>
                                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{doc.specialty}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className={`text-slate-300 transition-transform ${selectedDoctor?.id === doc.id ? 'translate-x-1 text-emerald-500' : 'group-hover:translate-x-1'}`} size={18} />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                        <div>
                                            <h4 className="text-lg font-black text-slate-800 mb-6">Choose Date</h4>
                                            <div className="grid grid-cols-4 gap-3">
                                                {['Today', 'Tomorrow', 'Oct 26', 'Oct 27'].map(d => (
                                                    <button
                                                        key={d}
                                                        onClick={() => setSelectedDate(d)}
                                                        className={`py-4 rounded-2xl border-2 font-black text-xs transition-all ${selectedDate === d ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-white bg-white text-slate-500 hover:border-emerald-200'
                                                            }`}
                                                    >
                                                        {d}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-slate-800 mb-6">Select Time Slot</h4>
                                            <div className="grid grid-cols-3 gap-3">
                                                {['09:00 AM', '11:30 AM', '02:00 PM', '04:45 PM', '06:00 PM'].map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => setSelectedTime(t)}
                                                        className={`py-4 rounded-2xl border-2 font-black text-xs transition-all ${selectedTime === t ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-white bg-white text-slate-500 hover:border-emerald-200'
                                                            }`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-inner">
                                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Summary</h4>
                                            <div className="space-y-6 text-slate-800">
                                                <div className="flex justify-between items-center group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                                            <Stethoscope size={20} />
                                                        </div>
                                                        <span className="font-bold">Medical Expert</span>
                                                    </div>
                                                    <span className="font-black text-emerald-600 px-4 py-1.5 bg-emerald-50 rounded-lg">{selectedDoctor?.name}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                                            <Calendar size={20} />
                                                        </div>
                                                        <span className="font-bold">Scheduled Day</span>
                                                    </div>
                                                    <span className="font-black">{selectedDate}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                                            <Clock size={20} />
                                                        </div>
                                                        <span className="font-bold">Start Time</span>
                                                    </div>
                                                    <span className="font-black">{selectedTime}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                                            <ShieldCheck className="text-amber-600 mt-1" size={24} />
                                            <div>
                                                <p className="font-black text-amber-800 text-xs uppercase tracking-widest mb-1">Secure Check</p>
                                                <p className="text-amber-700/70 text-xs font-medium leading-relaxed">By confirming, you agree to our 24h cancellation policy. Payment will be processed at the clinic.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                                    <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 mb-4">You're all set!</h3>
                                <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                                    Your appointment with **{selectedDoctor?.name}** on **{selectedDate}** at **{selectedTime}** has been successfully booked.
                                </p>
                                <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest" onClick={onClose}>Done</Button>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    {!isConfirmed && (
                        <div className="p-8 bg-white border-t border-slate-100 flex gap-4">
                            {step > 1 && (
                                <Button variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-black text-xs uppercase tracking-[0.2em]" onClick={prevStep}>Back</Button>
                            )}
                            {step < 3 ? (
                                <Button
                                    className="flex-[2] h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                                    onClick={nextStep}
                                    disabled={step === 1 && !selectedDoctor || step === 2 && (!selectedDate || !selectedTime)}
                                >
                                    Continue
                                </Button>
                            ) : (
                                <Button
                                    className="flex-[2] h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
                                    onClick={handleConfirm}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Processing...' : 'Confirm Booking'}
                                </Button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
