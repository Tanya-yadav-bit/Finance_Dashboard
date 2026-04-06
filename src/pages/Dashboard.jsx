import React from 'react';
import { Link } from 'react-router-dom';
import SummaryCards from '../components/dashboard/SummaryCards';
import DashboardCharts from '../components/dashboard/Charts';
import { ArrowRight } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { cn } from '../utils/cn';

export default function Dashboard() {
    const { transactions } = useFinance();
    const recent = transactions.slice(0, 5); // 5 max for dashboard

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        Welcome back! Here's your financial summary.
                    </p>
                </div>
            </div>

            <SummaryCards />
            <DashboardCharts />

            {/* Recent Transactions Preview */}
            <div className="card-shadow bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Recent Transactions</h2>
                    <Link to="/transactions" className="text-sm text-primary hover:underline flex items-center font-medium">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <th className="py-3 font-medium">Date</th>
                                <th className="py-3 font-medium">Description</th>
                                <th className="py-3 font-medium">Category</th>
                                <th className="py-3 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent.map((t) => (
                                <tr key={t.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                    <td className="py-3 text-sm text-text-secondary-light dark:text-text-secondary-dark">{t.date}</td>
                                    <td className="py-3 text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{t.description}</td>
                                    <td className="py-3 text-sm">
                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className={cn("py-3 text-sm font-semibold text-right", t.type === 'Income' ? 'text-accent' : 'text-danger')}>
                                        {t.type === 'Income' ? '+' : '-'}${t.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {recent.length === 0 && (
                        <div className="py-8 text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
                            No transactions found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
