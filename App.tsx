import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ResultsCard } from './components/ResultsCard';
import { BottomNav } from './components/BottomNav';
import { Login } from './components/Login';
import { getPoliteAlternatives } from './services/geminiService';
import { GeminiResponse, Page } from './types';
import { INITIAL_EXAMPLES, DAILY_CHALLENGES } from './constants';
import { CornerContent } from './components/CornerContent';
import { CommunityContent } from './components/CommunityContent';
import { DailyChallengeCard } from './components/DailyChallengeCard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('Sialan');
  const [results, setResults] = useState<GeminiResponse | null>(INITIAL_EXAMPLES["Sialan"]);
  const [activePage, setActivePage] = useState<Page>(Page.Dictionary);
  const [dailyChallenge, setDailyChallenge] = useState<string>('');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    // Select a random daily challenge on component mount
    setDailyChallenge(DAILY_CHALLENGES[Math.floor(Math.random() * DAILY_CHALLENGES.length)]);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setResults(null);
    setSearchTerm(query);

    try {
      // Use a case-insensitive check and trim whitespace for keys in INITIAL_EXAMPLES
      const cleanedQuery = query.trim();
      const initialExampleKey = Object.keys(INITIAL_EXAMPLES).find(k => k.toLowerCase() === cleanedQuery.toLowerCase());

      if (initialExampleKey) {
        setResults(INITIAL_EXAMPLES[initialExampleKey]);
        return;
      }
      const data = await getPoliteAlternatives(cleanedQuery);
      setResults(data);
    } catch (err) {
      setError('Gagal mendapatkan alternatif. Mohon coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const renderContent = () => {
    switch (activePage) {
      case Page.Dictionary:
        return (
          <>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <div className="px-4">
              <DailyChallengeCard challenge={dailyChallenge} />
            </div>
            <div className="mt-4 px-4 pb-24 space-y-4">
              {isLoading && (
                <div className="flex justify-center items-center p-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-light dark:border-primary-dark"></div>
                </div>
              )}
              {error && <p className="text-center text-red-500">{error}</p>}
              {results && <ResultsCard query={searchTerm} data={results} />}
            </div>
          </>
        );
      case Page.Corner:
        return <CornerContent />;
      case Page.Community:
         return <CommunityContent />;
      default:
        return null;
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center p-2 sm:p-4">
      <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-background-light dark:bg-background-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border-4 border-gray-300 dark:border-gray-700">
        {!isAuthenticated ? (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} activePage={activePage} />
            <main className="flex-grow overflow-y-auto">
              {renderContent()}
            </main>
            <BottomNav activePage={activePage} onNavigate={setActivePage} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;