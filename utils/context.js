"use client"
import { createContext, useContext, useState } from "react";

const BalanceContext = createContext();

export function BalanceProvider({ children }) {
    const [balance, setBalance] = useState(null);

    const refreshBalance = async () => {
        const res = await fetch('/api/balance', { cache: "no-store" });
        const data = await res.json();
        setBalance(data);
    };

    return (
        <BalanceContext.Provider value={{ balance, refreshBalance }}>
            {children}
        </BalanceContext.Provider>
    );
}

export function useBalance() {
    return useContext(BalanceContext);
}