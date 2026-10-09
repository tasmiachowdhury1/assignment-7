import React from 'react';
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-12 py-8 border-t border-(--border) bg-white">
            <div className='flex mx-auto max-w-[1500px] justify-between'>
                <p className='text-sm'>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p className='text-sm'>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>

        </footer>
    );
}