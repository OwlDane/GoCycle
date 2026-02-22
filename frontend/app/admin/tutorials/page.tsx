"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    IconPlus, 
    IconEdit, 
    IconEye,
    IconCheck,
    IconSearch,
    IconClock
} from "@tabler/icons-react";
import { getDIYTutorials } from "@/lib/showcase-api";
import type { DIYTutorial, DifficultyLevel, WasteType } from "@/lib/showcase-api";

export default function TutorialsPage() {
    const [tutorials, setTutorials] = useState<DIYTutorial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | "ALL">("ALL");

    useEffect(() => {
        async function fetchTutorials() {
            try {
                const data = await getDIYTutorials();
                setTutorials(data);
            } catch (error) {
                console.error("Failed to fetch tutorials:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTutorials();
    }, []);

    const filteredTutorials = tutorials.filter(tutorial => {
        const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = difficultyFilter === "ALL" || tutorial.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    const difficulties: Array<DifficultyLevel | "ALL"> = ["ALL", "EASY", "MEDIUM", "HARD"];

    const getDifficultyColor = (difficulty: DifficultyLevel) => {
        switch (difficulty) {
            case "EASY": return "bg-green-100 text-green-800";
            case "MEDIUM": return "bg-yellow-100 text-yellow-800";
            case "HARD": return "bg-red-100 text-red-800";
        }
    };

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
                    <h1 className="text-3xl font-bold text-gray-900">DIY Tutorials</h1>
                    <p className="text-gray-500 mt-1">Manage your DIY tutorial content</p>
                </div>
                <Link
                    href="/admin/tutorials/new"
                    className="flex items-center gap-2 bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#267347] transition-colors"
                >
                    <IconPlus size={20} />
                    Add Tutorial
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search tutorials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                    </div>
                    <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value as DifficultyLevel | "ALL")}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                    >
                        {difficulties.map(diff => (
                            <option key={diff} value={diff}>
                                {diff === "ALL" ? "All Difficulties" : diff}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tutorial</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Difficulty</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Waste Type</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Duration</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stats</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTutorials.map((tutorial) => (
                                <tr key={tutorial.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                <Image
                                                    src={tutorial.thumbnailUrl}
                                                    alt={tutorial.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{tutorial.title}</p>
                                                <p className="text-sm text-gray-500 line-clamp-1">{tutorial.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                                            {tutorial.difficulty}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {tutorial.primaryWasteType}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <IconClock size={16} />
                                            {tutorial.estimatedTime} min
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <IconEye size={16} />
                                                {tutorial.viewCount}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <IconCheck size={16} />
                                                {tutorial.completedCount}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <Link
                                            href={`/admin/tutorials/${tutorial.id}/edit`}
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

                    {filteredTutorials.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No tutorials found</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredTutorials.length} of {tutorials.length} tutorials
                </div>
            </div>
        </div>
    );
}
