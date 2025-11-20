"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Map, CreditCard } from "lucide-react";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Travel Smarter, Not Harder
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">
              The intelligent travel companion that predicts prices, optimizes rewards, and finds hidden deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why WanderWise?</h2>
            <p className="text-xl text-gray-600">Everything you need to book the perfect trip.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div variants={item} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Price Prediction</h3>
              <p className="text-gray-600">
                Know exactly when to book. Our AI analyzes historical data to predict if prices will drop or rise.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={item} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rewards Optimization</h3>
              <p className="text-gray-600">
                Maximize your points. We calculate the best transfer partners and redemption values for your trip.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={item} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Map className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hidden Deals</h3>
              <p className="text-gray-600">
                Discover error fares and secret routes. Our scrapers find deals that other search engines miss.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
