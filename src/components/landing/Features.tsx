
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, FileHeart, LucideIcon, ArrowRight, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay: number;
    highlight?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, highlight }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className={`relative p-8 rounded-3xl backdrop-blur-md border hover:-translate-y-2 transition-transform duration-300 group overflow-hidden
        ${highlight
                    ? 'bg-primary-900/10 border-primary-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
        >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
        ${highlight ? 'bg-primary-500 text-black' : 'bg-gray-800 text-white group-hover:bg-primary-500 group-hover:text-black'}`}>
                <Icon className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed mb-8">{description}</p>

            <div className="flex items-center text-sm font-semibold text-primary-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
            </div>
        </motion.div>
    );
};

export default function Features() {
    const features = [
        {
            icon: Clock,
            title: 'Real-Time Booking',
            description: 'See live availability for thousands of specialists. Book instantly without confirmation delays.',
            highlight: true
        },
        {
            icon: ShieldCheck,
            title: 'HIPAA Verified',
            description: 'Bank-grade encryption for your medical records. Your privacy is non-negotiable.',
        },
        {
            icon: Zap,
            title: 'AI Diagnostics',
            description: 'Preliminary symptom checks powered by advanced AI to guide you to the right specialist faster.',
        },
    ];

    return (
        <section className="py-24 bg-[#020617] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-secondary/10 to-transparent pointer-events-none blur-3xl" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary-500 font-semibold tracking-wide uppercase text-sm mb-4 block"
                        >
                            Why Choose MediSlot?
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-600">Smart Healthcare</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 h-auto text-base">
                            Explore Platform
                        </Button>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={idx * 0.2}
                            highlight={feature.highlight}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
