"use client"
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from "react";

type Product = {
    id: string | number
    nameBn: string
    image: string
    today: number
    unit: string
    change: {
        dir: string
        pct: number
    }
}
export default function PriceIncreased() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "https://api.api-store.workers.dev/api/bazardor/products"
                )

                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }

                const data = await response.json()
                setProducts(data)
                console.log("API response", data)
            }
            catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const topProducts = [...products]
        .filter((product) => product.change?.dir === "up" && Number(product.change.pct))
        .sort(
            (a, b) => Number(b.change.pct) - Number(a.change.pct)
        ).slice(0, 6)

    if (loading) {
        return <p className="mt-10">পণ্য লোড হচ্ছে...</p>
    }

    return (
        <section className="mt-10 mx-auto max-w-[1500px]">
            <h2 className="mb-4 text-xl font-bold text-(--price-hike)">
                ▲ <span className='text-black'>আজ দাম বেড়েছে</span>
            </h2>

            {topProducts.length === 0 ? (
                <p className="text-sm text-gray-500">
                    কোনো পণ্য পাওয়া যায়নি।
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {topProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} className="rounded-xl border border-(--border) bg-white px-4 py-8 transition-shadow hover:shadow-md cursor-pointer">
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
                                <div className='flex flex-col gap-1'>
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

                                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-sm font-semibold text-(--price-hike)">
                                    ▲{" "}
                                    {Number(product.change.pct).toLocaleString("bn-BD")}%
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}