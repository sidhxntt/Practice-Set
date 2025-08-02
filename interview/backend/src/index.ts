#!/usr/bin/env ts-node

import {
  intro, outro, text, select, multiselect,
  confirm, spinner, cancel, isCancel
} from '@clack/prompts';
import chalk from 'chalk';
import { gitCommand } from './utils/gitCommand';
import { checkGitStatus } from './utils/checkGitStatus';
import { getChanges } from './utils/getFileChanges';
import { generateCommitMessage } from './utils/generateCommitMessage';
import { formatFileStatus } from './utils/formatFileStatus';
import { FileChange, GitChanges } from './utils/types/types';
import start from './utils/process_interruption';

async function main(): Promise<void> {
  console.clear();

  intro(chalk.bgBlue(' Auto Commit Tool '));

  const gitStatus = checkGitStatus();
  if (!gitStatus.valid) {
    cancel(gitStatus.reason);
    process.exit(1);
  }

  const changes: GitChanges = getChanges();
  let filesToCommit: FileChange[] = changes.staged;
  const allFiles = [...changes.staged, ...changes.unstaged, ...changes.untracked];

  if (allFiles.length === 0) {
    const status = gitCommand('status --porcelain');
    if (!status) {
      outro(chalk.green('✨ Working directory is clean. Nothing to commit! 🎉'));
    } else {
      outro(chalk.yellow('⚠️  No changes detected. Repository might be in an unusual state.'));
    }
    process.exit(0);
  }

  console.log(chalk.bold('\n📁 Repository Status:'));

  if (changes.staged.length > 0) {
    console.log(chalk.green('\nStaged files:'));
    changes.staged.forEach(({ status, file }) =>
      console.log(`  ${formatFileStatus(status)} ${file}`)
    );
  }

  if (changes.unstaged.length > 0) {
    console.log(chalk.yellow('\nUnstaged files:'));
    changes.unstaged.forEach(({ status, file }) =>
      console.log(`  ${formatFileStatus(status)} ${file}`)
    );
  }

  if (changes.untracked.length > 0) {
    console.log(chalk.cyan('\nUntracked files:'));
    changes.untracked.forEach(({ status, file }) =>
      console.log(`  ${formatFileStatus(status)} ${file}`)
    );
  }

  if (changes.staged.length === 0) {
    const stageOption = await select({
      message: 'No files are staged. What would you like to do?',
      options: [
        { value: 'all', label: 'Stage all changes' },
        { value: 'select', label: 'Select files to stage' },
        { value: 'cancel', label: 'Cancel' }
      ]
    });

    if (isCancel(stageOption) || stageOption === 'cancel') {
      cancel('Operation cancelled');
      process.exit(0);
    }

    if (stageOption === 'all') {
      const s = spinner();
      s.start('Staging all files...');
      gitCommand('add .');
      s.stop('All files staged');
      filesToCommit = getChanges().staged;
    } else if (stageOption === 'select') {
      const unstaged = [...changes.unstaged, ...changes.untracked];
      const selectedFiles = await multiselect({
        message: 'Select files to stage:',
        options: unstaged.map(({ status, file }) => ({
          value: file,
          label: `${formatFileStatus(status)} ${file}`
        })),
        required: true
      });

      if (isCancel(selectedFiles)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      const s = spinner();
      s.start('Staging selected files...');
      (selectedFiles as string[]).forEach(file => {
        gitCommand(`add "${file}"`);
      });
      s.stop('Files staged');
      filesToCommit = getChanges().staged;
    }
  }

  if (filesToCommit.length === 0) {
    const currentStatus = getChanges();
    if (currentStatus.staged.length === 0 &&
        (currentStatus.unstaged.length > 0 || currentStatus.untracked.length > 0)) {
      outro(chalk.yellow('⚠️  Files were staged but staging was lost. Please try again.'));
    } else {
      outro(chalk.yellow('ℹ️  No files to commit after staging process.'));
    }
    process.exit(0);
  }

  const generatedMessage = generateCommitMessage(filesToCommit);

  console.log(chalk.bold('\n📝 Files to commit:'));
  filesToCommit.forEach(({ status, file }) =>
    console.log(`  ${formatFileStatus(status)} ${file}`)
  );

  const messageOption = await select({
    message: 'How would you like to create the commit message?',
    options: [
      { value: 'generated', label: `Use generated: "${generatedMessage}"` },
      { value: 'custom', label: 'Write custom message' },
      { value: 'edit', label: 'Edit generated message' }
    ]
  });

  if (isCancel(messageOption)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  let commitMessage = generatedMessage;

  if (messageOption === 'custom') {
    commitMessage = await text({
      message: 'Enter commit message:',
      placeholder: 'feat: add new feature',
      validate: value => !value.trim() ? 'Commit message is required' : undefined
    }) as string;

    if (isCancel(commitMessage)) {
      cancel('Operation cancelled');
      process.exit(0);
    }
  } else if (messageOption === 'edit') {
    commitMessage = await text({
      message: 'Edit commit message:',
      initialValue: generatedMessage,
      validate: value => !value.trim() ? 'Commit message is required' : undefined
    }) as string;

    if (isCancel(commitMessage)) {
      cancel('Operation cancelled');
      process.exit(0);
    }
  }

  const shouldCommit = await confirm({
    message: `Commit with message: "${commitMessage}"?`
  });

  if (isCancel(shouldCommit) || !shouldCommit) {
    cancel('Commit cancelled');
    process.exit(0);
  }

  const s = spinner();
  s.start('Committing changes...');

  try {
    const escapedMessage = JSON.stringify(commitMessage);
    const result = gitCommand(`commit -m ${escapedMessage}`);

    if (result === null) {
      s.stop('❌ Commit failed');
      cancel('Failed to commit changes. Please check your git status.');
      process.exit(1);
    }

    const lastCommit = gitCommand('log -1 --oneline');
    if (!lastCommit) {
      s.stop('⚠️  Commit status unclear');
      console.log(chalk.yellow('Commit may not have been created. Please check git status manually.'));
    } else {
      s.stop('✅ Changes committed successfully!');
      console.log(chalk.dim(`Last commit: ${lastCommit}`));
    }

    const shouldPush = await confirm({
      message: 'Push to remote repository?'
    });

    if (!isCancel(shouldPush) && shouldPush) {
      const pushSpinner = spinner();
      pushSpinner.start('Pushing to remote...');

      const remotes = gitCommand('remote');
      if (!remotes) {
        pushSpinner.stop('⚠️  No remote repository configured');
        console.log(chalk.yellow('No remote repository found. Skipping push.'));
      } else {
        try {
          const pushResult = gitCommand('push');
          if (pushResult !== null) {
            pushSpinner.stop('🚀 Changes pushed successfully!');
          } else {
            pushSpinner.stop('❌ Push failed');
            console.log(chalk.red('Failed to push. You may need to set upstream branch.'));
            const branch = gitCommand('rev-parse --abbrev-ref HEAD');
            console.log(chalk.dim(`Try: git push --set-upstream origin ${branch}`));
          }
        } catch (error: any) {
          pushSpinner.stop('❌ Push failed');
          console.log(chalk.red('Failed to push. Error details:'));
          console.log(chalk.dim(error.message));
        }
      }
    }

    outro(chalk.green('🎉 All done!'));

  } catch (error: any) {
    s.stop('❌ Commit failed');

    const msg = error.message || '';
    if (msg.includes('nothing to commit')) {
      cancel('Nothing to commit - working tree clean');
    } else if (msg.includes('Please tell me who you are')) {
      cancel('Git user not configured. Run: git config --global user.email "you@example.com"');
    } else if (msg.includes('not a git repository')) {
      cancel('Not in a git repository');
    } else {
      cancel(`Failed to commit: ${msg}`);
    }
    process.exit(1);
  }
}

start(main)