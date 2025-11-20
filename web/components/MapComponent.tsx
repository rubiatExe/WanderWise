"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const DEALS = [
    { id: 1, city: "London", lat: 51.505, lng: -0.09, price: 450 },
    { id: 2, city: "Paris", lat: 48.8566, lng: 2.3522, price: 480 },
    { id: 3, city: "Tokyo", lat: 35.6762, lng: 139.6503, price: 850 },
    { id: 4, city: "New York", lat: 40.7128, lng: -74.0060, price: 0 }, // Origin
];

export default function MapComponent() {
    return (
        <MapContainer center={[40.7128, -74.0060]} zoom={3} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {DEALS.map((deal) => (
                <Marker key={deal.id} position={[deal.lat, deal.lng]} icon={icon}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold">{deal.city}</h3>
                            {deal.price > 0 ? (
                                <p className="text-green-600 font-bold">${deal.price}</p>
                            ) : (
                                <p className="text-gray-500">Origin</p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
