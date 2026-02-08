const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'Blog/posts');
const outputFile = path.join(postsDir, 'posts.json');

fs.readdir(postsDir, (err, files) => {
    if (err) throw err;

    const htmlFiles = files.filter(f => f.endsWith('.html'));
    // Sort newest → oldest based on filename (YYYY-MM-DD)
    htmlFiles.sort((a, b) => b.localeCompare(a));

    fs.writeFile(outputFile, JSON.stringify(htmlFiles, null, 2), err => {
        if (err) throw err;
        console.log('posts.json updated!');
    });
});
