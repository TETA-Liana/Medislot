
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, FileHeart, LucideIcon, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
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
            whileHover={{ y: -5 }}
            className={`relative p-8 rounded-[2rem] border transition-all duration-300 group overflow-hidden h-full flex flex-col items-start
        ${highlight
                    ? 'bg-gradient-to-br from-primary-900/20 to-black border-primary-500/30 ring-1 ring-primary-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
        >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Decorative Corner Line */}
            <svg className="absolute top-0 right-0 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" viewBox="0 0 100 100">
                <path d="M0 0 C 50 0 100 50 100 100 V 0 H 0 Z" fill="currentColor" className="text-primary-500" />
            </svg>

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 shadow-xl
        ${highlight ? 'bg-primary-500 text-black shadow-primary-500/20' : 'bg-gray-800 text-gray-400 group-hover:bg-white group-hover:text-black'}`}>
                <Icon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed mb-auto text-base">{description}</p>

            <div className="w-full h-px bg-white/10 my-6 group-hover:bg-primary-500/50 transition-colors" />

            <div className="flex items-center text-sm font-bold text-gray-500 group-hover:text-white transition-colors cursor-pointer w-full justify-between">
                <span className="group-hover:translate-x-1 transition-transform">Learn more</span>
                <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary-400" />
            </div>
        </motion.div>
    );
};

export default function Features() {
    const features = [
        {
            icon: Clock,
            title: 'Instant Scheduling',
            description: 'Algorithmically matched slots based on urgency and specialist availability. No back-and-forth.',
            highlight: true
        },
        {
            icon: ShieldCheck,
            title: 'Encrypted Records',
            description: 'Your data is fragmented and stored with military-grade encryption standards.',
        },
        {
            icon: TrendingUp,
            title: 'Health Analytics',
            description: 'Visualize your wellness journey with AI-generated insights and trend predictions.',
        },
    ];

    return (
        <section className="py-32 bg-[#020617] relative overflow-hidden">

            {/* Background Curved Lines Pattern - Matching the 'Creative' Request */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    <motion.path
                        d="M-200 600 Q 400 300 1600 800"
                        stroke="url(#gradFeature)"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <motion.path
                        d="M-200 500 Q 500 200 1600 700"
                        stroke="url(#gradFeature)"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.2, ease: "easeOut", delay: 0.2 }}
                    />
                    <defs>
                        <linearGradient id="gradFeature" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <div className="w-12 h-1 bg-primary-500 rounded-full"></div>
                            <span className="text-white font-bold tracking-widest text-sm uppercase">Why MediSlot?</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                        >
                            engineered for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Peace of Mind.</span>
                        </motion.h2>
                    </div>

                    {/* 
               Action Button - Made Solid Primary Color to be Always Visible as requested.
               "White and is only visible when hovered on stop making it white and let it keep being visible"
               -> Changed to standard Primary filled button or distinct Outline that is very visible.
               Going with White Solid for high contrast against dark bg.
            */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-10 py-7 h-auto text-lg font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-none">
                            Explore Platform
                        </Button>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
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
