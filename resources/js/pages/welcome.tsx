import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
                </div>

                <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400 backdrop-blur-sm">
                            <span className="size-2 rounded-full bg-emerald-400" />
                            Premium Auto Marketplace
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Find Your
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"> Dream Car</span>
                        </h1>

                        <p className="max-w-lg text-lg leading-relaxed text-gray-400">
                            Browse hundreds of verified listings, book test drives, and drive home
                            with confidence. Your next car is just a click away.
                        </p>

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110"
                            >
                                Go to Dashboard
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href={login()}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110"
                                >
                                    Sign In
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
                                >
                                    Create Account
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </Link>
                            </div>
                        )}

                        <div className="flex items-center gap-6 pt-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <svg className="size-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verified Listings
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="size-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Secure Payments
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="size-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                24/7 Support
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="relative mx-auto aspect-square w-full max-w-sm">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-2xl" />
                            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
                                <svg className="mb-6 h-24 w-24 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M5 17a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2M5 17h14M5 17l-1 4h16l-1-4" />
                                    <circle cx="7" cy="18" r="2" />
                                    <circle cx="17" cy="18" r="2" />
                                    <path d="M9 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3 className="text-xl font-semibold text-white">AutoDeal</h3>
                                <p className="mt-1 text-center text-sm text-gray-500">
                                    Premium automotive marketplace
                                </p>
                                <div className="mt-6 flex gap-3">
                                    <div className="size-2 rounded-full bg-blue-400" />
                                    <div className="size-2 rounded-full bg-cyan-400" />
                                    <div className="size-2 rounded-full bg-purple-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-16 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} AutoDeal. All rights reserved.
                </div>
            </div>
        </>
    );
}
