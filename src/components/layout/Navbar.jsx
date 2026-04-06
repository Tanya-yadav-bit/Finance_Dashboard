import React from 'react';
import { Menu, Sun, Moon, Bell, Search, ShieldAlert, KeyRound } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Navbar({ onMenuClick }) {
    const { role, setRole, theme, toggleTheme } = useFinance();
    const navigate = useNavigate();

    return (
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
            <div className="flex items-center flex-1">
                <button
                    onClick={onMenuClick}
                    className="mr-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Search Desktop */}
                <div className="hidden md:flex items-center w-full max-w-sm relative">
                    <Search className="w-4 h-4 absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border-transparent rounded-lg text-sm focus:bg-white dark:focus:bg-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Role Switcher */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                    <button
                        onClick={() => setRole('Viewer')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${role === 'Viewer'
                            ? 'bg-white dark:bg-gray-700 shadow flex items-center gap-1.5'
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {role === 'Viewer' && <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />}
                        Viewer
                    </button>
                    <button
                        onClick={() => setRole('Admin')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${role === 'Admin'
                            ? 'bg-white dark:bg-gray-700 shadow flex items-center gap-1.5'
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        {role === 'Admin' && <KeyRound className="w-3.5 h-3.5 text-red-500" />}
                        Admin
                    </button>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <button
                    onClick={() => toast('No new notifications', { icon: '🔔', duration: 500 })}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-card-dark"></span>
                </button>

                {/* Avatar */}
                <div
                    onClick={() => navigate('/profile')}
                    className="w-8 h-8 rounded-full ml-1 sm:ml-2 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer"
                >
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Avatar"
                        className="w-full h-full object-cover bg-primary/10"
                    />
                </div>
            </div>
        </header>
    );
}
