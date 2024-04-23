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

const routes = ['tables', 'botones', 'contenedores', 'forms'];

routes.forEach(route => {
    app.get(`/${route}`, (req, res) => {
        res.render(route);
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})