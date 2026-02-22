"use client";

import { useEffect, useState } from "react";
import { 
    IconPackage, 
    IconTools, 
    IconUsers, 
    IconChartLine,
    IconEye,
    IconHeart,
    IconTrendingUp,
    IconRecycle
} from "@tabler/icons-react";
import { getImpactStats, getShowcaseProducts, getDIYTutorials, getEcoMakers } from "@/lib/showcase-api";
import type { ImpactStats, ShowcaseProduct, DIYTutorial, EcoMaker } from "@/lib/showcase-api";

interface DashboardStats {
    totalProducts: number;
    totalTutorials: number;
    totalMakers: number;
    totalViews: number;
    totalLikes: number;
    totalCompleted: number;
    wasteRecycled: number;
    co2Reduced: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const [impactData, products, tutorials, makers] = await Promise.all([
                    getImpactStats(),
                    getShowcaseProducts(),
                    getDIYTutorials(),
                    getEcoMakers()
                ]);

                const totalViews = products.reduce((sum, p) => sum + p.viewCount, 0);
                const totalLikes = products.reduce((sum, p) => sum + p.likeCount, 0);
                const totalCompleted = tutorials.reduce((sum, t) => sum + t.completedCount, 0);
                const wasteRecycled = impactData.totalWasteRecycled;
                const co2Reduced = impactData.totalCO2Reduced;

                setStats({
                    totalProducts: products.length,
                    totalTutorials: tutorials.length,
                    totalMakers: makers.length,
                    totalViews,
                    totalLikes,
                    totalCompleted,
                    wasteRecycled,
                    co2Reduced
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Products",
            value: stats?.totalProducts || 0,
            icon: IconPackage,
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            title: "Total Tutorials",
            value: stats?.totalTutorials || 0,
            icon: IconTools,
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
        },
        {
            title: "Eco Makers",
            value: stats?.totalMakers || 0,
            icon: IconUsers,
            color: "bg-green-500",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            title: "Total Views",
            value: stats?.totalViews || 0,
            icon: IconEye,
            color: "bg-orange-500",
            bgColor: "bg-orange-50",
            textColor: "text-orange-600"
        },
        {
            title: "Total Likes",
            value: stats?.totalLikes || 0,
            icon: IconHeart,
            color: "bg-pink-500",
            bgColor: "bg-pink-50",
            textColor: "text-pink-600"
        },
        {
            title: "Tutorials Completed",
            value: stats?.totalCompleted || 0,
            icon: IconTrendingUp,
            color: "bg-indigo-500",
            bgColor: "bg-indigo-50",
            textColor: "text-indigo-600"
        },
        {
            title: "Waste Recycled (kg)",
            value: stats?.wasteRecycled.toFixed(1) || 0,
            icon: IconRecycle,
            color: "bg-emerald-500",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-600"
        },
        {
            title: "CO2 Reduced (kg)",
            value: stats?.co2Reduced.toFixed(1) || 0,
            icon: IconChartLine,
            color: "bg-teal-500",
            bgColor: "bg-teal-50",
            textColor: "text-teal-600"
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with GoCycle today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => {
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
        </div>
    );
}
