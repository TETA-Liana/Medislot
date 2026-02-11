
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
        <section className="py-16 bg-[#020617] border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] z-10 pointer-events-none" />

            <div className="container mx-auto px-6 mb-8 text-center relative z-20">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Trusted by Industry Leaders</p>
            </div>

            <div className="flex overflow-hidden relative z-0">
                <motion.div
                    className="flex gap-16 min-w-full items-center justify-around px-8"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...brands, ...brands, ...brands].map((brand, idx) => { // Tripling the array for smooth loop
                        const Icon = brand.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 group cursor-pointer flex-shrink-0"
                            >
                                <Icon className="w-8 h-8 text-gray-400 group-hover:text-primary-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all" />
                                <span className="text-xl font-bold text-gray-300 group-hover:text-white transition-colors">{brand.name}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
