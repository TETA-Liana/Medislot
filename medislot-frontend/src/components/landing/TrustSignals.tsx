'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Award, Zap } from 'lucide-react';

export default function TrustSignals() {
    const badges = [
        { icon: ShieldCheck, text: "HIPAA Compliant", sub: "Maximum Data Security" },
        { icon: Award, text: "Qualified MDs", sub: "Fully Verified Staff" },
        { icon: Star, text: "4.9/5 Rating", sub: "Trusted by Thousands" },
        { icon: Zap, text: "Express Connect", sub: "Under 15min Matching" },
    ];

    return (
        <section className="py-24 bg-white border-y border-slate-100 selection:bg-emerald-500/30 selection:text-emerald-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {badges.map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                                <badge.icon size={28} />
                            </div>
                            <h4 className="text-xl font-black text-slate-800 tracking-tight mb-1">{badge.text}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{badge.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
