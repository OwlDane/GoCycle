"use client";

import { useEffect, useState } from "react";
import { 
    IconBottle,
    IconRecycle,
    IconTools,
    IconLeaf,
    IconUsers,
    IconPackage,
    IconBook,
    IconRefresh
} from "@tabler/icons-react";
import { getImpactStats } from "@/lib/showcase-api";
import type { ImpactStats } from "@/lib/showcase-api";

export default function ImpactStatsPage() {
    const [stats, setStats] = useState<ImpactStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            const data = await getImpactStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch impact stats:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRefresh = async () => {
        setUpdating(true);
        await fetchStats();
        setUpdating(false);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    const impactCards = [
        {
            title: "Total Bottles Saved",
            value: stats?.totalBottlesSaved.toLocaleString() || "0",
            icon: IconBottle,
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            title: "Total Waste Recycled",
            value: `${stats?.totalWasteRecycled.toFixed(1) || "0"} kg`,
            icon: IconRecycle,
            color: "bg-green-500",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            title: "Total DIY Created",
            value: stats?.totalDIYCreated.toLocaleString() || "0",
            icon: IconTools,
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
        },
        {
            title: "Total CO2 Reduced",
            value: `${stats?.totalCO2Reduced.toFixed(1) || "0"} kg`,
            icon: IconLeaf,
            color: "bg-emerald-500",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-600"
        },
        {
            title: "Community Members",
            value: stats?.communityMembers.toLocaleString() || "0",
            icon: IconUsers,
            color: "bg-orange-500",
            bgColor: "bg-orange-50",
            textColor: "text-orange-600"
        },
        {
            title: "Total Products",
            value: stats?.totalProducts.toLocaleString() || "0",
            icon: IconPackage,
            color: "bg-pink-500",
            bgColor: "bg-pink-50",
            textColor: "text-pink-600"
        },
        {
            title: "Total Tutorials",
            value: stats?.totalTutorials.toLocaleString() || "0",
            icon: IconBook,
            color: "bg-indigo-500",
            bgColor: "bg-indigo-50",
            textColor: "text-indigo-600"
        }
    ];

    const wasteByTypeCards = [
        { type: "Glass", value: stats?.wasteByType.glass || 0, color: "bg-cyan-100 text-cyan-800" },
        { type: "Metal", value: stats?.wasteByType.metal || 0, color: "bg-gray-100 text-gray-800" },
        { type: "Plastic", value: stats?.wasteByType.plastic || 0, color: "bg-blue-100 text-blue-800" },
        { type: "Textile", value: stats?.wasteByType.textile || 0, color: "bg-purple-100 text-purple-800" },
        { type: "Cardboard", value: stats?.wasteByType.cardboard || 0, color: "bg-amber-100 text-amber-800" }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Impact Statistics</h1>
                    <p className="text-gray-500 mt-1">Monitor environmental impact metrics</p>
                    {stats?.lastUpdated && (
                        <p className="text-xs text-gray-400 mt-1">
                            Last updated: {new Date(stats.lastUpdated).toLocaleString("id-ID")}
                        </p>
                    )}
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={updating}
                    className="flex items-center gap-2 bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#267347] transition-colors disabled:opacity-50"
                >
                    <IconRefresh size={20} className={updating ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {impactCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${card.bgColor} ${card.textColor} p-3 rounded-lg`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Waste by Type (kg)</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {wasteByTypeCards.map((item, index) => (
                        <div key={index} className="text-center">
                            <div className={`${item.color} rounded-lg p-4 mb-2`}>
                                <p className="text-2xl font-bold">{item.value.toFixed(1)}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-700">{item.type}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-2">About Impact Stats</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                    These statistics are automatically calculated based on products, tutorials, and user activities. 
                    The data reflects the collective environmental impact of the GoCycle community. 
                    Stats are updated in real-time as new content is added or users interact with the platform.
                </p>
            </div>
        </div>
    );
}
