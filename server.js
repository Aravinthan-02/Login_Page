const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 2025;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing JSON body

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/user-login', (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Missing email or password');
    }
    const now = new Date();
    const timestamp = now.toLocaleString();
    const logEntry = `${timestamp} - ${name} - ${email} logged in\n`;


   
    

    fs.appendFile(path.join(__dirname,'logs','login.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Server error');
        }
        res.send('Login successful!');
    });
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));