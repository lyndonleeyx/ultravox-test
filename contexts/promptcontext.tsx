'use client';
import React, { createContext, useContext, useEffect, useState } from 'react'
import demoConfig from '../app/demo-config';

const PromptContext = createContext({
  systemPrompt: '',
  setSystemPrompt: (prompt: string) => {},
});

const setSystemPrompt = (prompt: string) => {
  console.log('setSystemPrompt called with:', prompt);
  setSystemPrompt(prompt);
};

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemPrompt, setSystemPrompt] = useState(demoConfig.callConfig.systemPrompt);

  useEffect(() => {
    console.log('Current System Prompt in Provider:', systemPrompt);
  }, [systemPrompt]);
  //console.log('PromptContext System Prompt:', systemPrompt);

  return (
    <PromptContext.Provider value={{ systemPrompt, setSystemPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompt = () => useContext(PromptContext);
