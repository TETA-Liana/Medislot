'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32 pb-20 overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent pointer-events-none -z-10 blur-3xl rounded-full opacity-60 translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-green-50 to-transparent pointer-events-none -z-10 blur-2xl rounded-full opacity-40 translate-y-1/4 -translate-x-1/4" />

            <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Text Content */}
                <motion.div
                    className="flex-1 max-w-2xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        #1 Healthcare Platform
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                        Your Health, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Accessible Anytime.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                        Book appointments with top-rated doctors, manage prescriptions, and access your medical records securely - all in one place.
                    </motion.p>

                    <motion.div variants={itemVariants} className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-100/50 border border-gray-100 flex flex-col sm:flex-row gap-2 max-w-2xl">
                        <div className="flex-1 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Specialty</label>
                            <input type="text" placeholder="Cardiologist, Dentist..." className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder-gray-400" />
                        </div>
                        <div className="w-px bg-gray-100 my-2 hidden sm:block"></div>
                        <div className="flex-1 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</label>
                            <input type="text" placeholder="New York, NY" className="w-full bg-transparent outline-none text-gray-900 font-medium placeholder-gray-400" />
                        </div>
                        <Button size="lg" className="rounded-xl px-8 h-auto py-3 text-lg font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all">
                            Search
                        </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-10 flex items-center gap-6 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="text-green-500 w-5 h-5" />
                            <span>HIPAA Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-400 w-5 h-5 fill-current" />
                            <span>4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-blue-500 w-5 h-5" />
                            <span>24/7 Support</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Visual / Illustration */}
                <motion.div
                    className="flex-1 w-full relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    {/* Mockup Container */}
                    <div className="relative z-10 mx-auto w-full max-w-lg lg:max-w-xl aspect-[4/3] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        {/* Mock App UI Placeholder */}
                        <div className="absolute inset-0 bg-gray-50 flex flex-col">
                            <div className="h-14 border-b bg-white flex items-center px-6 justify-between">
                                <div className="w-24 h-4 bg-gray-200 rounded-full animate-pulse" />
                                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                            <div className="p-6 grid grid-cols-2 gap-4">
                                <div className="col-span-2 h-32 bg-blue-500 rounded-2xl p-6 text-white flex flex-col justify-center gap-2">
                                    <div className="w-32 h-6 bg-white/30 rounded-full" />
                                    <div className="w-48 h-4 bg-white/30 rounded-full" />
                                </div>
                                <div className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 mb-2" />
                                    <div className="w-20 h-3 bg-gray-200 rounded-full" />
                                </div>
                                <div className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 mb-2" />
                                    <div className="w-20 h-3 bg-gray-200 rounded-full" />
                                </div>
                            </div>
                            {/* Floating Card */}
                            <motion.div
                                className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-50 flex items-center gap-4 max-w-[200px]"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Protection</p>
                                    <p className="text-sm font-bold text-gray-900">Verified</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative Circle Behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 via-purple-50 to-pink-50 rounded-full -z-10 blur-3xl opacity-60 animate-pulse-slow" />
                </motion.div>
            </div>
        </section>
    );
}
