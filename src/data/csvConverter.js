const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const results = [];

fs.createReadStream(path.resolve(__dirname, 'ctg-studies(3).csv'))
  .pipe(csv({
    separator: ',', // Ensure correct delimiter
    mapHeaders: ({ header }) => header.trim(),
    mapValues: ({ value }) => value.trim()
  }))
  .on('data', (data) => {
    // Optional: split pipe-separated fields into arrays
    if (data.Conditions) {
      data.Conditions = data.Conditions.split('|');
    }
    if (data.Interventions) {
      data.Interventions = data.Interventions.split('|');
    }
    results.push(data);
  })
  .on('end', () => {
    console.log(results);
    // Optional: Save to JSON file
    fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
  });
