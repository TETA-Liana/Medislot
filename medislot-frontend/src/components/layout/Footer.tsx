import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-24 pb-12 text-slate-400">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-8 text-2xl font-black text-white tracking-tighter">
                            Medi<span className="text-emerald-500">Slot</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-8 text-slate-400">
                            Revolutionizing healthcare access with intelligent scheduling and real-time medical matching.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons with Emerald theme */}
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all cursor-pointer group">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M24 4.56v.05c0 2.22-.65 4.31-1.78 6.13-1.07 1.72-2.52 3.16-4.22 4.29-1.8 1.19-3.9 1.83-6.07 1.83-6.4 0-11.6-5.21-11.6-11.61 0-2.31.72-4.46 1.95-6.25 1.15-1.68 2.76-3 4.67-3.83 2-.86 4.19-1.12 6.36-.75 2.14.36 4.1 1.34 5.67 2.82 1.25 1.17 2.21 2.65 2.78 4.29.17.48.29.98.34 1.49zM5.5 12c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5z" /></svg>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all cursor-pointer group">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black mb-8 tracking-widest text-xs uppercase">Platform</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="#schedule" className="hover:text-emerald-500 transition-colors">Find Doctors</Link></li>
                            <li><Link href="#schedule" className="hover:text-emerald-500 transition-colors">Specialities</Link></li>
                            <li><Link href="#schedule" className="hover:text-emerald-500 transition-colors">Emergency Slots</Link></li>
                            <li><Link href="#schedule" className="hover:text-emerald-500 transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black mb-8 tracking-widest text-xs uppercase">Company</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="#about" className="hover:text-emerald-500 transition-colors">Our Mission</Link></li>
                            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-emerald-500 transition-colors">Privacy</Link></li>
                            <li><Link href="#contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black mb-8 tracking-widest text-xs uppercase">Newsletter</h4>
                        <p className="text-sm mb-6 text-slate-500 font-medium">Subscribe for health tips and platform updates.</p>
                        <div className="flex bg-slate-800 rounded-2xl border border-slate-700 focus-within:border-emerald-500/50 transition-all p-1.5 overflow-hidden group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-transparent border-none outline-none text-white px-4 flex-1 text-sm placeholder-slate-600 w-full"
                            />
                            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-95">GO</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                    <p>&copy; 2024 Medislot. Built with care for doctors & patients.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Security</Link>
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-emerald-500 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
