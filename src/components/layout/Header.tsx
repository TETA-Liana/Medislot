
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // More aggressive scroll change for dark mode nav
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Doctors', href: '/doctors' },
        { name: 'Services', href: '/services' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Contact', href: '/contact-us' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-4'
                : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Logo - Navigo Style */}
                    <div className="relative">
                        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-10 h-10 bg-black rounded-lg flex items-center justify-center border border-white/10">
                            <span className="text-sky-400 font-bold text-xl">M</span>
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-wide">
                        Medi<span className="text-sky-400">Slot</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-white font-medium text-sm tracking-wide transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full duration-300 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <Button
                        className="rounded-full px-8 py-6 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-base shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] transition-all transform hover:-translate-y-0.5 border border-sky-400/20"
                    >
                        Book Now
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed inset-0 bg-[#020617] z-40 pt-24 px-6 flex flex-col gap-6"
                    >
                        <button
                            className="absolute top-6 right-6 p-2 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X />
                        </button>
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-3xl font-bold text-white hover:text-sky-400 transition-colors block"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8"
                        >
                            <Button className="w-full py-6 rounded-xl text-lg bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-500/20">Download App</Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
