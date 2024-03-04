const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory user database
let users = [];

// Registration endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    // Check if the username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).send("Username already exists");
    }

    // Create a new user
    const newUser = { username, password };
    users.push(newUser);
    res.status(201).send("User registered successfully");
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send("Invalid username or password");
    }
    res.send("Login successful");
});

// Logout endpoint
app.post('/logout', (req, res) => {
    // You can add logout logic here if needed
    res.send("Logout successful");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
