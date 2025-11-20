"use client";

import { useEffect, useState } from "react";
import { useSearchStore } from "@/lib/store";
import { searchFlights, FlightResult } from "@/lib/mockData";
import ResultCard from "@/components/ResultCard";
import PricePredictionChart from "@/components/PricePredictionChart";
import SortControls, { SortOption } from "@/components/SortControls";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const ResultSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
);

export default function ResultsPage() {
    const { searchParams } = useSearchStore();
    const [results, setResults] = useState<FlightResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>('price-asc');

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchParams.origin || !searchParams.destination) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const data = await searchFlights(
                searchParams.origin,
                searchParams.destination,
                searchParams.departureDate
            );
            setResults(data);
            setLoading(false);
        };

        fetchResults();
    }, [searchParams]);

    const parseDuration = (duration: string): number => {
        const hours = duration.match(/(\d+)h/i)?.[1] || '0';
        const minutes = duration.match(/(\d+)m/i)?.[1] || '0';
        return parseInt(hours) * 60 + parseInt(minutes);
    };

    const sortResults = (results: FlightResult[], sortOption: SortOption): FlightResult[] => {
        const sorted = [...results];

        switch (sortOption) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'duration-asc':
                return sorted.sort((a, b) => {
                    const durationA = parseDuration(a.duration);
                    const durationB = parseDuration(b.duration);
                    return durationA - durationB;
                });
            case 'stops-asc':
                return sorted.sort((a, b) => (a.stops || 0) - (b.stops || 0));
            default:
                return sorted;
        }
    };

    const sortedResults = sortResults(results, sortBy);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {searchParams.origin} → {searchParams.destination}
                </h1>
                <p className="text-gray-600 mb-8">
                    {searchParams.departureDate?.toLocaleDateString()} • {sortedResults.length} flights found
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <SortControls onSortChange={setSortBy} currentSort={sortBy} />

                        {loading ? (
                            <div className="space-y-4">
                                <ResultSkeleton />
                                <ResultSkeleton />
                                <ResultSkeleton />
                            </div>
                        ) : sortedResults.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                                <p className="text-gray-500 text-lg mb-4">No search results found</p>
                                <p className="text-gray-400 text-sm mb-6">Please use the search page to find flights</p>
                                <a
                                    href="/search"
                                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Go to Search
                                </a>
                            </div>
                        ) : (
                            <motion.div
                                className="space-y-4"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                {sortedResults.map((result) => (
                                    <motion.div key={result.id} variants={item}>
                                        <ResultCard {...result} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <PricePredictionChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
