"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

const Hero = () => {
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
    return (

        <section className="mt-10 max-w-[1500px] mx-auto bg-white rounded-2xl">
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-12 px-6 py-2 sm:px-8 lg:px-8 ">
                <div>
                    <p className="text-lg bg-(--primary-lighter) rounded-full p-2 w-45 justify-center text-(--primary-light)">
                        {todaysDate}
                    </p>
                    <h1 className="mt-4 text-xl font-bold text-black sm:text-4xl lg:text-4xl">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="mt-5 max-w-lg text-base leading-7 text-(--muted) sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <Link href="#products"
                        className="mt-7 inline-block rounded-2xl bg-(--primary-light) px-6 py-3 text-lg font-semibold  text-white hover:bg-(--primary)">সব পণ্য দেখুন
                    </Link>
                </div>
                <div className="relative">
                    <div className="relative h:64 ml-auto w-full max-w-md sm:h-95">
                        <Image
                            src="/bazar-hero.png"
                            alt="Working out"
                            fill priority
                            className="object-contain" sizes="(max-width:1030px) 500px" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;