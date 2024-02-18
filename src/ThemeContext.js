import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Function to get the initial theme
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme');
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'));
    };

    const setExplicitTheme = (newTheme) => {
        setTheme(`${newTheme}-theme`);
    };

    const setSystemTheme = () => {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setSystemTheme, setExplicitTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
