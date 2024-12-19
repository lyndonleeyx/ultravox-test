'use client';
import demoConfig from '../demo-config';
import React, { useState } from 'react';

const PromptPage: React.FC = () => {
  const [promptInput, setPromptInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(demoConfig.callConfig.systemPrompt);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptInput(e.target.value);
  };

  const handleUpdatePrompt = () => {
    setSystemPrompt(promptInput);
  };

  return (
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
  );
};

export default PromptPage;