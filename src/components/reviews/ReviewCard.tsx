'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface ReviewCardProps {
    review: {
        id: number;
        name: string;
        role: string;
        content: string;
        rating: number;
        avatar: string;
    };
    delay: number;
}

export default function ReviewCard({ review, delay }: ReviewCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -5 }}
            className="group relative bg-[#0a1628]/60 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 hover:border-sky-500/50 transition-all duration-300 shadow-xl"
        >
            {/* Quote Icon Background */}
            <div className="absolute top-6 right-8 text-sky-500/10 group-hover:text-sky-500/20 transition-colors">
                <Quote size={48} />
            </div>

            <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-600'
                                }`}
                        />
                    ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 text-base leading-relaxed mb-8 italic">
                    "{review.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                        {/* Placeholder for avatar */}
                        <div className="w-full h-full bg-gradient-to-br from-sky-400/20 to-blue-600/20 flex items-center justify-center text-sky-400 font-bold">
                            {review.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm tracking-wide">{review.name}</h4>
                        <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest">{review.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
