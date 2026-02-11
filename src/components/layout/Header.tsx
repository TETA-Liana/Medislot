
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Doctors', href: '/doctors' },
        { name: 'Clinics', href: '/clinics' },
        { name: 'About', href: '/about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-700 transition-colors">
                        M
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                        Medislot
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-600 hover:text-primary-600 font-medium transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-gray-600 hover:text-primary-600 font-medium">
                        Log in
                    </Link>
                    <Button className="rounded-full px-6">
                        Book Now <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600"
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
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 mt-4">
                                <Button variant="outline" className="w-full justify-center">
                                    Log in
                                </Button>
                                <Button className="w-full justify-center">Book Appointment</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
