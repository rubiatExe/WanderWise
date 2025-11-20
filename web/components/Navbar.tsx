"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../lib/store";

export default function Navbar() {
    const pathname = usePathname();
    const { user } = useUserStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Plane className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">WanderWise</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/search"
                            className={`text-sm font-medium transition-colors ${isActive("/search") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Search
                        </Link>
                        <Link
                            href="/dashboard"
                            className={`text-sm font-medium transition-colors ${isActive("/dashboard") ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Dashboard
                        </Link>

                        {/* User Profile / Sign In */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            {user ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                                        {user.displayName ? user.displayName[0] : "U"}
                                    </div>
                                </div>
                            ) : (
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <Link
                            href="/search"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Search
                        </Link>
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
