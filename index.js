require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const loadUser = require('./middleware/loadUser');
const databaseConfig = require("./config/database");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration - MUST be before other middleware that uses session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secure-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Flash messages - after session
app.use(flash());

// Load user middleware - after session
app.use(loadUser);

// View engine setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout", "./layouts/main");

// Routes
app.use("/", require("./routes/default"));
app.use("/auth", require("./routes/userAuth"));
app.use("/organization", require("./routes/organizationAuth"));
app.use("/search", require("./routes/search"));
app.use("/profile", require("./routes/profile"));
app.use("/organizations", require("./routes/organizationSearch")); 


const Connect = async () => {
    try {
        await databaseConfig();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

Connect();