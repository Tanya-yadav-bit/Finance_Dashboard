export const initialTransactions = [
    {
        id: "tx-1",
        date: "2026-04-01",
        amount: 5000,
        category: "Salary",
        type: "Income",
        description: "Monthly Tech Salary",
    },
    {
        id: "tx-2",
        date: "2026-04-02",
        amount: 150,
        category: "Food",
        type: "Expense",
        description: "Groceries at Whole Foods",
    },
    {
        id: "tx-3",
        date: "2026-04-03",
        amount: 50,
        category: "Transport",
        type: "Expense",
        description: "Uber Ride",
    },
    {
        id: "tx-4",
        date: "2026-04-04",
        amount: 200,
        category: "Utilities",
        type: "Expense",
        description: "Electricity Bill",
    },
    {
        id: "tx-5",
        date: "2026-04-05",
        amount: 1200,
        category: "Freelance",
        type: "Income",
        description: "Web Design Project",
    },
];

export const categories = {
    Income: ["Salary", "Freelance", "Investments", "Other"],
    Expense: ["Food", "Transport", "Utilities", "Entertainment", "Shopping", "Other"]
};
