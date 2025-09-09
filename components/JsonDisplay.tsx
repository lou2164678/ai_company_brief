
import React, { useState, useCallback } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface JsonDisplayProps {
    data: object;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
    const [isCopied, setIsCopied] = useState(false);
    const jsonString = JSON.stringify(data, null, 2);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(jsonString).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }, [jsonString]);

    return (
        <div className="bg-slate-950/70 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                <p className="text-sm font-medium text-slate-300">Generated JSON Brief</p>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
                >
                    {isCopied ? (
                        <>
                           <CheckIcon />
                           Copied!
                        </>
                    ) : (
                        <>
                            <ClipboardIcon />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-auto">
                <pre>
                    <code className="text-sm text-white whitespace-pre-wrap break-all">
                        {jsonString}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default JsonDisplay;
