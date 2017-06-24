const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(' ERROR MESSAGE: ', err);
    });

});

app.use((req, res, next) => {
    res.render('mantainance.hbs', {
        message: 'be right back;;',
        page: 'mantainance'
    });
});


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})



app.get('/', (req, res) => {

    res.render('home.hbs', {
        page: 'home page',
        message: 'welcome to home page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        page: 'About page',
        message: ' message about page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/bad', (req, res) => {
    res.send({ errorMessage: 'this is a message' });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});



