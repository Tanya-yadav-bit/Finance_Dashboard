import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { categories } from '../../data/mockData';

export default function TransactionModal({ isOpen, onClose, initialData = null }) {
    const { addTransaction, editTransaction } = useFinance();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: 'Expense',
        category: 'Food'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                amount: initialData.amount.toString()
            });
        } else {
            setFormData({
                description: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                type: 'Expense',
                category: 'Food'
            });
        }
    }, [initialData, isOpen]);

    // Update category if type changes and current category isn't in new type's list
    const handleTypeChange = (newType) => {
        const validCategory = categories[newType][0];
        setFormData(prev => ({ ...prev, type: newType, category: validCategory }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            amount: parseFloat(formData.amount) || 0
        };

        if (initialData) {
            editTransaction(initialData.id, payload);
        } else {
            addTransaction(payload);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="card-shadow relative bg-card-light dark:bg-card-dark rounded-xl w-full max-w-md p-6 transform transition-all">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">{initialData ? 'Edit Transaction' : 'Add Transaction'}</h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
                        <button
                            type="button"
                            onClick={() => handleTypeChange('Income')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.type === 'Income' ? 'bg-white dark:bg-gray-800 shadow text-accent' : 'text-gray-500 hover:text-text-primary-light'
                                }`}
                        >
                            Income
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTypeChange('Expense')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.type === 'Expense' ? 'bg-white dark:bg-gray-800 shadow text-danger' : 'text-gray-500 hover:text-text-primary-light'
                                }`}
                        >
                            Expense
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-text-secondary-light dark:text-text-secondary-dark">Description</label>
                        <input
                            required
                            type="text"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="e.g., Grocery Shopping"
                            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1.5 text-text-secondary-light dark:text-text-secondary-dark">Amount</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full pl-7 pr-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1.5 text-text-secondary-light dark:text-text-secondary-dark">Date</label>
                            <input
                                required
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all [color-scheme:light] dark:[color-scheme:dark]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-text-secondary-light dark:text-text-secondary-dark">Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        >
                            {categories[formData.type].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-sm active:scale-95">
                            {initialData ? 'Save Changes' : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
