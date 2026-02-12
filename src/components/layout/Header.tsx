'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
    view?: string;
    setView?: (view: string) => void;
    onAuth?: (mode: 'login' | 'signup') => void;
}

export default function Header({ view = 'landing', setView, onAuth }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', action: () => setView ? setView('landing') : (window.location.href = '/') },
        { name: 'About', href: '/#about' },
        { name: 'Schedule', href: '/#schedule' },
        { name: 'Reviews', href: '/#reviews' },
        { name: 'Contact', href: '/#contact' }
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-md border-b border-emerald-100 py-4 shadow-sm'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <div
                    onClick={() => setView ? setView('landing') : (window.location.href = '/')}
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">M</div>
                    <span className="text-2xl font-black text-slate-800 tracking-tighter">
                        Medi<span className="text-emerald-500">Slot</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        link.action ? (
                            <button
                                key={link.name}
                                onClick={link.action}
                                className={`text-sm font-bold tracking-tight transition-all relative group ${view === link.name.toLowerCase() ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-500'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${view === link.name.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full font-bold'}`} />
                            </button>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-500 hover:text-emerald-500 font-bold text-sm tracking-tight transition-all relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full duration-300" />
                            </a>
                        )
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={() => onAuth?.('login')}
                        className="text-slate-800 font-bold text-sm hover:text-emerald-600 transition-colors"
                    >
                        Sign in
                    </button>
                    <Button
                        onClick={() => onAuth?.('signup')}
                        className="rounded-xl px-7 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 border-0"
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="md:hidden fixed inset-0 bg-white z-[60] pt-24 px-6 flex flex-col gap-8 items-center justify-center text-center"
                    >
                        <button
                            className="absolute top-6 right-6 p-2 text-slate-800"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <button
                                    className="text-4xl font-black text-slate-800 hover:text-emerald-500 transition-colors"
                                    onClick={() => {
                                        if (link.action) link.action();
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </button>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="w-full max-w-xs mt-8"
                        >
                            <Button className="w-full py-7 rounded-2xl text-xl font-bold bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-500/20">Book Now</Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
