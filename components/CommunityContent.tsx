import React, { useState } from 'react';
import { INSPIRATIONAL_STORIES } from '../constants';
import { StoryAnalysisResult, IslamicQuote } from '../types';
import { analyzeStory } from '../services/geminiService';
import { QuoteIcon, SparklesIcon } from './icons';

const QuoteCard: React.FC<{ item: IslamicQuote; title: string }> = ({ item, title }) => (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border-l-4 border-secondary-light dark:border-secondary-dark mt-4">
      <div className="p-5">
        <h3 className="font-bold text-md text-text-primary-light dark:text-text-primary-dark mb-3">
            {title}
        </h3>
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


export const CommunityContent: React.FC = () => {
    const [storyInput, setStoryInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState<StoryAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!storyInput.trim()) return;
        
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeStory(storyInput);
            setAnalysisResult(result);
        } catch (err) {
            setError('Gagal menganalisis cerita. Mohon coba lagi.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-4 space-y-6 pb-20">
            <div>
                <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3 px-1">Kisah Teladan</h2>
                <div className="space-y-2">
                    {INSPIRATIONAL_STORIES.map((story, index) => (
                        <details key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm group">
                            <summary className="p-4 font-medium cursor-pointer list-none flex justify-between items-center text-text-primary-light dark:text-text-primary-dark">
                                {story.title}
                                <span className="text-primary-light dark:text-primary-dark transform transition-transform duration-200 group-open:rotate-90">&#9656;</span>
                            </summary>
                            <div className="p-4 border-t border-gray-200 dark:border-slate-600">
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">{story.content}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>

            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-md">
                <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3">Refleksikan Ceritamu</h2>
                <form onSubmit={handleAnalyze}>
                    <textarea
                        value={storyInput}
                        onChange={(e) => setStoryInput(e.target.value)}
                        placeholder="Ceritakan pengalamanmu atau sebuah skenario di sini, lalu dapatkan hikmahnya..."
                        className="w-full h-32 px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark border-2 border-gray-200 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !storyInput.trim()}
                        className="w-full mt-3 px-4 py-2.5 bg-secondary-light hover:bg-secondary-light/90 dark:bg-secondary-dark dark:hover:bg-secondary-dark/90 text-slate-800 dark:text-slate-900 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                         {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                        ) : (
                            <>
                                <SparklesIcon className="w-5 h-5"/>
                                <span>Dapatkan Hikmah</span>
                            </>
                        )}
                    </button>
                </form>
                <div className="mt-4">
                    {error && <p className="text-center text-sm text-red-500">{error}</p>}
                    {analysisResult && (
                        <div>
                            <div className="p-4 bg-green-50 dark:bg-slate-800/50 rounded-lg">
                                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">Hikmah dari Cerita</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{analysisResult.moral}</p>
                            </div>
                            <QuoteCard item={analysisResult.scripture} title="Dalil Terkait" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};