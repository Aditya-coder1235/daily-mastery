const express = require("express");
const app = express();
require("dotenv").config();
const port=process.env.PORT

const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
            callbackURL: "http://localhost:8080/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



app.get("/", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile");
    }
);

app.get("/profile", (req, res) => {
    if (!req.user) return res.redirect("/");
    res.send(`Welcome ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log("Server running on port 8080");
});
