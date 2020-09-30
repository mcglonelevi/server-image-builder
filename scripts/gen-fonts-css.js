// Use this script to generate the fontface file to load fonts in the browser.

const glob = require('glob');
const fs = require('fs');

const generateFontFace = (fontFolderLocation) => {
    const fontNameExploded = fontFolderLocation.split('/');
    const file = fontNameExploded[fontNameExploded.length - 1];

    return `@font-face {
        font-family: "${file.replace('-Regular.ttf', '')}";
        src: url("./fonts/${fontFolderLocation.replace('src/fonts/', '')}") format('truetype');
    }
    `;
}

glob('src/fonts/**/*-Regular.ttf', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach((file) => {
        fs.appendFile('src/Fonts.css', generateFontFace(file), (err) => {
            console.log(err);
        });
    });
});
