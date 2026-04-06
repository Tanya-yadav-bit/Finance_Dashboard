import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Target, TrendingDown, Star, Activity } from 'lucide-react';

export default function Insights() {
    const { transactions } = useFinance();

    const insights = useMemo(() => {
        let income = 0;
        let expense = 0;
        const categoryTotals = {};

        transactions.forEach(t => {
            if (t.type === 'Income') income += t.amount;
            if (t.type === 'Expense') {
                expense += t.amount;
                categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
            }
        });

        const savings = income - expense;
        const savingsRate = income > 0 ? (savings / income) * 100 : 0;

        let highestCategory = { name: 'None', amount: 0 };
        for (const [name, amount] of Object.entries(categoryTotals)) {
            if (amount > highestCategory.amount) {
                highestCategory = { name, amount };
            }
        }

        return { income, expense, savings, savingsRate, highestCategory };
    }, [transactions]);

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    Financial Insights
                </h1>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
                    AI-driven analysis of your spending patterns.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Insight Item 1 */}
                <div className="card-shadow bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 p-6 rounded-xl flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
                        <TrendingDown className="w-6 h-6 text-danger" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Highest Spending Category</h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                            You spent the most on <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">{insights.highestCategory.name}</span> this period.
                        </p>
                        <div className="text-xl font-bold text-danger">{formatCurrency(insights.highestCategory.amount)}</div>
                    </div>
                </div>

                {/* Insight Item 2 */}
                <div className="card-shadow bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 p-6 rounded-xl flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Savings Goal</h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                            Your overall savings for this period. Aim for at least 20%.
                        </p>
                        <div className="flex items-center gap-2 text-xl font-bold">
                            {formatCurrency(insights.savings)}
                            <span className={`text-sm px-2 py-0.5 rounded-full ${insights.savingsRate >= 20 ? 'bg-accent/10 text-accent' : 'bg-orange-500/10 text-orange-500'}`}>
                                {insights.savingsRate.toFixed(1)}% rate
                            </span>
                        </div>
                    </div>
                </div>

                {/* Insight Item 3 */}
                <div className="card-shadow bg-card-light dark:bg-card-dark border border-gray-100 dark:border-gray-800 p-6 rounded-xl flex items-start gap-4 md:col-span-2">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Star className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1 w-full">
                        <h3 className="text-lg font-semibold mb-1">AI Recommendation</h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                            Based on your transactions, {insights.highestCategory.name} takes up a significant portion of your expenses.
                            {insights.savingsRate < 20 ? " Consider reducing expenses in this category to hit a healthy 20% savings rate." : " You are maintaining a healthy net savings rate. Keep it up!"}
                        </p>
                        <div className="mt-4 w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden flex">
                            <div style={{ width: `${Math.min(100, Math.max(0, insights.savingsRate))}%` }} className="bg-primary h-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
