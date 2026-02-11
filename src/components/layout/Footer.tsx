
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-10 text-gray-400">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-6 text-2xl font-bold text-white tracking-wide">
                            Medi<span className="text-primary-400">Slot</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Revolutionizing healthcare access with AI-driven scheduling and real-time doctor availability.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors cursor-pointer">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.56v.05c0 2.22-.65 4.31-1.78 6.13-1.07 1.72-2.52 3.16-4.22 4.29-1.8 1.19-3.9 1.83-6.07 1.83-6.4 0-11.6-5.21-11.6-11.61 0-2.31.72-4.46 1.95-6.25 1.15-1.68 2.76-3 4.67-3.83 2-.86 4.19-1.12 6.36-.75 2.14.36 4.1 1.34 5.67 2.82 1.25 1.17 2.21 2.65 2.78 4.29.17.48.29.98.34 1.49zM5.5 12c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5z" /></svg>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors cursor-pointer">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Find Doctors</Link></li>
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Browse Specialities</Link></li>
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Clinics Near Me</Link></li>
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Telehealth</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Newsletter</h4>
                        <p className="text-sm mb-4">Subscribe for health tips and platform updates.</p>
                        <div className="flex bg-white/5 rounded-lg border border-white/10 focus-within:border-primary-500/50 transition-colors p-1">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-transparent border-none outline-none text-white px-3 flex-1 text-sm placeholder-gray-600 w-full"
                            />
                            <button className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-md text-xs font-bold transition-colors">GO</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; 2024 Medislot Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
