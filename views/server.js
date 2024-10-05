const express = require("express");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache");

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
const PORT = 5000;

app.use(session({
    secret: 'admin@123',   
    resave: false,        
    saveUninitialized: false,
}));

app.use(nocache());

const username = "admin";
const password = "admin@123";



app.get('/', (req, res) => {
    if (!req.session.user) {
        res.render('login',{ message: "Please login : username:admin & password:admin@123" });
    } else {
        res.render('home');
    }
});

app.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body.username === username && req.body.password === password) {
        req.session.user = req.body.username;
        res.redirect('/home');
    } else {
        res.render('login', { message: "Invalid Username or Password" });
    }
});

app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.render('login', { message: "Please login : username:admin & password:admin@123" });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server rendering at ${PORT}`);
});
