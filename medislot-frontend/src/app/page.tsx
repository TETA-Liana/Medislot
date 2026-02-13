'use client';

import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/landing/Hero';
import AboutUs from '../components/landing/AboutUs';
import TrustSignals from '../components/landing/TrustSignals';
import Features from '../components/landing/Features';
import ReviewsSection from '../components/landing/ReviewsSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/layout/Footer';
import CustomCursor from '../components/ui/CustomCursor';
import Dashboard from '../components/dashboard/Dashboard';
import AuthModal from '../components/auth/AuthModal';
import { authApi } from '../lib/api';

export default function Home() {
    const [view, setView] = useState('landing'); // 'landing' or 'dashboard'
    const [user, setUser] = useState<any>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [pendingView, setPendingView] = useState<string | null>(null);

    // Check session on mount
    React.useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            authApi.getMe().then(res => {
                setUser(res.data);
            }).catch(() => {
                localStorage.removeItem('accessToken');
            });
        }
    }, []);

    const handleSetView = (newView: string) => {
        if (newView === 'dashboard' && !user) {
            setPendingView('dashboard');
            setAuthMode('login');
            setIsAuthOpen(true);
            return;
        }
        setView(newView);
    };

    const handleOpenAuth = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const handleAuthSuccess = (userData: any) => {
        setUser(userData);
        setIsAuthOpen(false);
        if (pendingView) {
            setView(pendingView);
            setPendingView(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setView('landing');
    };

    return (
        <main className={`min-h-screen transition-colors duration-500 ${view === 'landing' ? 'bg-[#f8fafc]' : 'bg-[#f1f5f9]'} selection:bg-emerald-500/30 selection:text-emerald-900`}>
            <CustomCursor />
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onSuccess={handleAuthSuccess}
                initialMode={authMode}
            />

            {view === 'landing' ? (
                <div className="relative">
                    <Header view={view} setView={handleSetView} onAuth={handleOpenAuth} />
                    <Hero onBook={() => handleSetView('dashboard')} />
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
                    <Dashboard onLogout={handleLogout} user={user} />
                </div>
            )}
        </main>
    );
}
