'use client';

import { useState, useRef, useEffect } from 'react';
import { searchAirports, AIRPORTS } from '@/lib/airports';

interface AirportSelectProps {
    value: string;
    onChange: (code: string) => void;
    placeholder: string;
    label: string;
}

export default function AirportSelect({ value, onChange, placeholder, label }: AirportSelectProps) {
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState(AIRPORTS.slice(0, 10));
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Update display text when value changes
    useEffect(() => {
        if (value) {
            const airport = AIRPORTS.find(a => a.code === value);
            if (airport) {
                setQuery(`${airport.code} - ${airport.name}`);
            }
        }
    }, [value]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setShowDropdown(true);

        const filtered = searchAirports(newQuery);
        setResults(filtered.length > 0 ? filtered : AIRPORTS.slice(0, 10));
    };

    const handleSelect = (code: string, name: string) => {
        setQuery(`${code} - ${name}`);
        onChange(code);
        setShowDropdown(false);
    };

    const handleFocus = () => {
        setShowDropdown(true);
        if (!query) {
            setResults(AIRPORTS.slice(0, 10));
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={handleFocus}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            {showDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {results.length === 0 ? (
                        <div className="px-4 py-3 text-gray-500 text-sm">
                            No airports found
                        </div>
                    ) : (
                        results.map((airport) => (
                            <button
                                key={airport.code}
                                onClick={() => handleSelect(airport.code, airport.name)}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-semibold text-blue-600">
                                            {airport.code}
                                        </span>
                                        <span className="text-gray-700 ml-2">
                                            {airport.name}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {airport.city}, {airport.country}
                                    </span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
