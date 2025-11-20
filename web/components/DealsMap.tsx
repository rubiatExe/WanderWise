"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-500">
            Loading Map...
        </div>
    ),
});

export default function DealsMap() {
    return <MapComponent />;
}
