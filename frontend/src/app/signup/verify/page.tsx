"use client";

import { useSearchParams, useRouter } from "next/navigation";
import VerifyOtp from "../../../components/auth/VerifyOtp";
import Link from "next/link";
import { Zap } from "lucide-react";
import Logo from "../../../components/ui/Logo";
import { Suspense } from "react";

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const destination = searchParams.get("destination") || "";

    const handleSuccess = () => {
        router.push("/onboarding");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <Logo className="inline-flex mb-6" />
                </div>
                <div className="premium-card p-8 md:p-10">
                    <VerifyOtp destination={decodeURIComponent(destination)} onSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    );
}

export default function SignupVerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
