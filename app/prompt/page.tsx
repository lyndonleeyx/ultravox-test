// pages/prompt.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { usePrompt } from '../../contexts/promptcontext';
import { useRouter } from 'next/navigation';

const PromptPage: React.FC = () => {
  const { systemPrompt, setSystemPrompt } = usePrompt();
  const [promptInput, setPromptInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    setPromptInput(systemPrompt);
    console.log('PromptPage: systemPrompt updated to', systemPrompt);
  }, [systemPrompt]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptInput(e.target.value);
  };

  const handleUpdatePrompt = () => {
    console.log('PromptPage: Updating systemPrompt to', promptInput);
    setSystemPrompt(promptInput);
    router.push('/'); // Navigate back to the main page
  };

  return (
    <main>
      <div className="prompt-page">
      <div className="prompt-input-container">
        <textarea
          placeholder="Enter a custom prompt"
          value={promptInput}
          onChange={handlePromptChange}
          className="prompt-input"
          rows={4}
        ></textarea>
        <button onClick={handleUpdatePrompt} className="prompt-submit-button">
          Set Context
        </button>
      </div>
      <div className="current-prompt-container">
        <p>Current System Prompt:</p>
        <pre>{systemPrompt}</pre>
      </div>
    </div>
    </main>
  );
};

export default PromptPage;
