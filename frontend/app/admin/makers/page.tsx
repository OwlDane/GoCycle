"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    IconPlus, 
    IconEdit, 
    IconMapPin,
    IconPhone,
    IconPackage,
    IconRecycle,
    IconSearch
} from "@tabler/icons-react";
import { getEcoMakers } from "@/lib/showcase-api";
import type { EcoMaker } from "@/lib/showcase-api";

export default function MakersPage() {
    const [makers, setMakers] = useState<EcoMaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchMakers() {
            try {
                const data = await getEcoMakers();
                setMakers(data);
            } catch (error) {
                console.error("Failed to fetch makers:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMakers();
    }, []);

    const filteredMakers = makers.filter(maker => 
        maker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maker.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        maker.story.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Eco Makers</h1>
                    <p className="text-gray-500 mt-1">Manage eco-friendly makers and artisans</p>
                </div>
                <Link
                    href="/admin/makers/new"
                    className="flex items-center gap-2 bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#267347] transition-colors"
                >
                    <IconPlus size={20} />
                    Add Maker
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="mb-6">
                    <div className="relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search makers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Maker</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Products</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Waste Recycled</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMakers.map((maker) => (
                                <tr key={maker.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                                {maker.avatarUrl ? (
                                                    <Image
                                                        src={maker.avatarUrl}
                                                        alt={maker.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#2E8B57] text-white font-bold">
                                                        {maker.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{maker.name}</p>
                                                <p className="text-sm text-gray-500 line-clamp-1">{maker.story}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <IconMapPin size={16} />
                                            {maker.location}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <IconPhone size={16} />
                                            {maker.phone}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <IconPackage size={16} />
                                            {maker.productsCreated}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <IconRecycle size={16} />
                                            {maker.wasteRecycled.toFixed(1)} kg
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <Link
                                            href={`/admin/makers/${maker.id}/edit`}
                                            className="inline-flex items-center gap-1 text-[#2E8B57] hover:text-[#267347] font-medium text-sm"
                                        >
                                            <IconEdit size={16} />
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredMakers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No makers found</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredMakers.length} of {makers.length} makers
                </div>
            </div>
        </div>
    );
}
