import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Desktop: Two column layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Cyan background with welcome text */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-400 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-between p-8">
            {/* Top - Logo */}
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 4h14v4h3l3 4v5h-2a3 3 0 01-6 0H9a3 3 0 01-6 0H1V4h2zm14 10a1 1 0 100 2 1 1 0 000-2zM6 14a1 1 0 100 2 1 1 0 000-2z"/>
              </svg>
            </div>
            
            {/* Center - Welcome text */}
            <div className="flex-1 flex items-center">
              <div>
                <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight whitespace-pre-line">
                  {t('welcome.title')}
                </h1>
              </div>
            </div>
            
            {/* Bottom - Icons */}
            <div className="flex items-center justify-between">
              <svg className="w-12 h-12 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 4h15l3 4v9h-2.19a3 3 0 00-5.62 0H8.81a3 3 0 00-5.62 0H1V4h2z"/>
              </svg>
              <svg className="w-10 h-10 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="flex-1 flex flex-col min-h-screen lg:w-1/2">
          {/* Header for mobile and controls */}
          <header className="flex items-center justify-between p-4 lg:p-6">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 4h14v4h3l3 4v5h-2a3 3 0 01-6 0H9a3 3 0 01-6 0H1V4h2z"/>
                </svg>
              </div>
            </div>
            
            <div className="flex-1 lg:flex-none"></div>
            
            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => changeLanguage('ru')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    i18n.language === 'ru'
                      ? 'bg-white dark:bg-gray-700 text-cyan-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                    i18n.language === 'en'
                      ? 'bg-white dark:bg-gray-700 text-cyan-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {theme === 'light' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </header>
          
          {/* Mobile banner */}
          <div className="lg:hidden bg-gradient-to-r from-cyan-400 to-cyan-500 p-6 mx-4 rounded-2xl mb-4">
            <h2 className="text-xl font-bold text-white whitespace-pre-line">
              {t('welcome.title')}
            </h2>
          </div>
          
          {/* Form content */}
          <main className="flex-1 flex items-start lg:items-center justify-center px-4 pb-8 lg:px-8">
            <div className="w-full max-w-md">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  {children}
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
