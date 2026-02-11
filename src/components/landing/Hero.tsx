'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity, Shield, Star, Clock, MapPin, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Generate floating particles for ambient effect
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
    }));

    return (
        <section className="relative min-h-[90vh] bg-[#020617] overflow-hidden flex items-center pt-32 pb-20 lg:pt-24 selection:bg-sky-500/30 selection:text-sky-200">

            {/* Animated Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {mounted && particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full bg-sky-400/30 blur-sm"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Center Glow - Animated */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.25, 0.2]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen"
                />
                {/* Bottom Right Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vh] bg-sky-500/10 blur-[100px] rounded-full"
                />
                {/* Bottom Left Glow */}
                <div className="absolute bottom-[10%] left-[-10%] w-[30vw] h-[30vh] bg-indigo-600/10 blur-[80px] rounded-full" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-[0.07] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="flex flex-col items-start text-left pt-10 lg:pt-0">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        <span className="text-xs font-medium text-sky-300 tracking-wide uppercase">
                            Next Gen Healthcare
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-5"
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            The{' '}
                        </motion.span>
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 relative inline-block"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Solution
                            <motion.svg
                                className="absolute w-full h-3 -bottom-1 left-0 text-sky-500 opacity-60"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                />
                            </motion.svg>
                        </motion.span>{' '}
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            To Your
                        </motion.span>
                        <br />
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            Health{' '}
                        </motion.span>
                        <motion.span
                            className="text-slate-400"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                        >
                            Journey
                        </motion.span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg text-slate-400 max-w-lg mb-7 leading-relaxed"
                    >
                        Smart scheduling powered by real-time availability. Book appointments instantly and track your wellness journey.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className="relative h-12 px-7 text-sm rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_40px_rgba(14,165,233,0.5)] transition-all border-0 group overflow-hidden">
                                <span className="relative z-10 flex items-center">
                                    Get the App
                                    <Smartphone className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </span>
                                {/* Animated shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                />
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="outline" className="h-12 px-7 text-sm rounded-full border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800 hover:text-sky-300 hover:border-sky-500/50 transition-all group">
                                How it works
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Stats/Trust */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-10 flex items-center gap-6 border-t border-slate-800 pt-6 w-full max-w-md"
                    >
                        <div>
                            <div className="text-xl font-bold text-white">20k+</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Patients</div>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">4.9/5</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Rating</div>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white">15min</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Avg Wait</div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Visuals (Abstract Map/App Interface) */}
                <div className="relative h-[600px] w-full hidden lg:block perspective-1000">

                    {/* Floating Phone/Card Mockup */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute top-10 right-10 w-[320px] h-[580px] bg-slate-900 border border-slate-700 rounded-[3rem] shadow-2xl p-4 overflow-hidden z-20 group hover:border-sky-500/50 transition-colors duration-500"
                    >
                        {/* Glossy Reflection */}
                        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-[3rem]" />

                        <div className="flex flex-col h-full bg-[#020617] rounded-[2.5rem] overflow-hidden relative">
                            {/* Mock UI: Header */}
                            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                                <div className="w-8 h-8 rounded-full bg-slate-800" />
                                <div className="text-xs text-slate-400 font-medium">Medislot</div>
                                <div className="w-6 h-6 rounded-md bg-sky-500/20" />
                            </div>

                            {/* Mock UI: Map */}
                            <div className="flex-1 relative bg-slate-900 overflow-hidden">
                                {/* Abstract Map Lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 600">
                                    <path d="M50 50 Q 200 100 350 50" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                                    <path d="M100 100 L 100 500" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.5" />
                                    <path d="M50 300 Q 200 400 350 300" stroke="#38bdf8" strokeWidth="2" fill="none" />
                                    {/* Pulsing Dots */}
                                    <circle cx="100" cy="200" r="4" fill="#0ea5e9" className="animate-pulse" />
                                    <circle cx="250" cy="350" r="4" fill="#0ea5e9" className="animate-pulse" />
                                </svg>

                                {/* Route Line Animation */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: "60%" }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute top-[20%] left-[30%] w-1 bg-gradient-to-b from-sky-400 to-transparent blur-[1px]"
                                />

                                {/* Location Pins */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-[30%] left-[20%]"
                                >
                                    <div className="relative">
                                        <MapPin className="text-sky-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] fill-sky-900/50" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-sky-100 rounded-full animate-ping" />
                                    </div>
                                </motion.div>

                                {/* Floating Card inside Phone */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                                            <Activity size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400">Next Available</div>
                                            <div className="text-sm font-semibold text-white">Dr. Sarah Cole</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Decorative Elements behind the phone */}
                    <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] border border-slate-800/50 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] border border-dashed border-slate-800 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                    {/* Floating Info Cards outside phone */}

                    {/* Card 1: Verified */}
                    <motion.div
                        style={{ y: y2 }}
                        className="absolute top-[20%] left-0 z-30 p-4 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl max-w-[200px]"
                    >
                        <div className="flex gap-3 items-center mb-2">
                            <div className="p-2 bg-sky-500/10 rounded-lg">
                                <Shield className="w-5 h-5 text-sky-400" />
                            </div>
                            <span className="text-sm font-bold text-white">Verified</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 1 }}
                                className="h-full bg-sky-500"
                            />
                        </div>
                    </motion.div>

                    {/* Card 2: Rating */}
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[60%] right-[0%] z-10 p-4 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl flex items-center gap-3"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700" />
                            ))}
                        </div>
                        <div>
                            <div className="flex text-yellow-500 text-xs">
                                <Star className="w-3 h-3 fill-yellow-500" />
                                <Star className="w-3 h-3 fill-yellow-500" />
                                <Star className="w-3 h-3 fill-yellow-500" />
                            </div>
                            <div className="text-xs text-slate-300 font-semibold mt-0.5">Top Rated</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

// Add these to global css if not present, but for now relying on Tailwind config
