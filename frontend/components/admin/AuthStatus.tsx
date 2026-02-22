"use client";

import { useAuth } from "@/contexts/AuthContext";
import { IconShield, IconUser } from "@tabler/icons-react";

export function AuthStatus() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <IconShield size={20} />
                </div>
                <div>
                    <p className="text-sm font-semibold text-green-900">Authenticated</p>
                    <div className="flex items-center gap-2 text-xs text-green-700">
                        <IconUser size={14} />
                        <span>{user.username}</span>
                        <span>•</span>
                        <span className="capitalize">{user.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
