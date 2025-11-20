"use client";

import SearchForm from "@/components/SearchForm";
import { Sparkles, TrendingDown, Award, Shield } from "lucide-react";

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        WanderWise Flight Search
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find the best deals on flights from 400+ airlines with AI-powered price predictions
                    </p>
                </div>

                {/* Search Form */}
                <div className="mb-16">
                    <SearchForm />
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <TrendingDown className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Price Predictions</h3>
                        <p className="text-sm text-gray-600">
                            AI-powered predictions tell you the best time to book
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Miles & Points</h3>
                        <p className="text-sm text-gray-600">
                            Compare cash prices with award availability
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Sparkles className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Real-Time Data</h3>
                        <p className="text-sm text-gray-600">
                            Live pricing from Amadeus API with instant updates
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                        <p className="text-sm text-gray-600">
                            Direct links to airlines ensure you get the best rate
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
