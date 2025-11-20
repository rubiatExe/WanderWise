"use client";

import { useEffect } from "react";
import { useAlertStore } from "../lib/store";
import { Bell } from "lucide-react";

export default function AlertFeed() {
    const { alerts, addAlert } = useAlertStore();

    useEffect(() => {
        // Mock WebSocket connection
        const interval = setInterval(() => {
            const newAlert = {
                id: Date.now(),
                message: `New deal found: NYC to LON for $${Math.floor(Math.random() * 200) + 400}!`,
                timestamp: new Date().toLocaleTimeString(),
            };
            addAlert(newAlert);
        }, 5000);

        return () => clearInterval(interval);
    }, [addAlert]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
            <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Live Alerts</h3>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {alerts.length === 0 ? (
                    <p className="text-gray-500 text-sm">Waiting for alerts...</p>
                ) : (
                    alerts.map((alert) => (
                        <div key={alert.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100 animate-in fade-in slide-in-from-top-2">
                            <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
