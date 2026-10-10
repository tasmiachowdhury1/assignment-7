"use client"
import React from "react"
import { useEffect, useState } from "react"
type Product = {
    id: number
    nameBn: string
    image: string
    unit: string
    today: number
    change: {
        dir: "up" | "down"
        pct: number
    }
}
export default function PriceTicker() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "https://api.abcz.workers.dev/api/bazardor/products"
                )
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts()
    }, [])
    return (
        <div className="overflow-hidden border-b border-(--border) bg-white">
            <div className="flex min-w-max animate-[ticker_60s_linear_infinite] items-center gap-6 py-2.5">
                {[...products, ...products].map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="flex items-center gap-1 text-sm"
                    >
                        <span>{item.image}</span>
                        <span className="font-medium text-(--foreground)">
                            {item.nameBn}
                        </span>

                        <span className="font-semibold text-(--primary)">
                            {item.today} টাকা/{item.unit}
                        </span>
                        <span
                            className={
                                item.change.dir === "up"
                                    ? "font-semibold text-(--price-hike)"
                                    : item.change.dir === "down"
                                        ? "font-semibold text-(--primary-light)"
                                        : "font-semibold text-(--muted)"
                            }
                        >
                            {item.change.dir === "up"
                                ? "▲"
                                : item.change.dir === "down"
                                    ? "▼"
                                    : "—"}{" "}
                            {item.change.pct}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}