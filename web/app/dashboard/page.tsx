"use client";

import AlertFeed from "@/components/AlertFeed";
import PointBalance from "@/components/PointBalance";
import RewardsGraph from "@/components/RewardsGraph";
import DealsMap from "@/components/DealsMap";
import { useUserStore } from "@/lib/store";
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

export default function DashboardPage() {
    const { user } = useUserStore();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
                    </h1>
                    <p className="text-gray-600">Here's what's happening with your travel goals.</p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Left Column: Stats & Alerts */}
                    <div className="space-y-8">
                        <motion.div variants={item}><PointBalance /></motion.div>
                        <motion.div variants={item} className="h-full"><AlertFeed /></motion.div>
                    </div>

                    {/* Right Column: Visualizations */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Rewards Graph */}
                        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">Rewards Optimization Path</h3>
                            <div className="h-[400px] bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                                <RewardsGraph />
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Optimal transfer path: Chase → British Airways → Flight (Value: 2.4cpp)
                            </p>
                        </motion.div>

                        {/* Map Placeholder (Will be replaced) */}
                        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4">Live Deals Map</h3>
                            <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden">
                                <DealsMap />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
