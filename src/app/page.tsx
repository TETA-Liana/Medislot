
import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import TrustSignals from '@/components/landing/TrustSignals';
import Features from '@/components/landing/Features';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-primary-500 selection:text-black">
            <Header />
            <Hero />
            <div className="relative z-10 bg-[#020617]">
                <TrustSignals />
                <Features />
            </div>
            <Footer />
        </main>
    );
}
