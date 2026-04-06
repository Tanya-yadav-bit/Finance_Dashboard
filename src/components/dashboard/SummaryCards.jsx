import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function SummaryCards() {
    const { transactions } = useFinance();

    const { income, expense, balance } = useMemo(() => {
        let inc = 0, exp = 0;
        transactions.forEach(t => {
            if (t.type === 'Income') inc += t.amount;
            else if (t.type === 'Expense') exp += t.amount;
        });
        return { income: inc, expense: exp, balance: inc - exp };
    }, [transactions]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Balance Card */}
            <div className="card-shadow bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Total Balance</h2>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div className="text-3xl font-bold mb-2 text-text-primary-light dark:text-text-primary-dark">
                    {formatCurrency(balance)}
                </div>
                <div className="flex items-center text-sm">
                    <span className="text-accent flex items-center mr-2">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +2.5%
                    </span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">vs last month</span>
                </div>
            </div>

            {/* Income Card */}
            <div className="card-shadow bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Total Income</h2>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                </div>
                <div className="text-3xl font-bold mb-2 text-text-primary-light dark:text-text-primary-dark">
                    {formatCurrency(income)}
                </div>
                <div className="flex items-center text-sm">
                    <span className="text-accent flex items-center mr-2">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +8.1%
                    </span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">vs last month</span>
                </div>
            </div>

            {/* Expense Card */}
            <div className="card-shadow bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Total Expenses</h2>
                    <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-danger" />
                    </div>
                </div>
                <div className="text-3xl font-bold mb-2 text-text-primary-light dark:text-text-primary-dark">
                    {formatCurrency(expense)}
                </div>
                <div className="flex items-center text-sm">
                    <span className="text-accent flex items-center mr-2">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        -1.2%
                    </span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">vs last month</span>
                </div>
            </div>
        </div>
    );
}
