import React from 'react';
import { GeminiResponse } from '../types';
import { LightbulbIcon, InformationCircleIcon } from './icons';

interface ResultsCardProps {
  query: string;
  data: GeminiResponse;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ query, data }) => {
  const sortedAlternatives = [...data.alternatives].sort((a, b) =>
    a.expression.localeCompare(b.expression)
  );

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-5">
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Hasil untuk</p>
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark capitalize">
          "{query}"
        </h2>
         <div className="mt-3">
            <span className="inline-block bg-secondary-light/20 dark:bg-secondary-dark/20 text-secondary-light dark:text-secondary-dark text-xs font-semibold mr-2 px-2.5 py-1 rounded-full">
                Kategori: {data.category}
            </span>
        </div>
      </div>
      
      <div className="px-5 pb-5 space-y-6">
        {/* Definition Section */}
        <div>
          <div className="flex items-center space-x-2">
            <InformationCircleIcon className="w-5 h-5 text-primary-light dark:text-primary-dark" />
            <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">Arti Kata</h3>
          </div>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark text-sm border-l-4 border-gray-200 dark:border-slate-600 pl-4">{data.definition}</p>
        </div>

        {/* Alternatives Section */}
        <div>
          <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark mb-4">Alternatif Santun</h3>
          <div className="space-y-4">
            {sortedAlternatives.map((alt, index) => (
              <div key={index} className="border-l-4 border-primary-light dark:border-primary-dark pl-4">
                <p className="font-semibold text-lg text-primary-light dark:text-primary-dark">{alt.expression}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">{alt.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-green-50 dark:bg-slate-800 p-5">
         <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
                <LightbulbIcon className="w-6 h-6 text-secondary-light dark:text-secondary-dark" />
            </div>
            <div>
                <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">Prinsip Islami</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">{data.advice}</p>
            </div>
         </div>
      </div>
    </div>
  );
};