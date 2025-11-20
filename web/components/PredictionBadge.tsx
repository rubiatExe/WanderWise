"use client";

import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface PredictionBadgeProps {
    prediction: 'book' | 'wait';
    confidence?: number;
    expectedChange?: number;
    daysToWait?: number;
}

export default function PredictionBadge({
    prediction,
    confidence = 0,
    expectedChange = 0,
    daysToWait = 4
}: PredictionBadgeProps) {
    const isBook = prediction === 'book';
    const confidencePercent = Math.round(confidence * 100);

    return (
        <div className="space-y-2">
            {/* Main Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${isBook
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                }`}>
                {isBook ? (
                    <>
                        <TrendingDown className="h-5 w-5" />
                        <span>Book Now</span>
                    </>
                ) : (
                    <>
                        <TrendingUp className="h-5 w-5" />
                        <span>Wait {daysToWait} Days</span>
                    </>
                )}
            </div>

            {/* Details */}
            {confidence > 0 && (
                <div className="text-xs text-gray-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{confidencePercent}% confidence</span>
                    {expectedChange !== 0 && (
                        <span className={expectedChange < 0 ? 'text-green-600' : 'text-red-600'}>
                            ({expectedChange < 0 ? '' : '+'}{expectedChange > 0 ? `$${expectedChange}` : `-$${Math.abs(expectedChange)}`})
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
