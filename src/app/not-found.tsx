import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-(--primary-dark)">
            <div className="max-w-md w-full bg-(--primary-soft) border-slate-700 rounded-xl p-8 text-center shadow-xl">
                <span className="px-3 py-1 bg-(--primary)/10 text-(--purple) border border-(--border) rounded-full text-sm font-semibold ">
                    404 Error
                </span>
                <h1 className="text-3xl font-bold mt-2 mb-2">Page Not Found</h1>
                <p className="text-(--muted) mb-6 text-sm leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="flex">
                    <Link
                        href="/"
                        className="flex-1 py-2.5 bg-(--primary) hover:bg-(--primary-dark) text-white rounded-lg font-medium text-sm text-center"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;