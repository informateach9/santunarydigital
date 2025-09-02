import React, { useState } from 'react';
import { CORNER_CONTENT } from '../constants';
import { IslamicQuote } from '../types';
import { findRelevantScripture } from '../services/geminiService';
import { QuoteIcon, SearchIcon } from './icons';

const QuoteCard: React.FC<{ item: IslamicQuote }> = ({ item }) => (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border-l-4 border-secondary-light dark:border-secondary-dark">
      <div className="p-5">
        <div className="flex items-center space-x-3 text-secondary-light dark:text-secondary-dark">
          <QuoteIcon className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-wider">
            {item.type === 'Quran' ? 'Al-Qur\'an' : 'Hadits'}
          </span>
        </div>
        <blockquote className="mt-3">
          <p className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
            "{item.text}"
          </p>
        </blockquote>
        <cite className="block text-right text-md font-medium text-primary-light dark:text-primary-dark mt-2 not-italic">
          - {item.source}
        </cite>
      </div>
      <div className="bg-gray-50 dark:bg-slate-800/50 px-5 py-4">
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {item.explanation}
        </p>
      </div>
    </div>
);

export const CornerContent: React.FC = () => {
    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState<IslamicQuote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setSearchResult(null);

        try {
            const result = await findRelevantScripture(query);
            setSearchResult(result);
        } catch (err) {
            setError('Gagal mencari dalil. Mohon coba lagi.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3">Cari Dalil Adab Komunikasi</h2>
        <form onSubmit={handleSearch} className="flex space-x-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: adab menasihati"
                className="w-full px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark border-2 border-gray-200 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark focus:outline-none"
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                    <SearchIcon className="w-5 h-5"/>
                )}
            </button>
        </form>
         <div className="mt-4">
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            {searchResult && <QuoteCard item={searchResult} />}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3 px-1">Dalil Pilihan</h2>
        <div className="space-y-4">
            {CORNER_CONTENT.map((item, index) => (
                <QuoteCard key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};