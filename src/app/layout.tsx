
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Medislot - Healthcare Appointment Booking',
    description: 'Book your healthcare appointments with ease and confidence.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Plaster&display=swap" rel="stylesheet" />
            </head>
            <body className={`${inter.variable} font-sans antialiased text-gray-900 bg-white selection:bg-blue-100 selection:text-blue-900`}>
                {children}
            </body>
        </html>
    );
}
