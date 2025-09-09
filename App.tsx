
import React, { useState, useCallback } from 'react';
import type { CompanyBrief } from './types';
import { generateCompanyBrief } from './services/geminiService';
import Loader from './components/Loader';
import JsonDisplay from './components/JsonDisplay';

const App: React.FC = () => {
    const [companyName, setCompanyName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [briefData, setBriefData] = useState<CompanyBrief | null>(null);

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!companyName.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setBriefData(null);

        try {
            const result = await generateCompanyBrief(companyName);
            setBriefData(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    }, [companyName, isLoading]);

    return (
        <div className="min-h-screen bg-slate-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                        AI Company Brief Generator
                    </h1>
                    <p className="text-lg text-slate-400">
                        Enter a company name to generate an evidence-based, comprehensive brief in JSON format.
                    </p>
                </header>

                <main>
                    <div className="bg-slate-800/50 rounded-lg p-6 shadow-2xl backdrop-blur-sm border border-slate-700 mb-8">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="company-name" className="block text-sm font-medium text-slate-300 mb-2">
                                Company Name
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    id="company-name"
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="e.g., 'Nvidia' or 'OpenAI'"
                                    className="flex-grow bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !companyName.trim()}
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition duration-200"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader />
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate Brief'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 min-h-[300px]">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center text-center text-slate-400">
                                <Loader />
                                <p className="mt-4 text-lg">Researching and compiling brief for <span className="font-bold text-white">{companyName}</span>...</p>
                                <p className="text-sm">This may take a moment.</p>
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        {briefData && (
                           <JsonDisplay data={briefData} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
