const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 2019;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/blocks', (req, res) => {
    let availableBlocks = [];
    fs.readdirSync('./src/blocks').forEach(file => {
        if(fs.readFileSync('./src/blocks/' + file, 'utf8').startsWith('//hidden') == false){
            availableBlocks.push('/blocks/' + file);
        }
    });

    availableBlocks = availableBlocks.sort((a, b) => {
        if (a.startsWith('base') && !b.startsWith('base')) {
            return -1;
        } else if (!a.startsWith('base') && b.startsWith('base')) {
            return 1;
        } else {
            return 0;
        }
    });

    res.send(availableBlocks);
});

app.get('/styles', (req, res) => {
    let availableBlocks = [];
    fs.readdirSync('./src/styles').forEach(file => {
        if(fs.readFileSync('./src/styles/' + file, 'utf8').startsWith('//hidden') == false){
            availableBlocks.push('/styles/' + file);
        }
    });

    res.send(availableBlocks);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
