import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { User, Mail, Phone, CreditCard, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function Profile() {
    const { transactions } = useFinance();

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const { currentBalance, monthlyIncome, monthlyExpense } = useMemo(() => {
        let balance = 0;
        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            if (t.type === 'Income') {
                balance += t.amount;
            } else {
                balance -= t.amount;
            }

            const tDate = new Date(t.date);
            if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
                if (t.type === 'Income') {
                    income += t.amount;
                } else {
                    expense += t.amount;
                }
            }
        });

        return { currentBalance: balance, monthlyIncome: income, monthlyExpense: expense };
    }, [transactions, currentMonth, currentYear]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* User Details Card */}
                <div className="lg:col-span-1 bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="Avatar"
                            className="w-full h-full object-cover bg-primary/10"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Felix Doe</h2>

                    <div className="w-full mt-6 space-y-4">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <span className="text-sm">felix.doe@demo.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3">
                            <Phone className="w-5 h-5 text-green-500" />
                            <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 pb-1">
                            <CreditCard className="w-5 h-5 text-purple-500" />
                            <span className="text-sm">AC: **** **** **** 4242</span>
                        </div>
                    </div>
                </div>

                {/* Financial Overview Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 font-medium text-sm">Current Balance</h3>
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Wallet className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 font-medium text-sm">Monthly Income</h3>
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-card-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 md:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-500 font-medium text-sm">Monthly Expense</h3>
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${monthlyExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
