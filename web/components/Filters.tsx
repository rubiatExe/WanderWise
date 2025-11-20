"use client";

import { useState } from "react";

export default function Filters() {
    const [filters, setFilters] = useState({
        prioritizeMiles: false,
        showHiddenDeals: false,
    });

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-6 max-w-4xl mx-auto">
            <div className="flex gap-6 justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={filters.prioritizeMiles}
                        onChange={(e) => setFilters({ ...filters, prioritizeMiles: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Prioritize Miles/Points</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={filters.showHiddenDeals}
                        onChange={(e) => setFilters({ ...filters, showHiddenDeals: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Show Hidden Deals</span>
                </label>
            </div>
        </div>
    );
}
