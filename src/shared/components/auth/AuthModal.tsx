import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/store/useAuth';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
    step: 'details' as 'details' | 'otp',
    phone: '',
    name: '',
    otp: '',
    loading: false,
    error: null as string | null,
};

const AuthModal = () => {
    const { authModalOpen, closeAuthModal, intendedPath, setProfile } = useAuth();
    const navigate = useNavigate();
    const firstInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState<'details' | 'otp'>(INITIAL_STATE.step);
    const [phone, setPhone] = useState(INITIAL_STATE.phone);
    const [name, setName] = useState(INITIAL_STATE.name);
    const [otp, setOtp] = useState(INITIAL_STATE.otp);
    const [loading, setLoading] = useState(INITIAL_STATE.loading);
    const [error, setError] = useState<string | null>(INITIAL_STATE.error);

    // Reset all form state when modal opens/closes
    useEffect(() => {
        if (!authModalOpen) {
            setStep('details');
            setPhone('');
            setName('');
            setOtp('');
            setLoading(false);
            setError(null);
        }
    }, [authModalOpen]);

    // Focus trap: auto-focus the first input when the modal opens
    useEffect(() => {
        if (authModalOpen) {
            setTimeout(() => firstInputRef.current?.focus(), 100);
        }
    }, [authModalOpen, step]);

    // Ensure phone starts with +91 (India)
    const formatPhone = useCallback((p: string) => {
        const cleaned = p.replace(/\D/g, '');
        const digits = cleaned.length === 10 ? '91' + cleaned : cleaned;
        return '+' + digits;
    }, []);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim() || name.trim().length < 2) {
            setError("Please enter your full name (at least 2 characters)");
            return;
        }
        if (!phone || phone.replace(/\D/g, '').length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setLoading(true);
        try {
            const formattedPhone = formatPhone(phone);

            const { error: signInError } = await supabase.auth.signInWithOtp({
                phone: formattedPhone,
            });

            if (signInError) throw signInError;

            setStep('otp');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Failed to send OTP. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formattedPhone = formatPhone(phone);

            const { data, error: verifyError } = await supabase.auth.verifyOtp({
                phone: formattedPhone,
                token: otp,
                type: 'sms'
            });

            if (verifyError) throw verifyError;

            // Sync profile and name to Supabase
            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert({
                        id: data.user.id,
                        email: data.user.email || `${formattedPhone}@civixpay.local`,
                        full_name: name.trim(),
                    }, { onConflict: 'id' });

                if (profileError) {
                    console.error("Failed to sync profile:", profileError);
                }

                // Optimistically update local state
                setProfile({
                    id: data.user.id,
                    email: data.user.email || `${formattedPhone}@civixpay.local`,
                    full_name: name.trim(),
                    kycStatus: 'pending'
                });
            }

            closeAuthModal();

            // FIX: Use React Router navigate instead of window.location.hash
            if (intendedPath) {
                navigate(intendedPath);
            }

        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {authModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
                        onClick={closeAuthModal}
                        aria-hidden="true"
                    />

                    {/* Modal Panel */}
                    <div
                        className="fixed inset-0 z-[120] flex items-center justify-center p-4 pointer-events-none"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="auth-modal-title"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto border border-emerald-100"
                        >
                            {/* Header */}
                            <div className="bg-emerald-50 p-6 flex items-center justify-between border-b border-emerald-100/50">
                                <div>
                                    <h2 id="auth-modal-title" className="text-xl font-black text-emerald-950">CivixPay Security</h2>
                                    <p className="text-sm font-medium text-emerald-700/80 mt-1">
                                        {step === 'details' ? 'Verify your identity to continue' : 'Enter verification code'}
                                    </p>
                                </div>
                                <button
                                    onClick={closeAuthModal}
                                    aria-label="Close login modal"
                                    className="p-2 hover:bg-emerald-100 rounded-xl transition-colors text-emerald-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 sm:p-8">
                                {/* Error Message */}
                                {error && (
                                    <div
                                        role="alert"
                                        className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-2"
                                    >
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        {error}
                                    </div>
                                )}

                                {/* Step 1: Name + Phone */}
                                {step === 'details' ? (
                                    <form onSubmit={handleSendOtp} className="space-y-5">
                                        <div>
                                            <label htmlFor="auth-name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    id="auth-name"
                                                    ref={firstInputRef}
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Enter your full name"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-gray-900"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="auth-phone" className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                    <Phone size={18} />
                                                </div>
                                                <input
                                                    id="auth-phone"
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    required
                                                    inputMode="numeric"
                                                    maxLength={10}
                                                    placeholder="9999999999"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-medium text-gray-900 tracking-wide"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1.5 pl-1">India only — enter 10-digit mobile number</p>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Send Secure OTP'}
                                        </button>
                                    </form>
                                ) : (
                                    /* Step 2: OTP Verification */
                                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                                        <div>
                                            <label htmlFor="auth-otp" className="block text-sm font-bold text-gray-700 mb-2 text-center">
                                                OTP sent to +91 {phone.slice(-10)}
                                            </label>
                                            <input
                                                id="auth-otp"
                                                ref={firstInputRef}
                                                type="text"
                                                inputMode="numeric"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                required
                                                autoComplete="one-time-code"
                                                maxLength={6}
                                                placeholder="000000"
                                                className="w-full text-center tracking-[0.5em] text-2xl py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-black text-gray-900"
                                            />
                                            <p className="text-xs text-center text-gray-400 mt-2">
                                                <ShieldCheck size={12} className="inline mr-1" />
                                                OTP expires in 10 minutes
                                            </p>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading || otp.length < 6}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20 transition-all disabled:opacity-70 flex items-center justify-center"
                                        >
                                            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Verify Identity'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => { setStep('details'); setOtp(''); setError(null); }}
                                            className="w-full text-center text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
                                        >
                                            ← Change mobile number
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
