"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/lib/store";
import AirportSelect from "./AirportSelect";
import { Search, Calendar, Users, ArrowRight } from "lucide-react";

export default function SearchForm() {
    const router = useRouter();
    const { searchParams, setSearchParams } = useSearchStore();

    const [origin, setOrigin] = useState(searchParams.origin);
    const [destination, setDestination] = useState(searchParams.destination);
    const [departureDate, setDepartureDate] = useState<string>("");
    const [cabinClass, setCabinClass] = useState(searchParams.cabinClass);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!origin || !destination) {
            alert('Please select both origin and destination airports');
            return;
        }

        setSearchParams({
            origin,
            destination,
            departureDate: departureDate ? new Date(departureDate) : null,
            returnDate: null,
            passengers: 1,
            cabinClass,
        });

        router.push("/results");
    };

    // Get tomorrow's date as minimum
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="w-full max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Flight</h2>
                    <p className="text-gray-600">Search across 400+ airlines with real-time pricing</p>
                </div>

                {/* Flight Route */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative">
                        <AirportSelect
                            value={origin}
                            onChange={setOrigin}
                            placeholder="Where from?"
                            label="Departure"
                        />
                    </div>

                    <div className="relative">
                        <div className="hidden md:flex absolute -left-8 top-1/2 transform -translate-y-1/2 z-10">
                            <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>
                        <AirportSelect
                            value={destination}
                            onChange={setDestination}
                            placeholder="Where to?"
                            label="Destination"
                        />
                    </div>
                </div>

                {/* Travel Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span>Departure Date</span>
                            </div>
                        </label>
                        <input
                            type="date"
                            min={minDate}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Class */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-blue-600" />
                                <span>Cabin Class</span>
                            </div>
                        </label>
                        <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all text-gray-900 bg-white"
                            value={cabinClass}
                            onChange={(e) => setCabinClass(e.target.value)}
                        >
                            <option value="economy">Economy</option>
                            <option value="premium_economy">Premium Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First Class</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                >
                    <Search className="h-6 w-6" />
                    Search Flights
                </button>

                {/* Helper Text */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Searching {origin && destination ? `${origin} → ${destination}` : 'all available routes'}
                </p>
            </form>
        </div>
    );
}
