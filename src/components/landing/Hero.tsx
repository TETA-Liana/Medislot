
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Calendar, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-[#020617] flex items-center pt-32 pb-20 overflow-hidden text-white">
            {/* Dynamic Glow Background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"
            />

            {/* Scientific Grid/Lines Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Content Side */}
                <div className="max-w-2xl relative z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium mb-6 backdrop-blur-sm"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        Reimagining Healthcare
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 font-sans tracking-tight"
                    >
                        Health, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-600 relative">
                            Simplified.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed"
                    >
                        Instant bookings. Verified specialists. Zero wait times. Control your health journey with a single click.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button className="h-14 px-8 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-semibold text-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all transform hover:-translate-y-1 border border-primary-500/50 group">
                            Find a Doctor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="ghost" className="h-14 px-8 rounded-full text-white hover:bg-white/5 border border-white/10 hover:border-white/20 text-lg transition-all">
                            View Specialities
                        </Button>
                    </motion.div>

                    {/* Mini Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 flex items-center gap-8 text-sm font-medium text-gray-500"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#020617] flex items-center justify-center text-xs text-white overflow-hidden">
                                        <div className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-800`} />
                                    </div>
                                ))}
                            </div>
                            <span>10k+ Patients</span>
                        </div>
                        <div className="w-px h-4 bg-gray-800"></div>
                        <div className="flex items-center gap-1 text-primary-400">
                            <Star className="w-4 h-4 fill-current" /> <span>4.9/5 Rating</span>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Side - Abstract Interactive Interface */}
                <div className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-1000">
                    {/* Main Floating Card */}
                    <motion.div
                        initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
                        animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative w-[400px] h-[500px] bg-gradient-to-br from-gray-900/90 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10"
                    >
                        {/* Header of Card */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="text-xs font-mono text-gray-500">medislot_system_v1.2</div>
                        </div>

                        {/* Body of Card - Simulated Search/List */}
                        <div className="p-6 space-y-4">
                            {/* Search Bar Simulation */}
                            <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5 flex items-center px-3 gap-3">
                                <Search className="w-4 h-4 text-gray-500" />
                                <div className="w-24 h-1.5 bg-gray-700 rounded-full opacity-50"></div>
                            </div>

                            {/* List Items */}
                            {[1, 2, 3].map((item, idx) => (
                                <motion.div
                                    key={item}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 1 + (idx * 0.2) }}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-primary-500/20 text-primary-400' : 'bg-gray-800 text-gray-500'}`}>
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-20 h-2 bg-gray-700 rounded-full mb-2 group-hover:bg-gray-600 transition-colors"></div>
                                        <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
                                    </div>
                                    {idx === 0 && (
                                        <div className="px-2 py-1 rounded text-xs bg-primary-500/20 text-primary-400 border border-primary-500/20">
                                            Open
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>System Status</span>
                                    <span className="text-primary-400">Operational</span>
                                </div>
                                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-1/2 h-full bg-primary-500 shadow-[0_0_10px_#10b981]"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Elements around Card */}
                    <motion.div
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-12 top-20 bg-[#0f172a] p-4 rounded-2xl border border-white/10 shadow-xl z-20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Next Slot</div>
                                <div className="text-sm font-bold text-white">10:30 AM</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
