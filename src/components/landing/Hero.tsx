
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// SVG Icons for App Stores
const GooglePlayIcon = () => (
    <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-37.2 37.2 36.6 36.6 59.5-34.4c8.3-4.8 13.5-13.6 13.5-23.3s-5.2-18.5-13.5-23.3zm-58.9 74.1l-66.8-66.8-212 212c12.7 7.3 27.6 11.2 42.6 11.2h28.2l208-156.4z" />
    </svg>
);

const AppleIcon = () => (
    <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 66.2 23.9 149.4 68.3 214 21.6 31.9 51.5 67.2 92 65.5 35.7-1.5 49-24.1 91.5-24.1 42.9 0 53.6 24.1 92 24.1 32.8 1 59.2-31.2 78.5-62.9 8-12.8 11.4-19.7 11.4-19.7-36.8-14.7-65.5-56-65.5-101.4zM224 86.8c18.5-22.6 33.3-54.8 29.7-86.8-27.4 1.3-60.7 18.2-80.6 42.5-18.2 21.9-34.1 55.4-30.9 86.8 30.6 2.3 64.1-19.1 81.8-42.5z" />
    </svg>
);

export default function Hero() {
    return (
        <section className="relative min-h-[110vh] bg-[#020617] flex items-center pt-32 pb-20 overflow-hidden text-white">
            {/* Dynamic Glow Background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"
            />

            {/* Scientific Grid/Lines Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Content Side */}
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 font-sans"
                    >
                        The <span className="relative inline-block text-primary-400">
                            Solution
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span> To Your <br />
                        Health <span className="relative inline-block text-primary-400">
                            Needs
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl leading-relaxed"
                    >
                        Smart navigation powered by AI-driven diagnostics. Get the fastest appointments, track prescriptions in real-time, and avoid waiting rooms with Medislot's intelligent healthcare ecosystem.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Button className="h-16 px-8 rounded-2xl bg-white text-black hover:bg-gray-100 flex items-center gap-4 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <GooglePlayIcon />
                            <div className="text-left leading-tight">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">Get it on</div>
                                <div className="text-xl font-bold">Google Play</div>
                            </div>
                        </Button>
                        <Button className="h-16 px-8 rounded-2xl bg-white text-black hover:bg-gray-100 flex items-center gap-4 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <AppleIcon />
                            <div className="text-left leading-tight">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-600">Download on the</div>
                                <div className="text-xl font-bold">App Store</div>
                            </div>
                        </Button>
                    </motion.div>
                </div>

                {/* Visual Side - 3D/Interactive Element */}
                <div className="relative h-full min-h-[600px] w-full flex items-center justify-center">
                    {/* The "Map" or "Visual" equivalent */}
                    <div className="relative w-full h-full">
                        {/* Abstract Lines / Path */}
                        <svg className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none" viewBox="0 0 800 800">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                                    <stop offset="50%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0 }} />
                                </linearGradient>
                            </defs>
                            <path d="M100,600 C200,500 400,700 300,300 S600,100 700,400" stroke="url(#grad1)" strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-pulse" />
                            <path d="M50,400 C150,300 350,500 450,200 S750,50 650,550" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2" fill="none" />
                        </svg>

                        {/* Floating "Location" / "Doctor" Pin */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/3 right-1/4"
                        >
                            <div className="relative w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.6)] z-20">
                                <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-75"></div>
                                <div className="w-8 h-8 bg-white rounded-full"></div>
                            </div>
                            {/* Floating Card for Pin */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute left-full top-0 ml-4 bg-gray-900/90 backdrop-blur-md p-4 rounded-xl border border-primary-500/30 w-48 shadow-2xl"
                            >
                                <div className="flex gap-3 items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Dr. Sarah</div>
                                        <div className="text-xs text-primary-400">Cardiologist</div>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: ['0%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        className="h-full bg-primary-500"
                                    />
                                </div>
                                <div className="text-xs text-right mt-1 text-primary-300">Available Now</div>
                            </motion.div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-20 left-10 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 w-64 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                            <div className="text-4xl font-bold text-white mb-1">24/7</div>
                            <div className="text-gray-400 text-sm">Emergency Support</div>
                        </div>

                        <div className="absolute top-20 left-20">
                            {/* Abstract Grid Mesh - Navigo Style */}
                            <div className="w-32 h-32 border border-primary-500/20 rounded-full relative animate-spin-slow">
                                <div className="absolute top-0 left-1/2 w-1 h-2 bg-primary-500"></div>
                                <div className="absolute bottom-0 left-1/2 w-1 h-2 bg-primary-500"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
