import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const PIE_COLORS = ['#4F46E5', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function DashboardCharts() {
    const { transactions, theme } = useFinance();

    const { lineData, pieData } = useMemo(() => {
        // Basic aggregation for line chart (simulate a smooth curve of balance/income over time)
        // Real implementation would group by day/month and aggregate. 
        // Creating some simulated trend data representing a smooth month for visuals.
        const mockLineData = [
            { name: '1 Apr', balance: 4000, income: 2400 },
            { name: '5 Apr', balance: 4500, income: 1398 },
            { name: '10 Apr', balance: 3800, income: 9800 },
            { name: '15 Apr', balance: 6000, income: 3908 },
            { name: '20 Apr', balance: 5800, income: 4800 },
            { name: '25 Apr', balance: 7200, income: 3800 },
            { name: '30 Apr', balance: 8500, income: 4300 },
        ];

        // Aggregate real expenses for pie chart
        const expensesMap = {};
        transactions.filter(t => t.type === 'Expense').forEach(t => {
            expensesMap[t.category] = (expensesMap[t.category] || 0) + t.amount;
        });
        const mappedPieData = Object.keys(expensesMap).map(key => ({
            name: key, value: expensesMap[key]
        })).sort((a, b) => b.value - a.value);

        return { lineData: mockLineData, pieData: mappedPieData };
    }, [transactions]);

    const textColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';

    const CustomTooltipContent = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card-light dark:bg-card-dark p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 text-sm">
                    <p className="font-semibold mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="font-medium">
                            {entry.name}: ${entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Area Chart */}
            <div className="lg:col-span-2 card-shadow bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">Balance Trend</h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <RechartsTooltip content={<CustomTooltipContent />} />
                            <Area type="monotone" dataKey="balance" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Donut Chart */}
            <div className="card-shadow bg-card-light dark:bg-card-dark rounded-xl p-6 border border-gray-100 dark:border-gray-800 flex flex-col">
                <h2 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">Spending by Category</h2>
                {pieData.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-text-secondary-light">
                        No expenses yet
                    </div>
                ) : (
                    <>
                        <div className="h-48 flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip content={<CustomTooltipContent />} />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {pieData.slice(0, 4).map((entry, index) => (
                                <div key={entry.name} className="flex items-center text-sm">
                                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                                    <span className="text-text-secondary-light dark:text-text-secondary-dark truncate">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
