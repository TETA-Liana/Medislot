'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import ReviewCard from '../reviews/ReviewCard';

const reviewsData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Patient',
        content: 'Medislot made booking my cardiologist appointment so simple. I was seen within two days, and the platform is incredibly intuitive.',
        rating: 5,
        avatar: ''
    },
    {
        id: 2,
        name: 'David Karemera',
        role: 'Health Advocate',
        content: 'The real-time tracking is a game changer. No more waiting hours in the lobby. I highly recommend it to anyone in Kigali.',
        rating: 5,
        avatar: ''
    },
    {
        id: 3,
        name: 'Linda Uwase',
        role: 'Full-time Mother',
        content: 'Finding a reliable pediatrician for my kids used to be stressful. Now I just check the ratings and book in seconds.',
        rating: 4,
        avatar: ''
    },
    {
        id: 4,
        name: 'Marc Nshuti',
        role: 'Software Engineer',
        content: 'As a tech person, I appreciate the clean UI and security features. Truly the most modern medical platform in the region.',
        rating: 5,
        avatar: ''
    }
];

export default function ReviewsSection() {
    return (
        <section id="reviews" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Animated Line SVGs */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1440 600">
                    <motion.path
                        d="M-100 200 Q 720 500 1540 200"
                        stroke="#10b981"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M-100 100 Q 720 -200 1540 100"
                        stroke="#059669"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                </svg>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6"
                    >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Testimonials</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-800 mb-6"
                    >
                        Loved by <span className="text-emerald-500">thousands</span> of patients.
                    </motion.h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Discover why Medislot is the trusted choice for modern healthcare scheduling.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {reviewsData.map((review, idx) => (
                        <ReviewCard key={review.id} review={review} delay={idx * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}
