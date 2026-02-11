'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Calendar,
    ShieldCheck,
    Bell,
    Smartphone,
    Activity,
    ArrowRight
} from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Instant Consultations',
        desc: 'Connect with a specialist in under 15 minutes through our express matching system.',
        color: 'bg-emerald-500',
    },
    {
        icon: Calendar,
        title: 'Intelligent Booking',
        desc: 'Advanced calendar logic prevents overlap and respects doctor’s real-time availability.',
        color: 'bg-teal-500',
    },
    {
        icon: ShieldCheck,
        title: 'Privacy Guaranteed',
        desc: 'End-to-end encrypted medical history and secure HIPAA-compliant communication.',
        color: 'bg-emerald-600',
    },
    {
        icon: Bell,
        title: 'Smart Reminders',
        desc: 'Automated SMS and app notifications so you Never miss an appointment or vital check.',
        color: 'bg-emerald-400',
    },
    {
        icon: Activity,
        title: 'Health Insight Hub',
        desc: 'Track your vital health metrics and receive AI-generated insights after every visit.',
        color: 'bg-teal-600',
    },
    {
        icon: Smartphone,
        title: 'Mobile Access',
        desc: 'Manage your entire family\'s health journey from a single, easy-to-use mobile dashboard.',
        color: 'bg-emerald-500',
    },
];

export default function Features() {
    return (
        <section id="schedule" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background decorative dots */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-teal-500/5 blur-[100px] rounded-full" />

            {/* Animated Line SVGs */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
                <svg className="w-full h-full" viewBox="0 0 1440 600">
                    <motion.path
                        d="M1540 100 Q 720 600 -100 100"
                        stroke="#10b981"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M1540 250 Q 720 750 -100 250"
                        stroke="#059669"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 mb-6"
                        >
                            <Activity className="w-4 h-4 text-emerald-600" />
                            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest">Platform Capabilities</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]"
                        >
                            Powerful features for <br />
                            <span className="text-emerald-500">seamless healthcare.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed"
                    >
                        Every tool in MediSlot is built to reduce friction between patients and providers,
                        ensuring that care is always only a few clicks away.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative h-full bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Icon Container */}
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                {feature.desc}
                            </p>

                            <button className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 tracking-widest group-hover:gap-4 transition-all">
                                <span>Learn More</span>
                                <ArrowRight size={14} />
                            </button>

                            {/* Decorative element for card */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
