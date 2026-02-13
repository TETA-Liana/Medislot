'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

export default function ContactSection() {
    return (
        <section id="contact" className="py-32 bg-white relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-900">
            {/* Dots Background requested by user */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Side: Info */}
                        <div className="space-y-12">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6"
                                >
                                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                                    <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Contact Support</span>
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6"
                                >
                                    Let’s start a <br />
                                    <span className="text-emerald-500">conversation.</span>
                                </motion.h2>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                                    Have questions about our platform or medical network? Our team is available 24/7 to assist you.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: Phone, title: 'Call Us', value: '+250 788 000 000' },
                                    { icon: Mail, title: 'Email Us', value: 'hello@medislot.com' },
                                    { icon: MapPin, title: 'Visit Us', value: 'Kigali Heights, 4th Floor' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-6 group"
                                    >
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-emerald-600 transition-all shadow-sm">
                                            <item.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</h4>
                                            <p className="text-xl font-bold text-slate-800">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50/80 backdrop-blur-xl border border-slate-200 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden"
                        >
                            <form className="space-y-6 relative z-10">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-6 text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-6 text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                                    <select className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-6 text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all appearance-none cursor-pointer">
                                        <option>Patient Support</option>
                                        <option>Doctor Partnerships</option>
                                        <option>Technical Assistance</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <Button className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3">
                                    <span>Send Message</span>
                                    <Send size={20} />
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
