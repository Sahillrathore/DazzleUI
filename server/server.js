// server.js
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/users");
const createToken = require("./utils/createToken");
const verifyToken = require("./middlewares/verifyToken"); // make sure this path is correct
const elementsRouter = require("./routes/elements");
const favoriteRouter = require("./routes/addfavorite");

const app = express();

/* ---------- Core server + security ---------- */
// If you're on Render/any proxy, this ensures req.protocol honors X-Forwarded-Proto (https)
app.set("trust proxy", 1);

// CORS – allow your deployed frontend + localhost (during dev)
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5175",
      "http://localhost:5173", // add/remove local ports you use
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI, { bufferCommands: false })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ---------- Passport: Google OAuth ---------- */
app.use(passport.initialize());

// IMPORTANT: use an absolute HTTPS callback URL via env
// and set proxy: true so Passport respects X-Forwarded-Proto
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // e.g. https://dazzleui.onrender.com/auth/google/callback
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            provider: "google",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// (You aren't using sessions, so serialize/deserialize aren't needed, but harmless)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

/* ---------- Auth Routes ---------- */

// Quick debug to confirm protocol/host Google will see
app.get(
  "/auth/google",
  (req, _res, next) => {
    console.log("🔎 /auth/google hit | host:", req.get("host"), "| proto:", req.protocol);
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`, // absolute URL to your frontend's login page
  }),
  (req, res) => {
    const token = createToken(req.user);

    // For top-level redirects (your case), SameSite=Lax is okay.
    // If you need cross-site iframe/post flows, use SameSite=None + secure: true.
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      // domain: ".your-domain.com" // only if you serve API and web on different subdomains of same apex
    });

    // After setting the cookie, send user to your app
    res.redirect(process.env.CLIENT_URL);
  }
);

/* ---------- Logout ---------- */
app.get("/auth/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

/* ---------- API Routes ---------- */
app.use("/api/elements", elementsRouter);
app.use("/api/users", favoriteRouter);

/* ---------- JWT-protected example ---------- */
app.get("/auth/user", verifyToken, (req, res) => {
  res.json({ ...req.user });
});

/* ---------- Health ---------- */
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

/* ---------- Start ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("↪️ GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);
});
