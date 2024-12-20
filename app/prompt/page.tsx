// pages/prompt.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { usePrompt } from '../../contexts/promptcontext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as cheerio from 'cheerio';


const PromptPage: React.FC = () => {
  const { systemPrompt, setSystemPrompt } = usePrompt();
  const [promptInput, setPromptInput] = useState('');
  const [googleDocContent, setGoogleDocContent] = useState('');
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

  const fetchGoogleDocContent = async () => {
    const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vQnG-ZkQH7DHpqCIHUiVjdf-Wiq0hMPqgxQLb1hp0YRYq4oPP27_50OnK0_LByIgpDCFwaSLnTdtMQw/pub'; // Replace with your published Google Doc URL

    try {
      // Fetch the Google Doc HTML content
      const { data: html } = await axios.get(docUrl);

      // Load the HTML into Cheerio
      const $ = cheerio.load(html);

        // Remove inline styles from all elements
          // Narrowing down to the specific content area
      let content = $('body')
      .find(':not(script):not(style)') // Exclude scripts and styles
      .contents()
      .filter(function () {
        return this.type === 'text' && $(this).text().trim() !== ''; // Include only text nodes with meaningful content
      })
      .map(function () {
        return $(this).text().trim(); // Extract and trim text
      })
      .get()
      .join(' '); // Join all meaningful text together

      // Remove standard boilerplate text
    const boilerplatePhrases = [
      'Published using Google Docs',
      'Report abuse',
      'Learn more',
      'MB Demo File for Fetching',
      'Updated automatically every 5 minutes',
      'Tab 2',
    ];

    boilerplatePhrases.forEach((phrase) => {
      const regex = new RegExp(`\\b${phrase}\\b`, 'g');
      content = content.replace(regex, '').trim();
    });


      console.log('Extracted Google Doc Content:', content);

      // Update the prompt input with the fetched content
      setPromptInput(content);
    } catch (error) {
      console.error('Error fetching Google Doc content:', error);
    }
  };

  return (
    <main>
      <div className="prompt-page">
      <div className="prompt-input-container">
      <h1>New Prompt</h1>
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
      <button onClick={fetchGoogleDocContent} className="fetch-doc-button">
          Fetch Content from Google Doc
        </button>
      <h1>Current Prompt</h1>
      <div className="current-prompt-container">
        <pre>{systemPrompt}</pre>
      </div>
    </div>
    </main>
  );
};

export default PromptPage;
