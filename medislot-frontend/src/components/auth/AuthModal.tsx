'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { authApi } from '../../lib/api';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (user: any) => void;
    initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Sync mode with prop when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setError('');
            setSuccess(false);
        }
    }, [isOpen, initialMode]);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (mode === 'login') {
                const response = await authApi.login({ email, password });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                setSuccess(true);
                setTimeout(() => {
                    onSuccess(response.data.user);
                    onClose();
                }, 1500);
            } else {
                await authApi.register({ email, password, firstName, lastName, phone });

                // Automatically log in after successful registration
                const loginResponse = await authApi.login({ email, password });
                localStorage.setItem('accessToken', loginResponse.data.accessToken);
                localStorage.setItem('refreshToken', loginResponse.data.refreshToken);

                setSuccess(true);
                setTimeout(() => {
                    onSuccess(loginResponse.data.user);
                    onClose();
                }, 1500);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-8 pb-0 flex justify-between items-center">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h3>
                            <p className="text-slate-500 font-medium text-sm mt-1">
                                {mode === 'login' ? 'Enter your credentials to continue' : 'Join our healthcare network today'}
                            </p>
                        </div>
                        <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8">
                        {success ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-2">Success!</h4>
                                <p className="text-slate-500 font-medium tracking-tight">
                                    {mode === 'signup' ? 'Account created. Please sign in.' : 'Authentication successful!'}
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                                        {error}
                                    </div>
                                )}

                                {mode === 'signup' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/20 focus:bg-white outline-none transition-all font-bold text-slate-800"
                                                    placeholder="John"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    required
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/20 focus:bg-white outline-none transition-all font-bold text-slate-800"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/20 focus:bg-white outline-none transition-all font-bold text-slate-800"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                {mode === 'signup' && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone (Optional)</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/20 focus:bg-white outline-none transition-all font-bold text-slate-800"
                                                placeholder="+250..."
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            required
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500/20 focus:bg-white outline-none transition-all font-bold text-slate-800"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <Button
                                    disabled={isLoading}
                                    className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 mt-6 border-0"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </Button>

                                <div className="text-center mt-6">
                                    <button
                                        type="button"
                                        onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
                                        className="text-slate-500 font-bold hover:text-emerald-600 transition-colors text-sm"
                                    >
                                        {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
