const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle API requests
app.post('/api/save-wallet', (req, res) => {
    const { walletAddress } = req.body;
    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }
    // Save wallet logic...
    res.status(200).json({ message: 'Wallet address saved successfully' });
});

// Fallback route for 404 errors
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

