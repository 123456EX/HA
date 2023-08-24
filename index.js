const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const katex = require('katex');
require('katex/contrib/mhchem'); // modify katex module

app.use(cors());
app.use(require('cookie-parser')());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { readFileSync } = require('fs');

app.all('*', (req, res, next) => {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' == req.method) return res.send(200);
    else return next();
});

app.get('/', (req, res) => { res.sendFile('index.html', { root: path.join(__dirname) }, err => { }); });
app.get('/script.js', (req, res) => { res.sendFile('script.js', { root: path.join(__dirname) }, err => { }); });
app.get('/style.css', (req, res) => { res.sendFile('style.css', { root: path.join(__dirname) }, err => { }); });
app.get('/jquery.min.js', (req, res) => { res.sendFile('jquery.min.js', { root: path.join(__dirname) }, err => { }); });
app.get('/consola.ttf', (req, res) => { res.sendFile('consola.ttf', { root: path.join(__dirname) }, err => { }); });
app.get('/block.png', (req, res) => { res.sendFile('block.png', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/favicon.ico', (req, res) => { res.sendFile('favicon.ico', { root: path.join(__dirname) }, err => { console.log(err) }); });
//Katex
app.get('/katex.css', (req, res) => { res.sendFile('node_modules/katex/dist/katex.css', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/katex.js', (req, res) => { res.sendFile('node_modules/katex/dist/katex.js', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/mhchem.js', (req, res) => { res.sendFile('node_modules/katex/dist/contrib/mhchem.js', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/mathtex-script-type.js', (req, res) => { res.sendFile('node_modules/katex/dist/contrib/mathtex-script-type.js', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/fonts/KaTeX_Math-Italic.ttf', (req, res) => { res.sendFile('node_modules/katex/dist/fonts/KaTeX_Math-Italic.ttf', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/fonts/KaTeX_Math-Italic.woff', (req, res) => { res.sendFile('node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/fonts/KaTeX_Math-Italic.woff2', (req, res) => { res.sendFile('node_modules/katex/dist/fonts/KaTeX_Math-Italic.woff2', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/fonts/KaTeX_Main-Regular.ttf', (req, res) => { res.sendFile('node_modules/katex/dist/fonts/KaTeX_Main-Regular.ttf', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/fonts/KaTeX_Main-Regular.woff', (req, res) => { res.sendFile('node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff', { root: path.join(__dirname) }, err => { console.log(err) }); });
app.get('/fonts/KaTeX_Main-Regular.woff2', (req, res) => { res.sendFile('node_modules/katex/dist/fonts/KaTeX_Main-Regular.woff2', { root: path.join(__dirname) }, err => { console.log(err) }); });

var server = app.listen(3000, () => { console.log(`Port ${server.address().port} is opened`); });