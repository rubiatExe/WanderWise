"use client";

import { useState } from "react";
import { ArrowUpDown, DollarSign, Clock, Plane } from "lucide-react";

export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'stops-asc';

interface SortControlsProps {
    onSortChange: (sort: SortOption) => void;
    currentSort: SortOption;
}

export default function SortControls({ onSortChange, currentSort }: SortControlsProps) {
    const sortOptions = [
        { value: 'price-asc' as SortOption, label: 'Price: Low to High', icon: DollarSign },
        { value: 'price-desc' as SortOption, label: 'Price: High to Low', icon: DollarSign },
        { value: 'duration-asc' as SortOption, label: 'Duration: Shortest', icon: Clock },
        { value: 'stops-asc' as SortOption, label: 'Fewest Stops', icon: Plane },
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                    <ArrowUpDown className="h-5 w-5" />
                    <span>Sort by:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {sortOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.value}
                                onClick={() => onSortChange(option.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${currentSort === option.value
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-sm font-medium">{option.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
