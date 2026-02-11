
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, FileHeart, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col items-start min-h-[300px]"
        >
            <div className="mb-6 p-4 rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{description}</p>
            <div className="w-12 h-1 bg-gray-200 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-300" />
        </motion.div>
    );
};

export default function Features() {
    const features = [
        {
            icon: CalendarCheck,
            title: 'Effortless Booking',
            description: 'Find available slots and book appointments in seconds. No more waiting on hold or navigating complex schedules.',
        },
        {
            icon: ShieldCheck,
            title: 'Secure Records',
            description: 'Your medical history and prescriptions are encrypted and securely stored. Access them anytime, anywhere.',
        },
        {
            icon: FileHeart,
            title: 'Personalized Care',
            description: 'Get matched with specialists tailored to your needs. Receive personalized health tips and reminders.',
        },
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4 block"
                    >
                        Why Choose Medislot
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        Streamlined Healthcare for Modern Life
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500"
                    >
                        Experience a new standard of medical care with our integrated platform designed for your convenience.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group h-full">
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                delay={idx * 0.2}
                            />
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Button size="lg" className="rounded-full px-10 text-lg shadow-blue-200">
                        Explore All Features
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
