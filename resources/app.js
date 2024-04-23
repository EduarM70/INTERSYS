const express = require('express');
const { path } = require('express/lib/application');
const { join } = require('lodash');


const app = express();

const port = 8000;

// const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(join(__dirname, 'resourses/views'));
app.set('views', __dirname + "\\views");
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tables', (req, res) => {
    res.render('tables');
});

app.get('/botones', (req, res) => {
    res.render('botones');
});

app.get('/contenedores', (req, res) => {
    res.render('contenedores');
});

app.get('/formularios', (req, res) => {
    res.render('forms');
});



app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})