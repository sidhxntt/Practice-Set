const fs = require('fs');
const path = require('path');

function readFileSync(filePath) {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    const data = fs.readFileSync(absolutePath, 'utf-8');
    return data;
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

function saveDataSync() {
  try {
    const file1 = readFileSync('../data/file1.txt');
    const file2 = readFileSync('../data/file2.txt');
    const file3 = readFileSync('../data/file3.txt');
    const file4 = readFileSync('../data/file4.txt');
    const file5 = readFileSync('../data/file5.txt');
    const file6 = readFileSync('../data/file6.txt');
    return {
      file1,
      file2,
      file3,
      file4,
      file5,
      file6,
    };
  } catch (err) {
    console.error('Error saving data:', err);
    throw err; // Rethrow the error to handle it in the caller
  }
}

try {
  const fileData = saveDataSync();
  module.exports = fileData;
} catch (err) {
  console.error('Failed to save and export data:', err);
}
