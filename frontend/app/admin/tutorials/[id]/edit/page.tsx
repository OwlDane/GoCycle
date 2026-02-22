"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import { getDIYTutorialById } from "@/lib/showcase-api";
import type { DIYTutorial, DifficultyLevel, WasteType } from "@/lib/showcase-api";

export default function EditTutorialPage() {
    const router = useRouter();
    const params = useParams();
    const tutorialId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tutorial, setTutorial] = useState<DIYTutorial | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty: "EASY" as DifficultyLevel,
        estimatedTime: "",
        primaryWasteType: "PLASTIC" as WasteType,
        wasteSaved: "",
        thumbnailFile: null as File | null
    });

    const difficulties: DifficultyLevel[] = ["EASY", "MEDIUM", "HARD"];
    const wasteTypes: WasteType[] = ["PLASTIC", "GLASS", "METAL", "CARDBOARD", "TEXTILE", "ORGANIC", "ELECTRONIC"];

    useEffect(() => {
        async function fetchTutorial() {
            try {
                const data = await getDIYTutorialById(tutorialId);
                setTutorial(data);
                setFormData({
                    title: data.title,
                    description: data.description,
                    difficulty: data.difficulty,
                    estimatedTime: data.estimatedTime.toString(),
                    primaryWasteType: data.primaryWasteType,
                    wasteSaved: data.wasteSaved.toString(),
                    thumbnailFile: null
                });
            } catch (error) {
                console.error("Failed to fetch tutorial:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTutorial();
    }, [tutorialId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // TODO: Implement API call to update tutorial
        console.log("Updating tutorial:", formData);

        setTimeout(() => {
            setSaving(false);
            router.push("/admin/tutorials");
        }, 1000);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
        );
    }

    if (!tutorial) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Tutorial not found</p>
                <Link href="/admin/tutorials" className="text-[#2E8B57] hover:underline mt-4 inline-block">
                    Back to Tutorials
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/tutorials" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <IconArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Tutorial</h1>
                    <p className="text-gray-500 mt-1">Update tutorial information</p>
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
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Thumbnail</label>
                        <div className="relative w-48 h-36 rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <Image src={tutorial.thumbnailUrl} alt={tutorial.title} fill className="object-cover" />
                        </div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Update Thumbnail (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, thumbnailFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave empty to keep current thumbnail</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-2 rounded-lg hover:bg-[#267347] transition-colors disabled:opacity-50"
                    >
                        <IconDeviceFloppy size={20} />
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <Link href="/admin/tutorials" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
