"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signUp, authClient } from "@/app/lib/auth-client";
import {
    User,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff,
    CheckCircle2,
} from "lucide-react";
export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [socialLoading, setSocialLoading] = useState("");

    const onSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(
            formData.get("confirmPassword") ?? ""
        );

        if (password !== confirmPassword) {
            setError("পাসওয়ার্ড দুটি মিলছে না!");
            return;
        }

        if (password.length < 8) {
            setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                console.error("Signup error details:", JSON.stringify(error, null, 2));
                console.error("Signup error message:", error.message);

                setError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
                return;
            }

            setSuccess(
                "সাইন-আপ সফল হয়েছে! প্রয়োজনে আপনার ইমেইল যাচাই করুন।"
            );

            console.log("Sign-up successful:", data);
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।"
            );
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleSignIn = async () => {
        setError("");
        setSuccess("");
        setSocialLoading("google");

        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };
    const handleGithubSignIn = async () => {
        setError("");
        setSuccess("");
        setSocialLoading("github");

        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });
    }
    return (
        <main className="flex flex-col min-h-[70vh] items-center justify-center px-4 py-10">
            <div className="mb-4">
                <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="mt-2 text-(--muted)">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>
            <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-(--border) bg-white p-6 shadow-sm sm:p-8">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        আপনার নাম
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="যেমন: রহিম উদ্দিন"
                        required
                        maxLength={100}
                        className="w-full rounded-lg border border-(--muted) px-4 py-3 outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-(--muted)"
                    >
                        ইমেইল
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        className="w-full rounded-lg border border-(--muted) px-4 py-3 outline-none"
                    />
                </div>
                <div className="relative">
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-semibold text-(--muted)"
                    >
                        পাসওয়ার্ড
                    </label>

                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        minLength={8}
                        required
                        className={"w-full rounded-lg border border-(--muted) px-4 py-3 outline-none pr-12"}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                            showPassword
                                ? "পাসওয়ার্ড লুকান"
                                : "পাসওয়ার্ড দেখান"
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-(--primary-light)"
                    >
                        {showPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}
                    </button>
                </div>
                <div className="relative">
                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-semibold text-(--muted)"
                    >
                        পাসওয়ার্ড নিশ্চিত করুন
                    </label>

                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                            showConfirmPassword ? "text" : "password"
                        }
                        autoComplete="new-password"
                        placeholder="আবার লিখুন"
                        minLength={8}
                        required
                        className={"w-full rounded-lg border border-(--muted) px-4 py-3 outline-none pr-12"}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                            showConfirmPassword
                                ? "পাসওয়ার্ড লুকান"
                                : "পাসওয়ার্ড দেখান"
                        }
                        className="flex items-center justify-center absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400  hover:text-(--primary-light)"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}
                    </button>

                </div>
                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-100 bg-(--price-hike-light) px-4 py-3 text-sm text-(--price-hike)"
                    >
                        {error}
                    </div>
                )}
                {success && (
                    <div
                        role="status"
                        className="flex items-start gap-2 rounded-xl border border-(--border) bg-green-50 px-4 py-3 text-sm text-(--primary-light)"
                    >
                        <CheckCircle2
                            size={19}
                            className="mt-0.5 shrink-0"
                        />
                        <span>{success}</span>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-(--primary-light) text-sm text-white shadow-sm hover:bg-(--primary-light) flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold  shadow-green-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                    {loading ? (
                        <>
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-(--muted) border-t-white" />
                            অ্যাকাউন্ট তৈরি হচ্ছে...
                        </>
                    ) : (
                        <>
                            অ্যাকাউন্ট তৈরি করুন
                        </>
                    )}
                </button>
                <div className='flex gap-3'><button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading || !!socialLoading}
                    className="mt-6 w-full text-sm items-center justify-center gap-3 rounded-xl border py-3 border-(--border) bg-white font-semibold text-(--muted) transition hover:bg-gray-50 disabled:opacity-60 cursor-pointer"
                >
                    {socialLoading === "google"
                        ? "Google খুলছে..."
                        : "Google দিয়ে চালিয়ে যান"}
                </button>
                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        disabled={loading || !!socialLoading}
                        className="mt-6 w-full text-sm items-center justify-center gap-3 rounded-xl border py-3 border-(--border) bg-white font-semibold text-(--muted) transition hover:bg-gray-50 disabled:opacity-60 cursor-pointer"
                    >
                        {socialLoading === "github"
                            ? "GitHub খুলছে..."
                            : "GitHub দিয়ে চালিয়ে যান"}
                    </button></div>
                <p className="mt-7 text-center text-sm text-(--muted)">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/sign-in"
                        className="font-semibold text-(--primary-light) hover:text-(--primary-light) hover:underline"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </form>
            <p className='text-(--muted) mt-4'><Link href="/">← হোম পেজে ফিরে যান</Link></p>
        </main>
    );
}