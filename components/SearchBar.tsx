import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, MicrophoneIcon } from './icons';

// Fix: Add type definitions for Web Speech API to fix TypeScript errors.
// The SpeechRecognition API is not part of the standard TypeScript DOM library,
// so we need to declare the interfaces to make the compiler aware of them.
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      }
    }
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}


interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'id-ID';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript); 
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
        recognitionRef.current?.stop();
    };
  }, [onSearch]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  const handleVoiceSearch = () => {
    if (isLoading || !recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="p-4 pt-6 sticky top-0 bg-background-light dark:bg-background-dark z-5">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kata umpatan..."
          className="w-full pl-10 pr-12 py-3 rounded-full bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark border-2 border-transparent focus:border-primary-light dark:focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50 transition"
          disabled={isLoading}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon className="w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark" />
        </div>
        <button
            type="button"
            onClick={handleVoiceSearch}
            disabled={isLoading || !recognitionRef.current}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Search with voice"
        >
            <MicrophoneIcon className={`w-6 h-6 ${isListening ? 'text-red-500' : 'text-text-secondary-light dark:text-text-secondary-dark'}`} />
        </button>
      </form>
    </div>
  );
};
