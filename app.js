const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const moongose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();


//Connect to DB 
const db = require('./config/keys').MongoUri;

//Connect to Mongo
moongose.connect(db, { useNewUrlParser: true })
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

//expressLayouts
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({
    extended: false
}));

// Express Session
app.use(session({
    secret: 'passwd',
    resave: false,
    saveUninitialized: true
  }));

// Connect to flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(`Server start ${PORT}`)); 