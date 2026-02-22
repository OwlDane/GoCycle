"use client";

import { useState } from "react";
import { 
    IconUpload,
    IconPhoto,
    IconTrash,
    IconSearch,
    IconFilter
} from "@tabler/icons-react";

export default function MediaLibraryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"ALL" | "PRODUCTS" | "TUTORIALS" | "MAKERS">("ALL");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                    <p className="text-gray-500 mt-1">Manage images and media files</p>
                </div>
                <button className="flex items-center gap-2 bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#267347] transition-colors">
                    <IconUpload size={20} />
                    Upload Media
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search media..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <IconFilter size={20} className="text-gray-400" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        >
                            <option value="ALL">All Media</option>
                            <option value="PRODUCTS">Products</option>
                            <option value="TUTORIALS">Tutorials</option>
                            <option value="MAKERS">Makers</option>
                        </select>
                    </div>
                </div>

                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <IconPhoto size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Media Library Coming Soon</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        The media library feature is currently under development. 
                        For now, images are managed directly through product and tutorial forms.
                    </p>
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">Development Note</h3>
                <p className="text-yellow-800 text-sm leading-relaxed">
                    This page will allow you to upload, organize, and manage all media files used across the platform. 
                    Features will include bulk upload, image optimization, and usage tracking.
                </p>
            </div>
        </div>
    );
}
