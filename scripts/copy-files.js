const fs = require('fs-extra');

fs.copySync('package.json', 'dist/package.json');
fs.copySync('README.md', 'dist/README.md');
fs.copySync('LICENSE', 'dist/LICENSE');
fs.copySync('src/types', 'dist/types');
