'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import AboutUs from '@/components/landing/AboutUs';
import TrustSignals from '@/components/landing/TrustSignals';
import Features from '@/components/landing/Features';
import ReviewsSection from '@/components/landing/ReviewsSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
    const [view, setView] = useState('landing'); // 'landing' or 'dashboard'

    return (
        <main className={`min-h-screen transition-colors duration-500 ${view === 'landing' ? 'bg-[#f8fafc]' : 'bg-[#f1f5f9]'} selection:bg-emerald-500/30 selection:text-emerald-900`}>
            <CustomCursor />
            {view === 'landing' ? (
                <div className="relative">
                    <Header view={view} setView={setView} />
                    <Hero onBook={() => setView('dashboard')} />
                    <TrustSignals />
                    <div id="about">
                        <AboutUs />
                    </div>
                    <div id="schedule">
                        <Features />
                    </div>
                    <div id="reviews">
                        <ReviewsSection />
                    </div>
                    <div id="contact">
                        <ContactSection />
                    </div>
                    <Footer />
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <Dashboard />
                </div>
            )}
        </main>
    );
}
