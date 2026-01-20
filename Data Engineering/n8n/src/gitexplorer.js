#!/usr/bin/env node
import { intro, text, spinner, outro } from '@clack/prompts';
import axios from 'axios';

// 🔗 Your n8n webhook
const WEBHOOK_URL = 'https://sidhxntt.app.n8n.cloud/webhook-test/bb243678-64bf-47b9-b186-2caca8153c5c';

// ✅ Only allow base GitHub repo URLs (owner/repo)
const GITHUB_REPO_REGEX = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/;

// 🧩 Ask for one repo URL
async function askRepo() {
  const repoUrl = await text({
    message: '🔗 Enter a GitHub repository URL (only base repo, e.g. https://github.com/owner/repo):',
    placeholder: 'https://github.com/facebook/react',
    validate(value) {
      if (!value || value.trim().length === 0)
        return 'Please enter a valid GitHub repository URL.';
      if (!GITHUB_REPO_REGEX.test(value.trim())) {
        return '❌ Invalid URL. Only base GitHub repo URLs are allowed (e.g. https://github.com/owner/repo)';
      }
    },
  });

  return repoUrl.trim();
}

// 🧠 Pretty printing for n8n’s structured JSON
function printFormattedResponse(data) {
  console.log('\n==============================\n');

  data.forEach((section, index) => {
    const keys = Object.keys(section);
    console.log(`📦 Section ${index + 1}:\n`);

    for (const key of keys) {
      const value = section[key];

      // 🧾 1️⃣ Simple values
      if (typeof value === 'string' || typeof value === 'number') {
        console.log(`• ${key}: ${value}`);
      }

      // 🧠 2️⃣ Arrays
      else if (Array.isArray(value)) {
        if (key === 'top_5_contributors') {
          console.log(`👥 Top 5 Contributors:`);
          value.forEach((c, i) => {
            console.log(`   ${i + 1}. ${c.user} (${c.contribution_count} commits)`);
          });
        } else if (key === 'total_weekly_commits') {
          console.log(`📅 Weekly Commits (last ${value.length} weeks):`);
          console.log('   ' + value.join(', '));
        } else {
          console.log(`• ${key}: ${JSON.stringify(value, null, 2)}`);
        }
      }

      // 🧩 3️⃣ Objects (like language_composition)
      else if (typeof value === 'object' && value !== null) {
        if (key === 'language_composition') {
          console.log(`💻 Language Composition:`);
          const entries = Object.entries(value).sort((a, b) => b[1] - a[1]);
          for (const [lang, bytes] of entries) {
            console.log(`   ${lang}: ${bytes.toLocaleString()} bytes`);
          }
        } else {
          console.log(`• ${key}: ${JSON.stringify(value, null, 2)}`);
        }
      }
    }

    console.log('\n------------------------------\n');
  });

  console.log('✅ Done displaying n8n data.\n');
}

// 🚀 Send request to n8n and show response
async function sendRepoToN8N(repoUrl) {
  const s = spinner();
  s.start('⏳ Analysing...');

  try {
    const response = await axios.post(WEBHOOK_URL, { repo_url: repoUrl }, { timeout: 0 });
    s.stop('✅ Received response from n8n!');

    const data = response.data;

    if (Array.isArray(data)) {
      printFormattedResponse(data);
    } else if (typeof data === 'object') {
      printFormattedResponse([data]);
    } else {
      console.log('\n🧠 Raw Response:\n', data);
    }
  } catch (error) {
    s.stop('❌ Failed to get a response.');
    outro(`Error: ${error.message}`);
  }
}

// 🎬 Main
async function main() {
  console.clear();
  intro('🚀 GitHub Repo → n8n Analyzer CLI');

  const repoUrl = await askRepo();
  await sendRepoToN8N(repoUrl);

  outro('👋 Finished! Exiting now.');
}

main();
