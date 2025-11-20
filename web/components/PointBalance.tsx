import { CreditCard } from "lucide-react";

export default function PointBalance() {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                    <h3 className="text-3xl font-bold">245,000 pts</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <CreditCard className="h-6 w-6 text-white" />
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100">Chase Ultimate Rewards</span>
                    <span className="font-semibold">120,000</span>
                </div>
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[49%]"></div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-100">Amex Membership Rewards</span>
                    <span className="font-semibold">125,000</span>
                </div>
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[51%]"></div>
                </div>
            </div>
        </div>
    );
}
