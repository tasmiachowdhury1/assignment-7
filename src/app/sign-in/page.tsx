"use client";
import React from 'react';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, authClient } from "@/app/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [socialLoading, setSocialLoading] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const { error } = await signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                setErrorMessage(error.message || "Sign in failed.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign in error:", error);
            setErrorMessage("Could not sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    }
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
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold">সাইন ইন</h1>
                <p className="mt-2 text-(--muted)">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
            >


                {errorMessage && (
                    <p role="alert" className="rounded-lg bg-(--price-hike-lighter) p-3 text-sm text-(--price-hike)">
                        {errorMessage}
                    </p>
                )}

                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                        ইমেইল
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-(--muted) px-4 py-3 outline-none"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">
                        পাসওয়ার্ড
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-(--muted) px-4 py-3 outline-none"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-(--primary-light) px-4 py-3 font-semibold text-white hover:bg-(--primary) disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                    {loading ? "Signing in..." : "সাইন ইন"}
                </button>
                <p className='text-sm m-1 font-semibold text-center'>অথবা</p>

                <div className='flex gap-3'>
                    <button
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
                <p className="text-center text-sm text-(--muted)">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/sign-up" className="font-semibold text-(--primary-light) hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>
            </form>
            <p className='text-(--muted) mt-4'><Link href="/">← হোম পেজে ফিরে যান</Link></p>
        </main>
    );
}