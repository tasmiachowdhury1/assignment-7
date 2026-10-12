"use client"
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";
function Skeleton() {
    return (
        <main className="min-h-[70vh] animate-pulse bg-[#f0f5f0] px-4 py-12">
            <div className="mx-auto max-w-2xl">
                <div className="mb-6 space-y-3">
                    <div className="h-8 w-48 rounded bg-(--muted)" />
                    <div className="h-4 w-64 max-w-full rounded bg-(--muted)" />
                </div>

                <section className="mb-5 flex items-center gap-4 rounded-2xl border border-(--border) bg-white p-5">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-(--muted)" />

                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-36 rounded bg-(--muted)" />
                        <div className="h-4 w-48 max-w-full rounded bg-(--muted)" />
                    </div>

                    <div className="h-10 w-24 rounded-lg bg-(--muted)" />
                </section>

                <section className="space-y-5 rounded-2xl border border-(--border) bg-white p-6">
                    <div className="h-6 w-20 rounded bg-(--muted)" />

                    <div className="space-y-2">
                        <div className="h-4 w-12 rounded bg-(--muted)" />
                        <div className="h-12 w-full rounded-lg bg-(--muted)" />
                    </div>

                    <div className="h-12 w-full rounded-lg bg-(--muted)" />
                </section>
            </div>
        </main>
    );
}

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending, error } = useSession();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name ?? "");
        }
    }, [session?.user?.name]);
    async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!name.trim()) {
            setMessage("নাম লিখুন।");
            return;
        }
        setSaving(true);
        setMessage("");
        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });
            if (error) {
                setMessage(error.message || "প্রোফাইল আপডেট করা যায়নি।");
            } else {
                setMessage("প্রোফাইল আপডেট হয়েছে!");
            }
        } catch (err) {
            console.error("Profile update error:", err);
            setMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setSaving(false);
        }
    }

    async function handleSignOut() {
        setSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                setMessage(error.message || "সাইন আউট করা যায়নি।");
                return;
            }

            router.replace("/");
            router.refresh();
        } catch (err) {
            console.error("Sign out error:", err);
            setMessage("সাইন আউট করতে সমস্যা হয়েছে।");
        } finally {
            setSigningOut(false);
        }
    }

    if (isPending) {
        return <Skeleton />;
    }

    if (error) {
        return (
            <main className="p-10 text-center">
                সেশন লোড করা যায়নি। আবার চেষ্টা করুন।
            </main>
        );
    }

    if (!session) {
        return (
            <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6">
                <h1 className="text-2xl text-(--primary-light) font-bold">প্রথমে সাইন ইন করুন</h1>
                <button
                    onClick={() => router.push("/sign-in")}
                    className="rounded-lg bg-(--primary) px-5 py-3 font-semibold text-white cursor-pointer"
                >
                    সাইন ইন
                </button>
            </main>
        );
    }

    const user = session.user;
    const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

    return (
        <main className="min-h-[70vh] bg-[#f0f5f0] px-4 py-12">
            <div className="mx-auto max-w-2xl">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">
                        আমার প্রোফাইল
                    </h1>
                    <p className="mt-1 text-sm text-(--muted)">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </header>

                <section className="mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-(--border) bg-white p-5">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt="Profile"
                            className="h-16 w-16 rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--primary-light) text-2xl font-bold text-white">
                            {initial}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold">
                            {user.name || "ব্যবহারকারী"}
                        </h2>
                        <p className="break-all text-sm text-(--muted)">{user.email}</p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="rounded-lg border border-(--price-hike-light) px-4 py-2 text-sm font-medium text-(--price-hike) hover:bg-(price-hike-light) disabled:opacity-60"
                    >
                        {signingOut ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
                    </button>
                </section>

                <section className="rounded-2xl border border-(--border) bg-white p-6">
                    <h2 className="mb-6 text-lg font-bold text-(--primary-dark)">তথ্য</h2>

                    <form onSubmit={updateProfile} className="space-y-4">
                        <div>
                            <label htmlFor="profile-name" className="mb-2 block text-sm">
                                নাম
                            </label>
                            <input
                                id="profile-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-lg border border-[#dfe8df] px-4 py-3 outline-none focus:border-(--primary-light)"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={saving || !name.trim()}
                            className="w-full rounded-lg bg-(--primary) px-4 py-3 font-semibold text-white shadow-sm hover:bg-(--primary-light) disabled:opacity-60"
                        >
                            {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>

                </section>
            </div>
        </main>
    );
}