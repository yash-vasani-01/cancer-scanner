import React, { useState, useEffect, ReactNode } from 'react';
import { lightTheme, darkTheme, Theme } from '../themes/theme';

// Define the props interface to include children
interface ThemeSwitcherProps {
  children?: ReactNode;
}

// Use the props interface in the component definition
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const currentTheme: Theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <div style={{ background: currentTheme.background, color: currentTheme.color, minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      {children}
    </div>
  );
};

export default ThemeSwitcher;