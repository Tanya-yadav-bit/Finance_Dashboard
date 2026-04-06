import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
    const [role, setRole] = useState('Viewer'); // 'Viewer' | 'Admin'
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('finance_transactions');
        return saved ? JSON.parse(saved) : initialTransactions;
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('finance_theme');
        return saved ? saved : 'light';
    });

    useEffect(() => {
        localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('finance_theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const addTransaction = (transaction) => {
        if (role !== 'Admin') {
            toast.error('Action restricted to Admin');
            return;
        }
        setTransactions(prev => [{ ...transaction, id: crypto.randomUUID() }, ...prev]);
        toast.success('Transaction added');
    };

    const editTransaction = (id, updated) => {
        if (role !== 'Admin') {
            toast.error('Action restricted to Admin');
            return;
        }
        setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
        toast.success('Transaction updated');
    };

    const deleteTransaction = (id) => {
        if (role !== 'Admin') {
            toast.error('Action restricted to Admin');
            return;
        }
        setTransactions(prev => prev.filter(t => t.id !== id));
        toast.success('Transaction deleted');
    };

    const value = {
        role,
        setRole,
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        theme,
        toggleTheme,
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
}
