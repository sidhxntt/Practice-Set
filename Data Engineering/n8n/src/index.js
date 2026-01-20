#!/usr/bin/env node
import { intro, text, spinner, outro, confirm } from '@clack/prompts';
import axios from 'axios';

// Your webhook URL
const WEBHOOK_URL = 'https://sidhxntt.app.n8n.cloud/webhook/af8b305a-51dc-406d-afaa-35ed7b6e1dd0';

async function askQuestion() {
  const question = await text({
    message: '💬 What question would you like to ask?',
    placeholder: 'Type your question here...',
    validate(value) {
      if (!value || value.trim().length === 0) return 'Please enter a valid question.';
    },
  });

  const s = spinner();
  s.start('⏳ Sending question to n8n and waiting for response...');

  try {
    const response = await axios.post(WEBHOOK_URL, { question }, { timeout: 0 });

    s.stop('✅ Received response from n8n!');

    // Handle different possible response formats
    let answer;

    if (Array.isArray(response.data)) {
      // Example: [{ output: "text" }]
      answer = response.data[0]?.output || response.data[0]?.answer || JSON.stringify(response.data, null, 2);
    } else if (typeof response.data === 'object') {
      answer = response.data.output || response.data.answer || JSON.stringify(response.data, null, 2);
    } else {
      answer = String(response.data);
    }

    // Clean up formatting (remove unnecessary whitespace/newlines)
    answer = answer.trim();

    outro(`🧠 Answer:\n${answer}`);
  } catch (error) {
    s.stop('❌ Failed to get a response.');
    outro(`Error: ${error.message}`);
  }
}

async function main() {
  console.clear();
  intro('🚀 n8n CLI Q&A Tool');

  let continueAsking = true;

  while (continueAsking) {
    await askQuestion();

    continueAsking = await confirm({
      message: 'Do you want to ask another question?',
      initialValue: true,
    });
  }

  outro('👋 Exiting. Have a great day!');
}

main();
