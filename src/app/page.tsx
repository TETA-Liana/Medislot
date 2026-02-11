
import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import TrustSignals from '@/components/landing/TrustSignals';
import Features from '@/components/landing/Features';

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <Hero />
            <TrustSignals />
            <Features />
            <footer className="py-12 bg-gray-900 text-white border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} Medislot. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
