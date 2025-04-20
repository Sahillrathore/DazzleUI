const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
// const session = require("cookie-session");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/users");
require("dotenv").config();
const cors = require("cors");
const createToken = require("./utils/createToken");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("✅ Connected to MongoDB");
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true, // ✅ allow sending cookies from frontend
}));


app.use(cookieParser());

// Passport
app.use(passport.initialize());

// Passport Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) return done(null, existingUser);

            const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails?.[0]?.value,
                avatar: profile.photos?.[0]?.value
            });
            return done(null, newUser);
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Auth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        const token = createToken(req.user);

        console.log(token);
        

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set true in production
            sameSite: "Lax",
        });

        res.redirect("http://localhost:5173/create"); // or your dashboard route
    }
);


app.get("/auth/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

// JWT-protected route
app.get("/auth/user", verifyToken, (req, res) => {
    console.log("Decoded user:", req.user); // check what's inside
    res.json({ user: req.user });
});


app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
