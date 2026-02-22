"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";

export default function NewMakerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        story: "",
        location: "",
        phone: "",
        avatarFile: null as File | null
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement API call to create maker
        console.log("Creating maker:", formData);

        setTimeout(() => {
            setLoading(false);
            router.push("/admin/makers");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/makers" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <IconArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Maker</h1>
                    <p className="text-gray-500 mt-1">Create a new eco maker profile</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Maker Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="e.g., Ibu Siti Nurhaliza"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Story</label>
                        <textarea
                            required
                            value={formData.story}
                            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="Tell the maker's story..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="e.g., Jakarta Selatan"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="e.g., +62 812-3456-7890"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar Image (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, avatarFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended: Square image, 400x400px</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-2 rounded-lg hover:bg-[#267347] transition-colors disabled:opacity-50"
                    >
                        <IconDeviceFloppy size={20} />
                        {loading ? "Saving..." : "Save Maker"}
                    </button>
                    <Link href="/admin/makers" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
