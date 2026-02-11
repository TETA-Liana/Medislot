'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Clock,
    Globe,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-sky-500/30 selection:text-sky-200">
            <CustomCursor />
            <Header />

            {/* Hero Section - Navbar Separation */}
            <section className="relative pt-52 pb-24 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
                    >
                        <MessageSquare className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Connect With Us</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6"
                    >
                        Let's Start a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
                            Conversation
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16"
                    >
                        Have questions about Medislot? Our team is here to help you navigate through our platform and healthcare solutions.
                    </motion.p>
                </div>
            </section>

            {/* Contact Grid Section */}
            <section className="pb-32 container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-24 lg:gap-16 max-w-6xl mx-auto">

                    {/* Contact Info Column */}
                    <div className="lg:col-span-2 space-y-16">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>

                            {[
                                { icon: Phone, title: 'Call Us', value: '+250 788 000 000', label: 'Mon-Fri from 8am to 6pm.' },
                                { icon: Mail, title: 'Email Us', value: 'hello@medislot.com', label: 'Our friendly team is here to help.' },
                                { icon: MapPin, title: 'Visit Us', value: 'Kigali Heights, 4th Floor', label: 'KN 2 Rd, Kigali, Rwanda' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 group">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                                        <item.icon className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-sky-400 font-semibold text-sm mb-1">{item.value}</p>
                                        <p className="text-slate-500 text-xs">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Extra trust badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/50 to-blue-900/10 border border-slate-700/50 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheck className="w-6 h-6 text-sky-400" />
                                <h4 className="text-lg font-bold text-white">Secure Communication</h4>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Your information is encrypted and never shared. We follow strict medical privacy protocols (HIPAA & GDPR).
                            </p>
                        </motion.div>
                    </div>

                    {/* Contact Form Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-[#0a1628]/60 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                            {/* Form Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <form className="relative z-10 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 text-white placeholder-slate-600 focus:border-sky-500/50 focus:ring-0 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full h-14 bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 text-white placeholder-slate-600 focus:border-sky-500/50 focus:ring-0 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                                    <select className="w-full h-14 bg-slate-900/50 border border-slate-700/50 rounded-2xl px-6 text-white focus:border-sky-500/50 focus:ring-0 transition-all appearance-none cursor-pointer">
                                        <option className="bg-slate-950">Patient Support</option>
                                        <option className="bg-slate-950">Doctor Partnerships</option>
                                        <option className="bg-slate-950">Technical Assistance</option>
                                        <option className="bg-slate-950">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Message</label>
                                    <textarea
                                        rows={5}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 text-white placeholder-slate-600 focus:border-sky-500/50 focus:ring-0 transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-lg shadow-xl shadow-sky-500/20 group-hover:scale-[1.01] transition-all flex items-center justify-center gap-3">
                                    <span>Send Message</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Premium White Section - FAQ/Quick Help */}
            <section className="relative bg-white py-32 overflow-hidden">
                {/* Blue Dots Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }} />
                </div>

                {/* Animated Line SVGs */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 1440 600">
                        <motion.path
                            d="M-100 150 Q 720 0 1540 150"
                            stroke="#0ea5e9"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M-100 250 Q 720 400 1540 250"
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Frequent <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                                Questions
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
                        {[
                            { q: 'How do I book an appointment?', a: 'Log in to your account, search for a specialist, and choose an available time slot.' },
                            { q: 'Is my data secure?', a: 'Yes, we use military-grade encryption and comply with all international health data standards.' },
                            { q: 'Can I cancel my booking?', a: 'Certainly. You can cancel or reschedule through your dashboard up to 2 hours before the appointment.' },
                            { q: 'Do you offer emergency care?', a: 'Medislot is for scheduled care. In case of a medical emergency, please call your local emergency number immediately.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="border-b border-slate-100 pb-8 hover:border-blue-200 transition-colors"
                            >
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-3">
                                    <Sparkles className="w-4 h-4 text-blue-500" />
                                    {item.q}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed pl-7">
                                    {item.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Button className="rounded-full px-10 py-4 h-auto bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl">
                            Visit Help Center
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
