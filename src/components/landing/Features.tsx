'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, TrendingUp, LucideIcon, Sparkles } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay: number;
    color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay, color }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative p-8 rounded-3xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 group overflow-hidden h-full flex flex-col"
        >
            {/* Gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-3xl`} />

            {/* Animated border glow */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} blur-xl -z-10`} />

            {/* Icon */}
            <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-sky-400 group-hover:text-sky-300 transition-colors" />
                </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sky-300 transition-colors">
                {title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm mb-auto group-hover:text-slate-300 transition-colors">
                {description}
            </p>

            {/* Decorative element */}
            <div className="mt-6 pt-4 border-t border-slate-700/50 group-hover:border-sky-500/30 transition-colors">
                <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-sky-400 transition-colors">
                    <Sparkles className="w-3 h-3" />
                    <span className="font-medium">Learn more</span>
                </div>
            </div>
        </motion.div>
    );
};

export default function Features() {
    const features = [
        {
            icon: Clock,
            title: 'Instant Scheduling',
            description: 'Algorithmically matched slots based on urgency and specialist availability. Book in seconds, not hours.',
            color: 'from-sky-500 to-blue-600'
        },
        {
            icon: ShieldCheck,
            title: 'Encrypted Records',
            description: 'Your data is protected with military-grade encryption and distributed storage for maximum security.',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: TrendingUp,
            title: 'Health Analytics',
            description: 'Visualize your wellness journey with AI-powered insights and personalized health trend predictions.',
            color: 'from-cyan-500 to-blue-500'
        },
    ];

    return (
        <section className="py-24 bg-[#0a1628] relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />

            {/* Animated lines */}
            <svg className="absolute top-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
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

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Our Features</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        Built for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                            Your Peace of Mind
                        </span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg">
                        Experience healthcare technology that puts you first
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {features.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={idx * 0.2}
                            color={feature.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
