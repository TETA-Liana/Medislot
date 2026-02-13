'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ArrowRight, CheckCircle2, Heart, Users, Activity } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
    onBook?: () => void;
}

export default function Hero({ onBook }: HeroProps) {
    return (
        <section className="relative min-h-screen bg-[#f8fafc] overflow-hidden flex items-center pt-24 pb-20 selection:bg-emerald-500/30 selection:text-emerald-900">
            {/* Background Decorative Blobs - matching the image's soft lighting */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] bg-teal-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col items-start gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest">Trust & Care First</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight"
                        >
                            <span className="text-emerald-600">Take care</span> Of your <br />
                            body and it will <br />
                            <span className="relative inline-block">
                                take care of you.
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 h-2 bg-emerald-500/20 rounded-full"
                                />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed"
                        >
                            Talk with a doctor using our highly secured, HIPAA compliant platform.
                            Seamless end-to-end encrypted scheduling at your fingertips.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Button
                                onClick={onBook}
                                className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-1 group"
                            >
                                Get Appointment
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-14 px-8 rounded-2xl border-2 border-slate-200 bg-white text-slate-800 font-bold text-base hover:bg-slate-50 hover:border-emerald-500/50 transition-all"
                            >
                                Get Ready
                            </Button>
                        </motion.div>

                        {/* Social Proof Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="flex items-center gap-8 pt-8 border-t border-slate-100 w-full"
                        >
                            {[
                                { label: 'Active Patients', val: '25K+', icon: Users },
                                { label: 'Verified Doctors', val: '1.2K', icon: Heart },
                                { label: 'Satisfaction', val: '98%', icon: CheckCircle2 }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <stat.icon size={16} />
                                        <span className="text-lg font-black text-slate-800 tracking-tight">{stat.val}</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Visuals - Image Based on the Reference */}
                    <div className="relative h-[650px] hidden lg:flex items-center justify-center">
                        {/* Decorative Background Circles like in the image */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[550px] h-[550px] border border-dashed border-emerald-200 rounded-full"
                        />
                        <div className="absolute w-[450px] h-[450px] bg-emerald-50 rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                            {/* Abstract Dot Grid like in the image */}
                            <div className="absolute top-10 right-10 grid grid-cols-4 gap-2 opacity-20">
                                {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-emerald-500" />
                                ))}
                            </div>

                            {/* Animated Teal Path from the image */}
                            <motion.svg
                                className="absolute inset-0 w-full h-full opacity-40"
                                viewBox="0 0 400 400"
                            >
                                <motion.circle
                                    cx="200" cy="200" r="180"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.svg>
                        </div>

                        {/* Floating Interaction Cards */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-0 z-20 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-emerald-100 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                <Activity size={24} />
                            </div>
                            <div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase">Real-time Analysis</div>
                                <div className="text-xs font-bold text-slate-800">145+ Critical Slots</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 left-0 z-20 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-emerald-100 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold underline">
                                4.9
                            </div>
                            <div>
                                <div className="text-[9px] text-slate-400 font-bold uppercase">Average Rating</div>
                                <div className="text-xs font-bold text-slate-800">Trusted by Users</div>
                            </div>
                        </motion.div>

                        <div className="relative z-10 scale-110">
                            {/* Inner circle for doctors */}
                            <div className="w-[380px] h-[380px] rounded-full bg-gradient-to-br from-white to-emerald-50 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                                {/* Doctor Image sized to fit nested within the design */}
                                <div className="w-[85%] h-[85%] rounded-full bg-[url('/doctors/doc.jpg')] bg-cover bg-top shadow-lg border-2 border-white/50 relative z-10" />

                                {/* Light overlay for blending */}
                                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
