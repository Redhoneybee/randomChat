const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();


const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIESECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIESECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(app.get('port'), () => {
    console.log('listen...');
});