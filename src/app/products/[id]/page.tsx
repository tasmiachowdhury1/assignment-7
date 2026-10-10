import React from "react"
import { notFound } from "next/navigation"

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor"
type Market =
    {
        market: string
        division: string
        max: number
        min: number
    }

type Product = {
    id: string | number
    nameBn: string
    image: string
    category: string
    categoryNameBn: string
    today: number
    yesterday: number
    unit: string
    change: {
        dir: string
        pct: number
    }
    markets: Market[]
}

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProductDetails({ params }: Props) {
    const { id } = await params

    const response = await fetch(
        `${BASE_URL}/products/${id}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }
    const product: Product = await response.json()
    const today = Number(product.today)
    const yesterday = Number(product.yesterday)
    const difference = today - yesterday
    const highestPrice = Math.max(
        ...product.markets.map((market) =>
            Number(market.max)
        )
    )

    const averagePrice =
        product.markets.reduce(
            (total, market) =>
                total +
                (Number(market.min) + Number(market.max)) / 2,
            0
        ) / product.markets.length

    return (
        <main className="min-h-screen px-4 py-6">
            <div className="mx-auto max-w-[1500px]">
                <p className="mb-5 text-sm text-gray-600">
                    হোম &gt {product.categoryNameBn} &gt {product.nameBn}
                </p>
                <section className="flex items-center justify-between gap-4 rounded-2xl border border-(--border) bg-[#fbfdfb] p-4 sm:p-5">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl  bg-gray-100 text-3xl">
                            {product.image}
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-xl font-extrabold sm:text-2xl">
                                {product.nameBn}
                            </h1>

                            <p className="mt-1 text-sm text-(--muted)">
                                প্রতি {product.unit}
                            </p>

                            <p className="mt-2 text-xs">
                                {difference > 0
                                    ? `গতকালের তুলনায় আজ দাম বেড়েছে ${difference.toLocaleString("bn-BD")} টাকা`
                                    : difference < 0
                                        ? `গতকালের তুলনায় আজ দাম কমেছে ${Math.abs(difference).toLocaleString("bn-BD")} টাকা`
                                        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-xl bg-gray-100 px-3 py-4 text-center sm:px-5">
                        <p className="text-xs text-(--muted)">আজকের দাম</p>

                        <p className="mt-1 text-2xl font-extrabold">
                            {today.toLocaleString("bn-BD")}
                        </p>

                        <p className="text-xs text-(--muted)">
                            টাকা / {product.unit}
                        </p>

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
                                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-sm font-semibold  text-(--muted)">
                                    — ০.০%
                                </span>
                            )}
                    </div>
                </section>
                <section className="mt-5 rounded-2xl border-(--border) bg-white p-4 sm:p-5">
                    <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-(--border) p-4">
                            <p className="text-xs text-(--muted)">সর্বনিম্ন দাম</p>

                            <p className="mt-2 text-2xl font-bold text-(--primary-light)">
                                {yesterday.toLocaleString("bn-BD")} {" "} <span className="text-sm font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-xs text-(--muted)">সবচেয়ে কম দামের বাজার</p>
                        </div>

                        <div className="rounded-xl border border-(--border) p-4">
                            <p className="text-xs text-(--muted)">সর্বোচ্চ দাম</p>

                            <p className="mt-2 text-2xl font-bold text-(--price-hike)">
                                {highestPrice.toLocaleString("bn-BD")}{" "} <span className="text-sm font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-xs text-(--muted)">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-(--border) p-4">
                            <p className="text-xs text-(--muted)">গড় দাম</p>

                            <p className="mt-2 text-2xl font-bold text-(--primary)">
                                {Math.round(averagePrice).toLocaleString("bn-BD")} {" "} <span className="text-sm font-normal">
                                    টাকা
                                </span>
                            </p>

                            <p className="mt-1 text-xs text-(--muted)">
                                প্রতি {product.unit}
                            </p>
                        </div>
                    </div>

                    <h2 className="mb-3 mt-6 text-base font-bold">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="overflow-x-auto rounded-xl border border-(--border)">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#fbfdfb] border overflow-hidden border-(--border) text-(--muted)">
                                <tr>
                                    <th className="px-3 py-3 font-semibold">বাজার</th>
                                    <th className="px-3 py-3 font-semibold">বিভাগ</th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        সর্বনিম্ন
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">
                                        সর্বোচ্চ
                                    </th>
                                    <th className="px-3 py-3 text-right font-semibold">গড়</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.markets.map((market) => (
                                    <tr
                                        key={market.market}
                                        className="border-b border-gray-400"
                                    >
                                        <td className="px-3 py-3">
                                            {market.market}
                                        </td>

                                        <td className="px-3 py-3">
                                            {market.division}
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            {Number(market.min).toLocaleString("bn-BD")} {" "} <span className="text-sm font-normal">
                                                টাকা
                                            </span>
                                        </td>

                                        <td className="px-3 py-3 text-right">
                                            {Number(market.max).toLocaleString("bn-BD")} {" "} <span className="text-sm font-normal">
                                                টাকা
                                            </span>
                                        </td>

                                        <td className="px-3 py-3 font-semibold text-right">
                                            {Math.round(
                                                (Number(market.min) + Number(market.max)) / 2
                                            ).toLocaleString("bn-BD")} <span className="text-sm font-semibold font-normal">
                                                টাকা
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    )
}