// Packages
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

// Configure the methods and their routes
const {getHomePage} = require('./routes/index');
const {clientInformationPage} = require('./routes/clientInfo');
const {addClientPage, addClient, deleteClient, editClient, editClientPage} = require('./routes/clients');
const {getQuotesPage} = require('./routes/quoteInfo');
const {requestQuotePage, deleteQuote, requestQuote} = require('./routes/quotes');
const port = 5000;

// Database configuration
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CS3320'
});

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// Configure middleware

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// Configure url handling:

// Homepage url
app.get('/', getHomePage);
// Client Information url handling
app.get('/clients', clientInformationPage);
app.get('/add', addClientPage);
app.get('/edit/:id', editClientPage);
app.get('/delete/:id', deleteClient);
app.post('/add', addClient);
app.post('/edit/:id', editClient);
// Quote handling
app.get('/quotes', getQuotesPage);
app.get('/request_quote', requestQuotePage);
app.get('/deleteQuote/:id', deleteQuote);
app.post('/request_quote',requestQuote);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
