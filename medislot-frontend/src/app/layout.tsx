
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google'; // Changed to Outfit as it's more modern/bold display font
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-inter' }); // Keeping variable name consistent for now

export const metadata: Metadata = {
    title: 'Medislot - Modern Healthcare',
    description: 'The smart solution to your health needs.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Plaster&display=swap" rel="stylesheet" />
            </head>
            <body className={`${outfit.variable} font-sans antialiased bg-[#020617] text-white selection:bg-primary-500 selection:text-black`}>
                {children}
            </body>
        </html>
    );
}
