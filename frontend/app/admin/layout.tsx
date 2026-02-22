"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    IconDashboard, 
    IconPackage, 
    IconTools, 
    IconUsers, 
    IconChartLine,
    IconPhoto,
    IconSettings,
    IconMenu2,
    IconX,
    IconLogout
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: IconDashboard },
    { name: "Products", href: "/admin/products", icon: IconPackage },
    { name: "Tutorials", href: "/admin/tutorials", icon: IconTools },
    { name: "Eco Makers", href: "/admin/makers", icon: IconUsers },
    { name: "Impact Stats", href: "/admin/impact", icon: IconChartLine },
    { name: "Media Library", href: "/admin/media", icon: IconPhoto },
    { name: "Settings", href: "/admin/settings", icon: IconSettings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!loading && !user && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [user, loading, pathname, router]);

    const handleLogout = async () => {
        await logout();
    };

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E8B57]"></div>
            </div>
        );
    }

    // Don't render layout for login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Don't render if not authenticated
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-white
                transform transition-transform duration-300 ease-in-out
                lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2E8B57] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">GC</span>
                            </div>
                            <span className="font-bold text-lg">GoCycle Admin</span>
                        </Link>
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <IconX size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || 
                                           (item.href !== "/admin" && pathname.startsWith(item.href));
                            
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg
                                        transition-colors duration-200
                                        ${isActive 
                                            ? 'bg-[#2E8B57] text-white' 
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                                    `}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-800">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                        >
                            <IconLogout size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16">
                    <div className="flex items-center justify-between h-full px-6">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-600 hover:text-gray-900"
                        >
                            <IconMenu2 size={24} />
                        </button>
                        
                        <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#2E8B57] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
