import React from 'react';
import { ChallengeIcon } from './icons';

interface DailyChallengeCardProps {
  challenge: string;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({ challenge }) => {
  if (!challenge) return null;

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md p-4 mt-4 border-t-4 border-primary-light dark:border-primary-dark">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <ChallengeIcon className="w-6 h-6 text-primary-light dark:text-primary-dark" />
        </div>
        <div>
          <h3 className="font-bold text-md text-text-primary-light dark:text-text-primary-dark">
            Tantangan Adab Hari Ini
          </h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
            {challenge}
          </p>
        </div>
      </div>
    </div>
  );
};