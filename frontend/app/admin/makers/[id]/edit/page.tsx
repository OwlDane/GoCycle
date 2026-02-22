"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import { getEcoMakerById } from "@/lib/showcase-api";
import type { EcoMaker } from "@/lib/showcase-api";

export default function EditMakerPage() {
    const router = useRouter();
    const params = useParams();
    const makerId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [maker, setMaker] = useState<EcoMaker | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        story: "",
        location: "",
        phone: "",
        avatarFile: null as File | null
    });

    useEffect(() => {
        async function fetchMaker() {
            try {
                const data = await getEcoMakerById(makerId);
                setMaker(data);
                setFormData({
                    name: data.name,
                    story: data.story,
                    location: data.location,
                    phone: data.phone,
                    avatarFile: null
                });
            } catch (error) {
                console.error("Failed to fetch maker:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMaker();
    }, [makerId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // TODO: Implement API call to update maker
        console.log("Updating maker:", formData);

        setTimeout(() => {
            setSaving(false);
            router.push("/admin/makers");
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

    if (!maker) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Maker not found</p>
                <Link href="/admin/makers" className="text-[#2E8B57] hover:underline mt-4 inline-block">
                    Back to Makers
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/makers" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <IconArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Maker</h1>
                    <p className="text-gray-500 mt-1">Update maker information</p>
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
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Current Avatar</label>
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4">
                            {maker.avatarUrl ? (
                                <Image src={maker.avatarUrl} alt={maker.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#2E8B57] text-white text-3xl font-bold">
                                    {maker.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Update Avatar (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, avatarFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave empty to keep current avatar</p>
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
                    <Link href="/admin/makers" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
