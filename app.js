const path = require("node:path");
const express = require('express');
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
    { id: 0, text: "Hi there!", user: "Amanda", added: new Date() },
    { id: 1, text: "Hello World!", user: "Charles", added: new Date() }
];

// Helper function to find a message by ID
const findMessageById = (id) => messages.find(message => message.id === id);

// GET: Home page displaying all messages
app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages });
});

// GET: Form to add a new message
app.get("/new", (req, res) => {
    res.render("form");
});

// POST: Add a new message and redirect to the home page
app.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body;

    if (!messageText || !messageUser) {
        const error = new Error("Both message text and user are required!");
        error.status = 400;
        // return to prevent execution of rest of code
        return next(error);
    }

    messages.push({
        id: messages.length,
        text: messageText,
        user: messageUser,
        added: new Date(),
    });
    res.redirect("/");
});

// GET: Display a specific message by ID
app.get("/message/:id", (req, res, next) => {
    const messageId = parseInt(req.params.id);
    const message = findMessageById(messageId);

    if (!message) {
        const error = new Error("Message not found");
        error.status = 404;
        return next(error);
    }

    res.render("messagePage", { message });
});

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
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
