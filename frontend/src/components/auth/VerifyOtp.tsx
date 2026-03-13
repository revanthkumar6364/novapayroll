"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ChevronRight, RefreshCcw, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface VerifyOtpProps {
    destination: string;
    onSuccess: () => void;
}

export default function VerifyOtp({ destination, onSuccess }: VerifyOtpProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length < 6) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/otp/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination, otp: otpString }),
            });

            if (res.ok) {
                setVerifying(true);
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            } else {
                const data = await res.json();
                setError(data.message || "Invalid OTP");
            }
        } catch (err) {
            setError("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        if (timer > 0) return;
        setTimer(60);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/otp/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination, channel: 'phone' }),
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (verifying) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Verified!</h2>
                <p className="text-muted-foreground">Taking you to onboarding...</p>
            </motion.div>
        );
    }

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={32} />
                </div>
                <h1 className="text-2xl font-bold mb-2">Verify your phone</h1>
                <p className="text-muted-foreground">We&apos;ve sent a 6-digit code to <span className="text-foreground font-medium">{destination}</span></p>
            </div>

            <div className="flex justify-between gap-2 mb-8">
                {otp.map((digit, i) => (
                    <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                ))}
            </div>

            {error && <p className="text-destructive text-sm text-center mb-6 font-medium">{error}</p>}

            <button
                onClick={handleVerify}
                disabled={loading || otp.join("").length < 6}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-6"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Continue"}
                {!loading && <ChevronRight size={18} />}
            </button>

            <div className="text-center">
                <button
                    onClick={resendOtp}
                    disabled={timer > 0}
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${timer > 0 ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:underline'}`}
                >
                    <RefreshCcw size={14} className={timer > 0 ? '' : 'animate-spin-once'} />
                    {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
                </button>
            </div>
        </div>
    );
}
