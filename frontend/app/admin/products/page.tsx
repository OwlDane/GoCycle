"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    IconPlus, 
    IconEdit, 
    IconEye,
    IconHeart,
    IconSearch
} from "@tabler/icons-react";
import { getShowcaseProducts } from "@/lib/showcase-api";
import type { ShowcaseProduct, ProductCategory } from "@/lib/showcase-api";

export default function ProductsPage() {
    const [products, setProducts] = useState<ShowcaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "ALL">("ALL");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getShowcaseProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.story.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === "ALL" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories: Array<ProductCategory | "ALL"> = [
        "ALL",
        "HOME_DECOR",
        "FASHION",
        "FURNITURE",
        "ACCESSORIES",
        "TOYS",
        "STORAGE",
        "GARDEN",
        "LIGHTING"
    ];

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
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your eco-friendly products</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#267347] transition-colors"
                >
                    <IconPlus size={20} />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "ALL")}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57] focus:border-transparent"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === "ALL" ? "All Categories" : cat.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Studio</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stats</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                <Image
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                <p className="text-sm text-gray-500 line-clamp-1">{product.story}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {product.category.replace(/_/g, " ")}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className="text-sm text-gray-900">{product.studio.name}</p>
                                        <p className="text-xs text-gray-500">{product.studio.location}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className="text-sm font-medium text-gray-900">
                                            Rp {product.estimatedPrice.toLocaleString("id-ID")}
                                        </p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <IconEye size={16} />
                                                {product.viewCount}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <IconHeart size={16} />
                                                {product.likeCount}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
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

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No products found</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredProducts.length} of {products.length} products
                </div>
            </div>
        </div>
    );
}
