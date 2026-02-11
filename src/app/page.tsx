

import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import AboutUs from '@/components/landing/AboutUs';
import TrustSignals from '@/components/landing/TrustSignals';
import Features from '@/components/landing/Features';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-primary-500 selection:text-black">
            <CustomCursor />
            <Header />
            <Hero />
            <AboutUs />
            <div className="relative z-10 bg-[#020617]">
                <TrustSignals />
                <Features />
            </div>
            <Footer />
        </main>
    );
}

