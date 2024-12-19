'use client';
import React, { createContext, useContext, useEffect, useState } from 'react'
import demoConfig from '../demo-config';

const PromptContext = createContext({
  systemPrompt: '',
  setSystemPrompt: (prompt: string) => {},
});

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemPrompt, setSystemPrompt] = useState(demoConfig.callConfig.systemPrompt);

  console.log('PromptContext System Prompt:', systemPrompt);

  return (
    <PromptContext.Provider value={{ systemPrompt, setSystemPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);
