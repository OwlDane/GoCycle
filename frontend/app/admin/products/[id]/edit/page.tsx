"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft, IconDeviceFloppy } from "@tabler/icons-react";
import { getShowcaseProductById } from "@/lib/showcase-api";
import type { ShowcaseProduct, ProductCategory } from "@/lib/showcase-api";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [product, setProduct] = useState<ShowcaseProduct | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        story: "",
        description: "",
        materials: "",
        category: "HOME_DECOR" as ProductCategory,
        estimatedPrice: "",
        wasteSaved: "",
        co2Reduced: "",
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

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getShowcaseProductById(productId);
                setProduct(data);
                setFormData({
                    name: data.name,
                    story: data.story,
                    description: data.description || "",
                    materials: data.materials,
                    category: data.category,
                    estimatedPrice: data.estimatedPrice.toString(),
                    wasteSaved: data.wasteSaved.toString(),
                    co2Reduced: data.co2Reduced.toString(),
                    imageFile: null
                });
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // TODO: Implement API call to update product
        console.log("Updating product:", formData);

        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            router.push("/admin/products");
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

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Product not found</p>
                <Link href="/admin/products" className="text-[#2E8B57] hover:underline mt-4 inline-block">
                    Back to Products
                </Link>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                    <p className="text-gray-500 mt-1">Update product information</p>
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
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Current Image
                        </label>
                        <div className="relative w-48 h-36 rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Update Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#2E8B57] text-white px-6 py-2 rounded-lg hover:bg-[#267347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <IconDeviceFloppy size={20} />
                        {saving ? "Saving..." : "Save Changes"}
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
