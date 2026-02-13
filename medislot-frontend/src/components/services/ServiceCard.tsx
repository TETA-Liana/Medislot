'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

interface ServiceCardProps {
    service: {
        id: number;
        title: string;
        description: string;
        icon: LucideIcon;
        color: string;
        features: string[];
    };
    delay: number;
}

export default function ServiceCard({ service, delay }: ServiceCardProps) {
    const Icon = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative h-full bg-[#0a1628]/60 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8 overflow-hidden hover:border-sky-500/50 transition-all duration-300 shadow-2xl flex flex-col"
        >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Icon Container */}
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-sky-400 group-hover:text-sky-300 transition-colors" />
                </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors">
                {service.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
            </p>

            {/* List of features */}
            <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500/50 group-hover:bg-sky-400 flex-shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>

            {/* Link Footer */}
            <div className="pt-6 border-t border-slate-700/50 group-hover:border-sky-500/30 transition-colors">
                <button className="flex items-center gap-2 text-sm font-bold text-sky-400 group-hover:text-sky-300 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Top Right Decoration */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-5 h-5 text-sky-500/30" />
            </div>
        </motion.div>
    );
}
