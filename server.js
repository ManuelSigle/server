console.log("Server startet!");

const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const https = require("https");
const fs = require("fs");
const web_config = require("./private/configs/web_config.json");


const sslServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, "private", "privat-key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "private", "zertifikat.pem")),
    },
    app
);
sslServer.listen(443);

const SESSION_TIME = 1000 * 60 * 60;
const {
    SESS_LIFETIME = SESSION_TIME
} = process.env

app.use(session({
    secret: web_config.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: SESS_LIFETIME
    }
}));

//! Alles genauer nochmal nachschauen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


app.get("/", (req, res) => {
    res.redirect("/home");
    res.end();
});

//ROUTES
//*WEBSITE

const home_module = require("./website/routes/home_module");
app.use("/home", home_module);

const logout_module = require("./website/routes/logout_module");
app.use("/logout", logout_module);

const login_module = require("./website/routes/login_module");
app.use("/login", login_module);

const register_module = require("./website/routes/register_module");
app.use("/register", register_module);

const bootstrap_module = require("./routes/bootstrap_module");
app.use("/bootstrap", bootstrap_module);

//*TWITTER-BOT