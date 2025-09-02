import React from 'react';
import { SunIcon, MoonIcon } from './icons';
import { Page } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  activePage: Page;
}

const getTitle = (page: Page) => {
  switch (page) {
    case Page.Dictionary:
      return "Kamus Santun";
    case Page.Corner:
      return "Qur'an & Hadits Corner";
    case Page.Community:
      return "Komunitas Santun";
    default:
      return "Kamus Santun";
  }
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme, activePage }) => {
  return (
    <header className="bg-surface-light dark:bg-surface-dark p-4 shadow-md flex justify-between items-center flex-shrink-0 z-10">
      <div className="flex items-center space-x-3">
         <div className="w-8 h-8 bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          S
        </div>
        <h1 className="text-md font-bold text-text-primary-light dark:text-text-primary-dark truncate">
          {getTitle(activePage)}
        </h1>
      </div>
      <button
        onClick={onToggleTheme}
        className="p-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </button>
    </header>
  );
};