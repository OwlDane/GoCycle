"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import type { DifficultyLevel, WasteType } from "@/lib/showcase-api";

export default function NewTutorialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty: "EASY" as DifficultyLevel,
        estimatedTime: "",
        primaryWasteType: "PLASTIC" as WasteType,
        wasteSaved: "",
        materials: "",
        tools: "",
        thumbnailFile: null as File | null
    });

    const difficulties: DifficultyLevel[] = ["EASY", "MEDIUM", "HARD"];
    const wasteTypes: WasteType[] = ["PLASTIC", "GLASS", "METAL", "CARDBOARD", "TEXTILE", "ORGANIC", "ELECTRONIC"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement API call to create tutorial
        console.log("Creating tutorial:", formData);

        setTimeout(() => {
            setLoading(false);
            router.push("/admin/tutorials");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/tutorials" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <IconArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Tutorial</h1>
                    <p className="text-gray-500 mt-1">Create a new DIY tutorial</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Tutorial Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="e.g., Membuat Pot Bunga dari Botol Plastik"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="Describe the tutorial..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                        <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        >
                            {difficulties.map(diff => (
                                <option key={diff} value={diff}>{diff}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Time (minutes)</label>
                        <input
                            type="number"
                            required
                            value={formData.estimatedTime}
                            onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="30"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Waste Type</label>
                        <select
                            value={formData.primaryWasteType}
                            onChange={(e) => setFormData({ ...formData, primaryWasteType: e.target.value as WasteType })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        >
                            {wasteTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Waste Saved (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            required
                            value={formData.wasteSaved}
                            onChange={(e) => setFormData({ ...formData, wasteSaved: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="0.5"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, thumbnailFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-2 rounded-lg hover:bg-[#267347] transition-colors disabled:opacity-50"
                    >
                        <IconDeviceFloppy size={20} />
                        {loading ? "Saving..." : "Save Tutorial"}
                    </button>
                    <Link href="/admin/tutorials" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
