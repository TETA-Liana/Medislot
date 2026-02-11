'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DoctorProps {
    doctor: {
        id: number;
        name: string;
        specialty: string;
        image: string;
        rating: number;
        reviews: number;
        location: string;
        availability: string;
        experience: string;
    };
    delay: number;
}

export default function DoctorCard({ doctor, delay }: DoctorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0a1628]/60 backdrop-blur-md border border-slate-700/50 rounded-[2rem] overflow-hidden hover:border-sky-500/50 transition-all duration-300 shadow-xl"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image Placeholder with Gradient */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-slate-700/50 animate-pulse" />
                    {/* In a real app, use next/image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent opacity-60" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-sky-500/20 backdrop-blur-md border border-sky-400/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Available Today</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-white">{doctor.experience} Experience</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <ShieldCheck className="w-4 h-4 text-sky-400" />
                            <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">{doctor.specialty}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">{doctor.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-yellow-500">{doctor.rating}</span>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                            <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{doctor.availability}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" className="flex-1 rounded-xl border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:border-slate-600 transition-all font-bold text-sm h-12">
                        View Profile
                    </Button>
                    <Button className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm h-12 shadow-lg shadow-sky-500/20 border-0">
                        Book Now
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
