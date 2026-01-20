#!/usr/bin/env node
import axios from 'axios';
import path from 'path';
import chalk from 'chalk';

// --- CONFIGURATION ---
const OWNER = 'facebook';
const REPO = 'react';
const BRANCH = 'main';
const MAX_HOTSPOT_LINES = 300; // mark files with >300 lines as hotspots

const headers = {
  'User-Agent': 'repo-analyzer',
  // Optional: add your token to avoid GitHub rate limits
  // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

async function getRepoTree(owner, repo, branch = 'main') {
  const branchRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`,
    { headers }
  );
  const treeSha = branchRes.data.commit.commit.tree.sha;

  const treeRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`,
    { headers }
  );

  return treeRes.data.tree;
}

async function getFileContent(owner, repo, path) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${BRANCH}/${path}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    return null;
  }
}

function buildTree(paths) {
  const tree = {};
  for (const file of paths) {
    const parts = file.path.split('/');
    let current = tree;
    for (const part of parts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
  }
  return tree;
}

function analyzeComplexity(content) {
  if (!content) return { lines: 0, avgLength: 0, complexity: 0 };

  const lines = content.split('\n');
  const numLines = lines.length;
  const avgLength =
    lines.reduce((sum, line) => sum + line.length, 0) / (numLines || 1);

  // Simple heuristic: more lines + longer lines => higher complexity
  const complexity = (numLines * avgLength) / 100;

  return { lines: numLines, avgLength, complexity };
}

function printTree(treeObj, basePath = '', indent = '') {
  const entries = Object.keys(treeObj);
  entries.forEach(async (key, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const currentPath = path.join(basePath, key);

    if (Object.keys(treeObj[key]).length === 0) {
      // It's a file
      let display = indent + connector + key;

      if (/\.(js|ts|jsx|tsx)$/.test(key)) {
        const content = await getFileContent(OWNER, REPO, currentPath);
        const stats = analyzeComplexity(content);

        let marker = '';
        if (stats.lines > MAX_HOTSPOT_LINES)
          marker = chalk.red('🔥 hotspot');
        else if (stats.lines > MAX_HOTSPOT_LINES / 2)
          marker = chalk.yellow('⚠️  medium');

        display += chalk.gray(
          `  (${stats.lines} lines, complexity=${stats.complexity.toFixed(1)})`
        );
        if (marker) display += ' ' + marker;
      }

      console.log(display);
    } else {
      console.log(indent + connector + chalk.bold(key));
      const nextIndent = indent + (isLast ? '    ' : '│   ');
      await printTree(treeObj[key], currentPath, nextIndent);
    }
  });
}

(async () => {
  console.log(`📂 Fetching file structure for ${OWNER}/${REPO} (${BRANCH})...`);

  const tree = await getRepoTree(OWNER, REPO, BRANCH);
  const paths = tree.filter(item => item.type === 'blob' || item.type === 'tree');
  const structured = buildTree(paths);

  console.log('\nAnalyzing repo complexity...\n');
  await printTree(structured);
})();
