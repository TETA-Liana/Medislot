'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Heart, Award, Sparkles, Zap } from 'lucide-react';

const partners = [
    { name: 'Mayo Clinic', icon: Shield, color: 'from-blue-500 to-cyan-500' },
    { name: 'Johns Hopkins', icon: Activity, color: 'from-sky-500 to-blue-500' },
    { name: 'Cleveland Clinic', icon: Heart, color: 'from-indigo-500 to-blue-500' },
    { name: 'Healthgrades', icon: Award, color: 'from-blue-600 to-sky-400' },
    { name: 'Mount Sinai', icon: Sparkles, color: 'from-cyan-500 to-blue-600' },
    { name: 'WebMD', icon: Zap, color: 'from-sky-400 to-indigo-500' },
];

export default function TrustSignals() {
    return (
        <section className="py-20 bg-[#0a1628] relative overflow-hidden">

            {/* Subtle animated background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Trusted Partners</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Partnered with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                            Industry Leaders
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                        Collaborating with top healthcare institutions to bring you the best care possible
                    </p>
                </motion.div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {partners.map((partner, idx) => {
                        const Icon = partner.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="group relative"
                            >
                                <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                                    {/* Gradient glow on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                                    <div className="relative flex flex-col items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors text-center">
                                            {partner.name}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-center"
                >
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-1">
                            500+
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Healthcare Providers</div>
                    </div>
                    <div className="w-px h-12 bg-slate-700" />
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-1">
                            50+
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Specialties Covered</div>
                    </div>
                    <div className="w-px h-12 bg-slate-700" />
                    <div>
                        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-1">
                            24/7
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Available Support</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
