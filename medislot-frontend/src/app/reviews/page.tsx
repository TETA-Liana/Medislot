'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Award, ThumbsUp, Heart } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CustomCursor from '../../components/ui/CustomCursor';
import ReviewCard from '../../components/reviews/ReviewCard';

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

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-sky-500/30 selection:text-sky-200">
            <CustomCursor />
            <Header />

            {/* Compact Hero Section - Increased top padding for navbar separation */}
            <section className="relative pt-52 pb-16 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
                    >
                        <MessageSquare className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Feedback</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Patient{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                            Stories
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-base md:text-lg max-w-xl mx-auto"
                    >
                        Discover why thousands trust Medislot for their healthcare needs. Simple, transparent, and compassionate care.
                    </motion.p>
                </div>
            </section>

            {/* Grid Section */}
            <section className="pb-24 pt-8 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {reviewsData.map((review, idx) => (
                        <ReviewCard key={review.id} review={review} delay={idx * 0.1} />
                    ))}
                </div>
            </section>

            {/* Concise Premium White Section */}
            <section className="relative bg-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)`,
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: ThumbsUp, label: '98%', desc: 'Satisfaction Rate' },
                            { icon: Star, label: '4.9/5', desc: 'Average Rating' },
                            { icon: Award, label: 'Verified', desc: 'Top Specialists' },
                            { icon: Heart, label: '20K+', desc: 'Happy Patients' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1">{stat.label}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
