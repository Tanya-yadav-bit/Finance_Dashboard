import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PieChart, Menu } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Sidebar({ isOpen, setIsOpen }) {
    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Transactions', icon: Receipt, path: '/transactions' },
        { name: 'Insights', icon: PieChart, path: '/insights' },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-card-light dark:bg-card-dark border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 md:translate-x-0 flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mr-3">
                        <PieChart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">FinTech</span>
                </div>

                <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                                    : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
