
import React from 'react';
import { Page } from '../types';
import { DictionaryIcon, BookIcon, UsersIcon } from './icons';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'text-primary-light dark:text-primary-dark';
  const inactiveClasses = 'text-text-secondary-light dark:text-text-secondary-dark';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses} hover:text-primary-light dark:hover:text-primary-dark`}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-slate-600 flex justify-around items-center flex-shrink-0">
      <NavItem
        icon={<DictionaryIcon className="w-6 h-6" />}
        label="Kamus"
        isActive={activePage === Page.Dictionary}
        onClick={() => onNavigate(Page.Dictionary)}
      />
      <NavItem
        icon={<BookIcon className="w-6 h-6" />}
        label="Corner"
        isActive={activePage === Page.Corner}
        onClick={() => onNavigate(Page.Corner)}
      />
      <NavItem
        icon={<UsersIcon className="w-6 h-6" />}
        label="Komunitas"
        isActive={activePage === Page.Community}
        onClick={() => onNavigate(Page.Community)}
      />
    </div>
  );
};
