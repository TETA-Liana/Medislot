'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Heart, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';

export default function AboutUs() {
    const stats = [
        { value: '25K+', label: 'Active Patients' },
        { value: '1.2K', label: 'Verified Doctors' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '24/7', label: 'Instant Booking' },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Patient-First Focus',
            description: 'We prioritize your comfort and time, ensuring every appointment is a positive step toward better health.',
        },
        {
            icon: Award,
            title: 'Elite Medical Network',
            description: 'Only the most qualified and highly-rated specialists are invited to join our premium platform.',
        },
        {
            icon: TrendingUp,
            title: 'Digital Health Innovation',
            description: 'Leveraging smart data to suggest the best doctors and appointment slots based on your location.',
        },
        {
            icon: Sparkles,
            title: 'Absolute Transparency',
            description: 'Know exactly what to expect with upfront profiles, real-time tracking, and no hidden fees.',
        },
    ];

    return (
        <section id="about" className="relative bg-white py-32 overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-900">

            {/* Light Emerald Dots Pattern Background - Matching user's request */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, #10b981 1.5px, transparent 1.5px)`,
                    backgroundSize: '40px 40px',
                    backgroundPosition: '0 0, 20px 20px'
                }} />
            </div>

            {/* Animated Line SVGs requested by user */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1440 600">
                    <motion.path
                        d="M-100 300 Q 720 0 1540 300"
                        stroke="#10b981"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M-100 450 Q 720 750 1540 450"
                        stroke="#059669"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8 shadow-sm"
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">The MediSlot Edge</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1]"
                    >
                        We’re making healthcare <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            effortless and accessible.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto"
                    >
                        MediSlot is more than a booking app. It’s an intelligent platform designed
                        to connect you with elite healthcare providers instantly, securely, and calmly.
                    </motion.p>
                </div>

                {/* Stats Grid - Cleaner White Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 text-center shadow-xl border border-slate-100 hover:border-emerald-300 transition-all hover:-translate-y-2 group"
                        >
                            <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                                {stat.value}
                            </div>
                            <div className="text-xs text-slate-400 font-black uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Values Grid - Refined 2-column layout */}
                <div className="grid md:grid-cols-2 gap-10">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                            className="bg-slate-50/50 rounded-[3rem] p-12 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-2xl transition-all group"
                        >
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-8">
                                <div className="flex-shrink-0 w-20 h-20 rounded-[2rem] bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/10">
                                    <value.icon className="w-10 h-10 text-emerald-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed text-base">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
