
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
        <section className="py-20 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Trusted by leading healthcare providers</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand, idx) => {
                        const Icon = brand.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.1, color: '#3b82f6' }}
                                className="flex items-center gap-2 group cursor-pointer"
                            >
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <Icon className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <span className="text-xl font-bold text-gray-400 group-hover:text-gray-800 transition-colors hidden md:block">{brand.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
