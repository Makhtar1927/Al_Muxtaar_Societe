const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath, pattern);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (pattern.test(content)) {
        console.log(`MATCH in: ${fullPath}`);
      }
    }
  }
}

searchDir('.', /Pape\s+Makhtar|Aidara/i);

