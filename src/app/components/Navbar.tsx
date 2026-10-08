"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

type Category = {
    id: string
    slug: string
    nameBn: string
    icon: string
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [todaysDate, setTodaysDate] = useState("")
    useEffect(() => {
        setTodaysDate(
            new Intl.DateTimeFormat("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }).format(new Date())
        )
    }, [])
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    "https://api.api-store.workers.dev/api/bazardor/categories")
                if (!response.ok) {
                    throw new Error("Failed to fetch categories")
                }
                const data = await response.json()
                setCategories(data)
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [])

    return (
        <header className="border-b border-(--border) bg-white">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex min-h-20 items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo-icon.png" alt="Bazar Dor" width={20}
                            height={20} />
                        <div>
                            <h1 className="text-xl font-bold text-(--primary-light)">
                                বাজার দর
                            </h1>
                            <p className="text-xs text-(--primary-dark)">
                                {todaysDate}
                            </p>
                        </div>
                    </Link>
                    <div className="hidden items-center gap-3 sm:flex">
                        <Link
                            href="/signin"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-(--primary) hover:bg-(--primary-lighter)"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-lg bg-(--primary) px-4 py-2 text-sm font-medium text-white hover:bg-(--primary-dark)"
                        >
                            সাইন আপ
                        </Link>
                    </div>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-lg p-2 text-(--primary) sm:hidden"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
                <div className="border-t border-gray-300">
                    <nav className="hidden items-center gap-2 pb-3 sm:flex">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={
                                    category.slug
                                        ? `/category/${category.slug}`
                                        : "/"
                                }
                                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-(--muted) hover:bg-(--primary-lighter) hover:text-(--primary)"
                            >
                                <span>
                                    {category.icon}
                                </span>

                                <span>{category.nameBn}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {menuOpen && (
                    <div className="border-t border-(--border) py-4 sm:hidden">
                        <nav className="flex flex-col gap-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={
                                        category.slug
                                            ? `/category/${category.slug}`
                                            : "/"
                                    }
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-(--muted) hover:bg-(--primary-lighter)"
                                >
                                    <span className="text-lg">
                                        {category.icon}
                                    </span>

                                    <span>{category.nameBn}</span>
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-4 flex gap-2 border-t border-(--border) pt-4">
                            <Link
                                href="/signin"
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 rounded-lg border border-(--border) py-2 text-center text-sm"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="flex-1 rounded-lg bg-(--primary) py-2 text-center text-sm text-white"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}