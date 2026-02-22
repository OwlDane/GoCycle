"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import type { ProductCategory } from "@/lib/showcase-api";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        story: "",
        description: "",
        materials: "",
        category: "HOME_DECOR" as ProductCategory,
        estimatedPrice: "",
        wasteSaved: "",
        co2Reduced: "",
        studioId: "",
        makerId: "",
        imageFile: null as File | null
    });

    const categories: ProductCategory[] = [
        "HOME_DECOR",
        "FASHION",
        "FURNITURE",
        "ACCESSORIES",
        "TOYS",
        "STORAGE",
        "GARDEN",
        "LIGHTING"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement API call to create product
        console.log("Creating product:", formData);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push("/admin/products");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <IconArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                    <p className="text-gray-500 mt-1">Create a new eco-friendly product</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="e.g., Lampu Gantung dari Botol Bekas"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Story
                        </label>
                        <textarea
                            required
                            value={formData.story}
                            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="Tell the story behind this product..."
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="Additional details about the product..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Materials
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.materials}
                            onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="e.g., Botol plastik, kawat, cat"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.replace(/_/g, " ")}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Estimated Price (Rp)
                        </label>
                        <input
                            type="number"
                            required
                            value={formData.estimatedPrice}
                            onChange={(e) => setFormData({ ...formData, estimatedPrice: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="50000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Waste Saved (kg)
                        </label>
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

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CO2 Reduced (kg)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            required
                            value={formData.co2Reduced}
                            onChange={(e) => setFormData({ ...formData, co2Reduced: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                            placeholder="0.3"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px, max 2MB</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-2 rounded-lg hover:bg-[#267347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <IconDeviceFloppy size={20} />
                        {loading ? "Saving..." : "Save Product"}
                    </button>
                    <Link
                        href="/admin/products"
                        className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
