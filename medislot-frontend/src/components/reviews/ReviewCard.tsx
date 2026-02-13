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
            whileHover={{ y: -8 }}
            className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 shadow-xl"
        >
            {/* Quote Icon Background */}
            <div className="absolute top-10 right-10 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
                <Quote size={64} fill="currentColor" />
            </div>

            <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'
                                }`}
                        />
                    ))}
                </div>

                {/* Content */}
                <p className="text-slate-500 text-lg leading-relaxed mb-10 italic">
                    "{review.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-5 pt-6 border-t border-slate-50">
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black text-xl">
                                {review.name.charAt(0)}
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Star size={10} className="text-white fill-white" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-slate-800 font-black text-base">{review.name}</h4>
                        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">{review.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
