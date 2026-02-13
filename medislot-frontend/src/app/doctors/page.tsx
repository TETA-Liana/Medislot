'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, Star, UserCheck, Stethoscope } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CustomCursor from '../../components/ui/CustomCursor';
import DoctorCard from '../../components/doctors/DoctorCard';

const doctorsData = [
    {
        id: 1,
        name: 'Dr. Sarah Mitchell',
        specialty: 'Cardiologist',
        image: '/doctors/d1.jpg',
        rating: 4.9,
        reviews: 120,
        location: 'Kigali, Wellness Center',
        availability: '9:00 AM - 5:00 PM',
        experience: '12 Years'
    },
    {
        id: 2,
        name: 'Dr. James Wilson',
        specialty: 'Neurologist',
        image: '/doctors/d2.jpg',
        rating: 4.8,
        reviews: 85,
        location: 'Downtown Hospital',
        availability: '10:00 AM - 4:00 PM',
        experience: '15 Years'
    },
    {
        id: 3,
        name: 'Dr. Elena Rodriguez',
        specialty: 'Pediatrician',
        image: '/doctors/d3.jpg',
        rating: 5.0,
        reviews: 210,
        location: 'Children\'s Care Clinic',
        availability: '8:30 AM - 3:30 PM',
        experience: '8 Years'
    },
    {
        id: 4,
        name: 'Dr. Michael Chen',
        specialty: 'Dermatologist',
        image: '/doctors/d4.jpg',
        rating: 4.7,
        reviews: 94,
        location: 'Skin Excellence Center',
        availability: '11:00 AM - 6:00 PM',
        experience: '10 Years'
    }
];

export default function DoctorsPage() {
    const [searchQuery, setSearchQuery] = useState('');

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

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8"
                        >
                            <Stethoscope className="w-4 h-4 text-sky-400" />
                            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Our Specialists</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
                        >
                            Find The Right <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
                                Doctor For You
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                        >
                            Book appointments with top-rated medical professionals in your area.
                            Verified reviews and instant confirmation.
                        </motion.p>

                        {/* Search Bar Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative max-w-2xl mx-auto"
                        >
                            <div className="flex flex-col md:flex-row gap-4 p-2 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] shadow-2xl">
                                <div className="flex-1 relative group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or specialty..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-14 pl-14 pr-6 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 text-lg"
                                    />
                                </div>
                                <div className="h-10 w-px bg-slate-700 hidden md:block self-center" />
                                <div className="flex gap-2">
                                    <button className="h-14 px-6 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 transition-all">
                                        <Filter className="w-5 h-5" />
                                        <span className="font-semibold">Filters</span>
                                    </button>
                                    <button className="h-14 px-8 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold transition-all shadow-lg shadow-sky-500/20">
                                        Find
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Doctors Grid */}
            <section className="py-24 relative bg-[#0a1628]/30">
                <div className="container mx-auto px-6">
                    {/* Filter Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                        {['All Doctors', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'].map((filter, i) => (
                            <motion.button
                                key={filter}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.05 }}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${i === 0
                                    ? 'bg-sky-500/20 border-sky-400/30 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                                    }`}
                            >
                                {filter}
                            </motion.button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {doctorsData.map((doctor, idx) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                delay={idx * 0.15}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="mt-20 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-4 rounded-full bg-slate-900 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-all shadow-xl"
                        >
                            Explore More Specialists
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Premium White Section with Line Animations */}
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
                            d="M-100 300 Q 300 100 720 300 T 1540 300"
                            stroke="#0ea5e9"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M-100 400 Q 400 200 720 400 T 1540 400"
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center text-slate-900">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Experience Seamless <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                                Healthcare Interaction
                            </span>
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                            Our platform connects you with the best specialists instantly.
                            Smart scheduling ensures you never have to wait again.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl">
                                Join as a Patient
                            </button>
                            <button className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all">
                                For Medical Professionals
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-24 border-t border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {[
                            { icon: UserCheck, title: 'Verified Profiles', desc: 'Every doctor on our platform goes through a rigorous verification process.' },
                            { icon: Star, title: 'Patient Reviews', desc: 'Trust the experiences of thousands of patients who have booked through Medislot.' },
                            { icon: MapPin, title: 'Local Access', desc: 'Find specialized care right in your neighborhood with real-time location tracking.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 border border-sky-400/20 shadow-[0_0_20px_rgba(14,165,233,0.05)]">
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
