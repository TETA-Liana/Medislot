'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Heart, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutUs() {
    const stats = [
        { value: '20K+', label: 'Active Patients' },
        { value: '500+', label: 'Healthcare Providers' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '24/7', label: 'Support Available' },
    ];

    const values = [
        {
            icon: Heart,
            title: 'Patient-Centered Care',
            description: 'Your health and comfort are our top priorities in every interaction.',
        },
        {
            icon: Award,
            title: 'Excellence in Service',
            description: 'We partner with top-rated healthcare professionals across all specialties.',
        },
        {
            icon: TrendingUp,
            title: 'Innovation Driven',
            description: 'Leveraging cutting-edge technology to make healthcare accessible.',
        },
        {
            icon: Sparkles,
            title: 'Transparent Process',
            description: 'Clear pricing, real-time updates, and no hidden surprises.',
        },
    ];

    return (
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-24 overflow-hidden">

            {/* Blue Dots Pattern Background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    backgroundPosition: '0 0, 15px 15px'
                }} />
            </div>

            {/* Decorative Gradient Orbs */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">About Medislot</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight"
                    >
                        Revolutionizing Healthcare{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                            Access
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-slate-600 leading-relaxed"
                    >
                        We're on a mission to make quality healthcare accessible to everyone through intelligent scheduling,
                        real-time availability, and seamless digital experiences.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                            className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all group relative overflow-hidden"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 transition-all group relative overflow-hidden"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <value.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
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
