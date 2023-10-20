const fs = require('fs');

function readTextFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}

readTextFile('example.txt', (err, content) => {
  if (err) {
    console.error('Error reading the file:', err);
  } else {
    console.log('File content:', content);
  }
});