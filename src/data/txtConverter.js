const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'trials-summary.txt');
const outputPath = path.join(__dirname, 'trials.json');

fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n');
  const trials = [];

  let currentTrial = {};

  for (const line of lines) {
    const trimmed = line.trim();

    // Start of a new trial
    if (trimmed.startsWith('EudraCT Number:')) {
      // Push the previous trial if it has content
      if (Object.keys(currentTrial).length > 0) {
        trials.push(currentTrial);
        currentTrial = {};
      }
    }

    const match = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      currentTrial[key] = value;
    }
  }

  // Push the last trial
  if (Object.keys(currentTrial).length > 0) {
    trials.push(currentTrial);
  }

  fs.writeFile(outputPath, JSON.stringify(trials, null, 2), err => {
    if (err) throw err;
    console.log(`✅ Successfully parsed ${trials.length} trials to ${outputPath}`);
  });
});
