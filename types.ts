export interface Alternative {
  expression: string;
  context: string;
}

export interface GeminiResponse {
  definition: string;
  category: string;
  alternatives: Alternative[];
  advice: string;
}

export enum Page {
  Dictionary = 'Dictionary',
  Corner = 'Corner',
  Community = 'Community',
}

export interface IslamicQuote {
  type: 'Quran' | 'Hadith';
  text: string;
  source: string;
  explanation: string;
}

export type DailyChallenge = string;

export interface Story {
  title: string;
  content: string;
}

export interface StoryAnalysisResult {
    moral: string;
    scripture: IslamicQuote;
}