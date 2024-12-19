'use client';
import React, { useState } from 'react';
import { PromptProvider, usePrompt } from '../contexts/promptcontext'

const PromptPage: React.FC = () => {
  const {systemPrompt, setSystemPrompt} = usePrompt();
  const [promptInput, setPromptInput] = useState('');

  
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptInput(e.target.value);
  };

  const handleUpdatePrompt = () => {
    setSystemPrompt(promptInput);
  };

  return (
    <PromptProvider>
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
    </PromptProvider>
  );
};

export default PromptPage;