// Use this script to generate the fontface file to load fonts in the browser.

const glob = require('glob');
const fs = require('fs');

const generateFontFace = (fontName, fontLocation) => {
    return `@font-face {
        font-family: "${fontName}";
        src: url("./fonts/${fontLocation}") format('truetype');
    }
    `;
}

glob('src/fonts/**/*.ttf', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
 
    const fontMapping = files.reduce((acc, file) => {
        const fontLocationExploded = file.split('/');
        const fileName = fontLocationExploded[fontLocationExploded.length - 1].replace('-Regular', '').replace('.ttf', '');

        if (!fileName.includes('[')) {
            acc[fileName] = file;
        }

        return acc;
    }, {});

    fs.writeFileSync('src/Font.json', JSON.stringify(Object.keys(fontMapping)));

    Object.keys(fontMapping).forEach((fontName) => {
        fs.appendFileSync('src/Fonts.css', generateFontFace(fontName, fontMapping[fontName]));
    });
});
