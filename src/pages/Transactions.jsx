import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Plus, ArrowUpDown, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';
import TransactionModal from '../components/transactions/TransactionModal';

export default function Transactions() {
    const { transactions, role, deleteTransaction } = useFinance();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const filteredData = useMemo(() => {
        return transactions.filter(t => {
            const matchFilter = filter === 'All' || t.type === filter;
            const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) ||
                t.category.toLowerCase().includes(search.toLowerCase());
            return matchFilter && matchSearch;
        });
    }, [transactions, filter, search]);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark">
                        Transactions
                    </h1>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                        Manage your daily transactions and expenses.
                    </p>
                </div>
                {role === 'Admin' && (
                    <button
                        onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow active:scale-95"
                    >
                        <Plus className="w-5 h-5" /> Add Transaction
                    </button>
                )}
            </div>

            <div className="card-shadow bg-card-light dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by description or category..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Income', 'Expense'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                                    filter === f
                                        ? "bg-primary text-white border-primary"
                                        : "bg-transparent text-text-secondary-light dark:text-text-secondary-dark border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-1 cursor-pointer">Date <ArrowUpDown className="w-3 h-3" /></div></th>
                                <th className="px-6 py-4 font-medium">Description</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium"><div className="flex items-center gap-1 justify-end cursor-pointer">Amount <ArrowUpDown className="w-3 h-3" /></div></th>
                                {role === 'Admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredData.map(t => (
                                <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">{t.date}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{t.description}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark inline-block">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className={cn("px-6 py-4 text-sm font-semibold text-right whitespace-nowrap", t.type === 'Income' ? 'text-accent' : 'text-danger')}>
                                        {t.type === 'Income' ? '+' : '-'}${t.amount}
                                    </td>
                                    {role === 'Admin' && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => { setEditingTransaction(t); setIsModalOpen(true); }}
                                                    className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-md hover:bg-primary/10"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deleteTransaction(t.id)} className="p-1.5 text-gray-400 hover:text-danger transition-colors rounded-md hover:bg-danger/10">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData.length === 0 && (
                        <div className="py-16 flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="font-medium">No transactions found</p>
                            <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        Showing <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{filteredData.length}</span> results
                    </span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 font-medium">1</button>
                        <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingTransaction}
            />
        </div>
    );
}
