
import Header from '@/components/layout/Header';
import Hero from '@/components/landing/Hero';
import TrustSignals from '@/components/landing/TrustSignals';
import Features from '@/components/landing/Features';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Header />
            <Hero />
            {/* Temporarily commenting out other sections to focus on Hero redesign first, or I should update them to dark mode too.
          I will update the page container to be dark.
       */}
            <div className="relative z-10 bg-[#020617]">
                <TrustSignals />
                <Features />
            </div>
            <footer className="py-12 bg-black text-white border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} Medislot. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
