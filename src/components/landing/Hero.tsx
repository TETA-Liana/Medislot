
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, Star, ShieldCheck, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-[#020617] flex items-center pt-32 pb-20 overflow-hidden text-white selection:bg-primary-500 selection:text-black">

            {/* 1. Dynamic Organic Background Lines (The "Creative/Non-AI" touch) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute w-full h-full opacity-30" viewBox="0 0 1440 900" preserveAspectRatio="none">
                    <motion.path
                        d="M-100,600 C200,400 600,800 1600,200"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M-100,800 C300,500 800,900 1600,400"
                        stroke="url(#grad2)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                    />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0f766e" stopOpacity="0" />
                            <stop offset="50%" stopColor="#0f766e" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* 2. Ambient Glow Orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Content Side */}
                <div className="max-w-2xl relative z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:bg-white/10 transition-colors"
                    >
                        <Activity className="w-4 h-4 text-primary-500 animate-pulse" />
                        <span className="tracking-wide">Next-Gen Healthcare OS</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 font-sans tracking-tight"
                    >
                        Health, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-emerald-300 to-teal-500 relative">
                            Reimagined.
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed mix-blend-plus-lighter"
                    >
                        Orchestrate your entire medical journey from a single dashboard. Bookings, records, and prescriptions—synced in real-time.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Button className="h-16 px-10 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all transform hover:-translate-y-1 border border-primary-500/50 group relative overflow-hidden">
                            <span className="relative z-10 flex items-center">Find a Doctor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </Button>
                        <Button variant="outline" className="h-16 px-10 rounded-full text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-500/50 text-lg transition-all backdrop-blur-sm">
                            Explore Specialties
                        </Button>
                    </motion.div>

                    {/* Trust/Stats Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="mt-16 flex items-center gap-10 text-sm font-medium text-gray-500 border-t border-white/5 pt-8"
                    >
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:border-primary-500 transition-colors">
                                <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-primary-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">HIPAA</div>
                                <div className="text-xs">Compliant</div>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-gray-800"></div>
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center group-hover:bg-yellow-500/20 group-hover:border-yellow-500 transition-colors">
                                <Star className="w-5 h-5 text-gray-400 group-hover:text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">4.9/5</div>
                                <div className="text-xs">User Rating</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Side - Enhanced Glass Interface */}
                <div className="relative h-[650px] w-full hidden lg:flex items-center justify-center perspective-1000">

                    {/* Background Circle Scan */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-[500px] h-[500px] border border-white/5 rounded-full border-dashed"
                        />
                    </div>

                    {/* Main Floating Card */}
                    <motion.div
                        initial={{ rotateX: 20, rotateY: -20, opacity: 0, scale: 0.9 }}
                        animate={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                        className="relative w-[420px] bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden z-20 group"
                    >
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />

                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">System Status</div>
                                    <div className="text-xs text-primary-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                                        Online
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-gray-400">
                                v2.4.0
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            {/* Simulated Appointment Slot */}
                            <div className="space-y-3">
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Upcoming</div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-primary-500/50 transition-colors cursor-pointer group/card">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                                            <div>
                                                <div className="text-white font-bold group-hover/card:text-primary-400 transition-colors">Dr. Sarah Jen</div>
                                                <div className="text-xs text-gray-400">Cardiologist</div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">10:00 AM</div>
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "30%" }}
                                            whileInView={{ width: "75%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-primary-500"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-medium">
                                        <span>Wait time</span>
                                        <span className="text-primary-400">~2 mins</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center hover:bg-white/10 transition-colors">
                                    <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">98%</div>
                                    <div className="text-xs text-gray-500">Efficiency</div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center hover:bg-white/10 transition-colors">
                                    <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">100%</div>
                                    <div className="text-xs text-gray-500">Secure</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action */}
                        <div className="p-4 bg-black/40 border-t border-white/5">
                            <Button className="w-full bg-primary-600 hover:bg-primary-500 text-white rounded-xl py-6 h-auto text-sm font-semibold shadow-lg shadow-primary-900/20">
                                View Full Dashboard
                            </Button>
                        </div>
                    </motion.div>

                    {/* Floating Notifications */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-0 bg-gray-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl z-30 max-w-[200px]"
                    >
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Appointment</div>
                                <div className="text-sm font-bold text-white leading-tight">Confirmed</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
