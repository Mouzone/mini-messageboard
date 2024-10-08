const path = require("node:path");
const express = require('express');
const app = express();
const messageRouter = require("routes/messageRouter.js")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", messageRouter)

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error("Page Not Found");
    error.status = 404;
    next(error); // Pass to the error handler
});

// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
        errorMessage: err.message || "Internal Server Error",
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
