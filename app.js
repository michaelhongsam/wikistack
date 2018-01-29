// const morgan = require('morgan');
const express = require ('express');
const nunjucks = require ('nunjucks');
const bodyParser = require ('body-parser');
const router = require('./routes');
const path = require('path');
const models = require('./models');

const app = express();

app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// app.use(morgan('dev'));

app.use(function(req, res, next){
    console.log('incoming request: ' + req.method, req.path, res.statusCode);
    next();
})

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', router);

// ... other stuff

// models.User.sync({})
// .then(function () {
//     return models.Page.sync({})
// })
models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error.bind(console));

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "internal server error");
});