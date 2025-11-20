"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Clock, ChevronDown, ChevronUp, ExternalLink, Users, Briefcase } from "lucide-react";
import PredictionBadge from "./PredictionBadge";
import { getAirlineName, getBookingLink } from "@/lib/airlines";
import { useSearchStore } from "@/lib/store";

export interface FlightResultProps {
    id: number;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    points: number;
    prediction: "book" | "wait";
    predictionConfidence?: number;
    expectedPriceChange?: number;
    stops?: number;
    aircraft?: string;
    flight_number?: string;
    cabin_class?: string;
    segments?: Array<{
        departure: {
            iataCode: string;
            at: string;
        };
        arrival: {
            iataCode: string;
            at: string;
        };
        carrier: string;
        flight_number: string;
    }>;
}

export default function ResultCard(props: FlightResultProps) {
    const [expanded, setExpanded] = useState(false);
    const { searchParams } = useSearchStore();

    const airlineName = getAirlineName(props.airline);
    const bookingUrl = getBookingLink(
        props.airline,
        searchParams.origin,
        searchParams.destination,
        searchParams.departureDate?.toISOString().split('T')[0] || ''
    );

    return (
        <motion.div
            layout
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
            <div className="flex justify-between items-start">
                {/* Left: Flight Info */}
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Plane className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{airlineName}</h3>
                        <p className="text-sm text-gray-600">
                            {props.flight_number || props.airline}
                            {props.aircraft && ` • ${props.aircraft}`}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
                            <div>
                                <span className="font-semibold">{props.departureTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>{props.duration}</span>
                                {props.stops !== undefined && (
                                    <span className="text-gray-500">
                                        • {props.stops === 0 ? 'Nonstop' : `${props.stops} stop${props.stops > 1 ? 's' : ''}`}
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="font-semibold">{props.arrivalTime}</span>
                            </div>
                        </div>
                        {props.cabin_class && (
                            <div className="flex items-center gap-2 mt-2">
                                <Briefcase className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600 capitalize">{props.cabin_class}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Price & Action */}
                <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${props.price}</div>
                    <div className="text-sm text-gray-600">{props.points.toLocaleString()} pts</div>
                    <div className="mt-2">
                        <PredictionBadge
                            prediction={props.prediction}
                            confidence={props.predictionConfidence}
                            expectedChange={props.expectedPriceChange}
                        />
                    </div>

                    <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                        Book Flight
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
            </div>

            {/* Expandable Details */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
                {expanded ? (
                    <>
                        <ChevronUp className="h-4 w-4" />
                        Hide Details
                    </>
                ) : (
                    <>
                        <ChevronDown className="h-4 w-4" />
                        Show Flight Details
                    </>
                )}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                            {props.segments && props.segments.length > 0 ? (
                                <>
                                    <h4 className="font-semibold text-gray-900">Flight Segments</h4>
                                    {props.segments.map((segment, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {segment.carrier} {segment.flight_number}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {segment.departure.iataCode} → {segment.arrival.iataCode}
                                                    </p>
                                                </div>
                                                <div className="text-right text-sm">
                                                    <p className="text-gray-700">
                                                        {new Date(segment.departure.at).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                    <p className="text-gray-500">→</p>
                                                    <p className="text-gray-700">
                                                        {new Date(segment.arrival.at).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Aircraft</p>
                                            <p className="font-medium">{props.aircraft || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Cabin Class</p>
                                            <p className="font-medium capitalize">{props.cabin_class || 'Economy'}</p>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <p className="text-sm text-gray-700">
                                            <Users className="inline h-4 w-4 mr-1" />
                                            Standard seat selection available at booking
                                        </p>
                                    </div>
                                </>
                            )}

                            <div className="pt-2">
                                <a
                                    href={bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                                >
                                    Visit {airlineName} website to book →
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
