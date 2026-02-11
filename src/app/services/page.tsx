'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Stethoscope,
    Heart,
    Zap,
    ShieldCheck,
    Clock,
    Smartphone,
    Calendar,
    Users,
    ClipboardCheck
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import ServiceCard from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/Button';

const servicesData = [
    {
        id: 1,
        title: 'Instant Consultations',
        description: 'Connect with specialized doctors in minutes using our intelligent matching algorithm that prioritizes urgency and location.',
        icon: Zap,
        color: 'from-sky-500 to-blue-600',
        features: ['Real-time matching', 'Video consultations', 'Instant prescriptions']
    },
    {
        id: 2,
        title: 'Specialist Booking',
        description: 'Browse our network of top-rated specialists and book appointments at your convenience with instant confirmation.',
        icon: Stethoscope,
        color: 'from-blue-500 to-indigo-600',
        features: ['20+ Specialties', 'Verified reviews', 'Calendar integration']
    },
    {
        id: 3,
        title: 'Health Monitoring',
        description: 'Track your vital health metrics and receive AI-generated insights to help you maintain a healthier lifestyle and prevent issues.',
        icon: Activity,
        color: 'from-cyan-500 to-blue-500',
        features: ['Vitals tracking', 'AI health report', 'Trend analysis']
    },
    {
        id: 4,
        title: 'Digital Prescriptions',
        description: 'Receive and manage your prescriptions digitally. Securely share them with your preferred pharmacy for quick pickup.',
        icon: ClipboardCheck,
        color: 'from-indigo-500 to-purple-600',
        features: ['Secure storage', 'Pharmacy sharing', 'Refill reminders']
    },
    {
        id: 5,
        title: 'Family Care Plans',
        description: 'Manage health records and appointments for your whole family under one secure and easy-to-use account.',
        icon: Users,
        color: 'from-sky-400 to-blue-500',
        features: ['Sub-profiles', 'Shared history', 'Family reminders']
    },
    {
        id: 6,
        title: 'Preventive Screenings',
        description: 'Proactive health checkups based on your age, history, and AI-predicted risk factors to keep you ahead of health concerns.',
        icon: Heart,
        color: 'from-blue-600 to-sky-600',
        features: ['Personalized alerts', 'Home test kits', 'Specialist follow-up']
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-sky-500/30 selection:text-sky-200">
            <CustomCursor />
            <Header />

            {/* Hero Section - Increased top padding for navbar separation */}
            <section className="relative pt-52 pb-24 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
                    >
                        <Zap className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Our Solutions</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
                    >
                        Comprehensive <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
                            Healthcare Services
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                    >
                        We provide modern technology-driven healthcare solutions tailored to your specific needs.
                        Safe, secure, and instant access to quality care.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 relative bg-[#0a1628]/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, idx) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                delay={idx * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium White Section - Process/How it Works */}
            <section className="relative bg-white py-24 overflow-hidden">
                {/* Blue Dots Pattern Background */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                        backgroundPosition: '0 0, 15px 15px'
                    }} />
                </div>

                {/* Animated Line SVGs */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 1440 600">
                        <motion.path
                            d="M-100 200 Q 300 400 720 200 T 1540 200"
                            stroke="#0ea5e9"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M-100 350 Q 400 150 720 350 T 1540 350"
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Smart Access <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                                In Three Simple Steps
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Choose Service', desc: 'Select the healthcare service or specialist you need from our platform.' },
                            { step: '02', title: 'Book Instantly', desc: 'Choose a convenient time slot and get instant confirmation.' },
                            { step: '03', title: 'Connect & Care', desc: 'Meet with your doctor virtually or in-person and receive expert care.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative text-center"
                            >
                                <div className="text-6xl font-black text-blue-100 mb-4 tracking-tighter">{item.step}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges - Consistent with other pages */}
            <section className="py-24 border-t border-slate-800/50 bg-[#020617]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { icon: ShieldCheck, title: 'Secure Platform', desc: 'Your medical records and personal data are protected with the highest security standards.' },
                            { icon: Calendar, title: 'Flexible Booking', desc: 'Reschedule or cancel appointments easily through your dashboard without any hassle.' },
                            { icon: Smartphone, title: 'Mobile Access', desc: 'Access your health records and consult with doctors on the go with our mobile-friendly system.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 border border-sky-400/20">
                                    <item.icon className="w-8 h-8 text-sky-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
