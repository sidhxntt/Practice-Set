export interface GitStatusResult {
  valid: boolean;
  reason?: string;
}

export interface FileChange {
  status: string;
  file: string;
}

export interface GitChanges {
  staged: FileChange[];
  unstaged: FileChange[];
  untracked: FileChange[];
}