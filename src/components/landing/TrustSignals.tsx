
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Heart, Award, Command, Zap } from 'lucide-react';

const brands = [
    { name: 'Mayo Clinic', icon: Shield },
    { name: 'Johns Hopkins', icon: Activity },
    { name: 'Cleveland Clinic', icon: Heart },
    { name: 'Healthgrades', icon: Award },
    { name: 'Mount Sinai', icon: Command },
    { name: 'WebMD', icon: Zap },
];

export default function TrustSignals() {
    return (
        <section className="py-20 bg-[#020617] border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] z-10 pointer-events-none" />

            {/* Background Organic Line */}
            <svg className="absolute top-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1440 300" preserveAspectRatio="none">
                <motion.path
                    d="M-100,100 C 400,200 800,0 1600,100"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary-500"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                />
            </svg>

            <div className="container mx-auto px-6 mb-12 text-center relative z-20">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center justify-center gap-4">
                    <span className="w-8 h-px bg-gray-700"></span>
                    Trusted by Industry Leaders
                    <span className="w-8 h-px bg-gray-700"></span>
                </p>
            </div>

            <div className="flex overflow-hidden relative z-0">
                <motion.div
                    className="flex gap-20 min-w-full items-center justify-around px-8"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    {/* Tripled array for seamless infinite scroll */}
                    {[...brands, ...brands, ...brands].map((brand, idx) => {
                        const Icon = brand.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-all duration-300 group cursor-pointer flex-shrink-0 grayscale hover:grayscale-0"
                            >
                                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary-500/10 transition-colors">
                                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-all" />
                                </div>
                                <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors tracking-tight">{brand.name}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
