"use client"
import React from "react"
import { useEffect, useMemo, useState } from "react"

type Product = {
    id: string | number
    slug?: string
    nameBn: string
    image: string
    category: string
    categoryNameBn: string
    categoryIcon?: string
    today: number
    yesterday: number
    unit: string
    change: {
        dir: string
        pct: number
    }
}
type Category = {
    id: string | number
    slug: string
    nameBn: string
    icon: string
}

type Props = {
    slug: string
}
const BASE_URL =
    "https://api.api-store.workers.dev/api/bazardor"

type SortOption = "default" | "price-low" | "price-high" | "name"

function getPriceChange(product: Product) {
    const today = Number(product.today)
    const yesterday = Number(product.yesterday)
}

export default function ProductByCategory({ slug }: Props) {
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [sortBy, setSortBy] = useState<SortOption>("default")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        let cancelled = false

        async function loadData() {
            setLoading(true)
            setError("")

            try {
                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        fetch(
                            `${BASE_URL}/products?category=${encodeURIComponent(slug)}`
                        ),
                        fetch(`${BASE_URL}/categories`),
                    ])

                if (!productsResponse.ok) {
                    throw new Error("পণ্য লোড করা যায়নি")
                }

                if (!categoriesResponse.ok) {
                    throw new Error("ক্যাটাগরি লোড করা যায়নি")
                }

                const productsData = await productsResponse.json()
                const categoriesData = await categoriesResponse.json()

                if (cancelled) return

                setProducts(
                    Array.isArray(productsData) ? productsData : []
                )

                setCategories(
                    Array.isArray(categoriesData) ? categoriesData : []
                )
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "কিছু একটা সমস্যা হয়েছে"
                    )
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadData()

        return () => {
            cancelled = true
        }
    }, [slug])

    const category = categories.find(
        (item) => item.slug === slug
    )

    const sortedProducts = useMemo(() => {
        const result = [...products]

        if (sortBy === "price-low") {
            result.sort(
                (a, b) => Number(a.today) - Number(b.today)
            )
        } else if (sortBy === "price-high") {
            result.sort(
                (a, b) => Number(b.today) - Number(a.today)
            )
        } else if (sortBy === "name") {
            result.sort((a, b) =>
                a.nameBn.localeCompare(b.nameBn, "bn")
            )
        }

        return result
    }, [products, sortBy])

    if (loading) {
        return (
            <div className="rounded-2xl border border-[#dfe8df] bg-white p-8 text-sm text-gray-500">
                পণ্য লোড হচ্ছে...
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-white p-6">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-3 cursor-pointer rounded-lg bg-[#087b3c] px-4 py-2 text-sm text-white"
                >
                    আবার চেষ্টা করুন
                </button>
            </div>
        )
    }

    const categoryName =
        category?.nameBn ??
        products[0]?.categoryNameBn ??
        "পণ্যের ক্যাটাগরি"

    const categoryIcon =
        category?.icon ?? products[0]?.categoryIcon ?? "🛒"

    return (
        <div>
            <section className="flex items-center gap-4 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#edf3ed] text-3xl">
                    {categoryIcon}
                </div>

                <div className="min-w-0">
                    <h1 className="text-2xl font-extrabold text-[#202b24]">
                        {categoryName}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>
            <section className="mt-4 flex items-center justify-end gap-3 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] px-4 py-3">
                <p className="text-sm text-gray-500">
                    সাজান
                </p>

                <select
                    value={sortBy}
                    onChange={(event) =>
                        setSortBy(event.target.value as SortOption)
                    }
                    className="cursor-pointer rounded-lg border border-[#d6e0d6] bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#087b3c]"
                    aria-label="পণ্য সাজান"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-low">দাম: কম থেকে বেশি</option>
                    <option value="price-high">দাম: বেশি থেকে কম</option>
                    <option value="name">নাম অনুযায়ী</option>
                </select>
            </section>
            <p className="my-4 text-sm text-gray-500">
                মোট {products.length}টি পণ্য দেখানো হচ্ছে
            </p>
            {sortedProducts.length === 0 ? (
                <div className="rounded-2xl border border-[#dfe8df] bg-white p-10 text-center">
                    <p className="text-gray-600">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => {
                        const change = getPriceChange(product)

                        return (
                            <article
                                key={product.id}
                                className="rounded-xl border border-(--border) bg-white px-4 py-8 transition-shadow hover:shadow-md cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                        {product.image}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-bold">
                                            {product.nameBn}
                                        </h3>
                                        <p className="text-xs text-gray-700">
                                            প্রতি {product.unit}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-end justify-between gap-2">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            আজকের দাম
                                        </p>
                                        <p className="text-[15px] font-bold text-gray-900">
                                            ৳{Number(product.today).toLocaleString("bn-BD")}{" "}
                                            <span className="text-sm font-normal">
                                                টাকা
                                            </span>
                                        </p>
                                    </div>
                                    {product.change?.dir === "up" && (
                                        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-sm font-semibold text-(--price-hike)">
                                            ▲ {Number(product.change.pct).toLocaleString("bn-BD")}%
                                        </span>
                                    )}
                                    {product.change?.dir === "down" && (
                                        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-sm font-semibold text-(--primary-light)">
                                            ▼ {Number(product.change.pct).toLocaleString("bn-BD")}%
                                        </span>
                                    )}
                                    {product.change?.dir !== "up" &&
                                        product.change?.dir !== "down" && (
                                            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-sm font-semibold  text-gray-500">
                                                — ০.০%
                                            </span>
                                        )}
                                </div>
                            </article>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
