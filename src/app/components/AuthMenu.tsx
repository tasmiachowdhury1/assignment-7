"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/app/lib/auth-client";

export default function AuthMenu() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    async function handleSignOut() {
        setSigningOut(true);
        try {
            const { error } = await authClient.signOut();
            if (error) {
                alert(error.message || "সাইন আউট করা যায়নি।");
                return;
            }
            setOpen(false);
            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
            alert("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setSigningOut(false);
        }
    }


    if (isPending) {
        return (
            <div
                className="flex animate-pulse items-center gap-3"
                aria-label="অ্যাকাউন্ট লোড হচ্ছে"
                aria-busy="true"
            >
                <div className="h-9 w-9 rounded-full bg-(--muted)" />

                <div className="h-4 w-16 rounded bg-(--muted)" />

                <div className="h-9 w-9 rounded-lg bg-(--muted)" />
            </div>
        );
    }
    if (!session) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/sign-in"
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:text-(--primary-light)"
                >
                    সাইন ইন
                </Link>
                <Link
                    href="/sign-up"
                    className="rounded-lg bg-(--primary) px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-(--primary-light)"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const user = session.user;
    const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((previous) => !previous)}
                aria-expanded={open}
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full p-1.5 hover:bg-gray-100"
            >
                {user.image ? (
                    <img
                        src={user.image}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                    />
                ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary-light) font-semibold text-white">
                        {initial}
                    </span>
                )}

                <span className="max-w-28 truncate text-sm font-medium">
                    {user.name || "ব্যবহারকারী"}
                </span>
                <span className="text-xs text-(--muted)">▾</span>
            </button>

            {open && (
                <>
                    <button
                        type="button"
                        aria-label="Close account menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-(--border) bg-white p-4 shadow-lg">
                        <p className="truncate font-semibold text-(--primary)">
                            {user.name || "ব্যবহারকারী"}
                        </p>
                        <p className="mb-4 truncate text-sm text-(--muted)">
                            {user.email}
                        </p>

                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2 py-2 text-sm hover:bg-green-50"
                        >
                            👤 আমার প্রোফাইল
                        </Link>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={signingOut}
                            className="mt-1 w-full rounded-lg px-2 py-2 text-left text-sm text-(--price-hike) hover:bg-(--price-hike-light) disabled:opacity-60"
                        >
                            ↪ {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}