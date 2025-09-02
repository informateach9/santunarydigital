import React, { useState } from 'react';
import { LogoIcon } from './icons';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password.toLowerCase() === 'admin') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Username atau password salah.');
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-8 bg-background-light dark:bg-background-dark">
      <div className="text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-2xl mb-4">
            <LogoIcon className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          Kamus Santun Virtual
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
          Masuk untuk memulai perjalanan adab digital.
        </p>
      </div>

      <form onSubmit={handleLogin} className="w-full mt-10 space-y-4">
        <div>
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark border-2 border-gray-200 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark focus:outline-none focus:ring-1 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50 transition"
            required
          />
        </div>
        <div>
          <label 
            htmlFor="password"
            className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin"
            className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark border-2 border-gray-200 dark:border-slate-600 focus:border-primary-light dark:focus:border-primary-dark focus:outline-none focus:ring-1 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50 transition"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white font-bold py-3 px-4 rounded-lg transition-transform transform active:scale-95"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};