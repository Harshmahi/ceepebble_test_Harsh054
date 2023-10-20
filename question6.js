const fs = require('fs');
const path = require('path');

function listFilesRecursively(directoryPath) {
  const files = [];

  function walk(dir) {
    const dirList = fs.readdirSync(dir);
    dirList.forEach((item) => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat && stat.isDirectory()) {
        walk(itemPath); // Recursively walk through subdirectories
      } else {
        files.push(itemPath);
      }
    });
  }

  walk(directoryPath);
  return files;
}

// Example usage:
const directoryPath = '/path/to/your/directory'; // Replace with the directory path you want to list
const files = listFilesRecursively(directoryPath);
console.log('List of files:');
console.log(files);