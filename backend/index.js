const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//Inventario desde archivo JSON
const inventory = require('./inventory.json');

app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    if (userMessage.includes('how many') && userMessage.includes('computer')) {
        const total = inventory.computers.reduce((sum, item) => sum + item.stock, 0);
        const detail = inventory.computers.map(item => `${item.stock} ${item.brand}`).join(', ');
        return res.json({ response: `We currently have ${total} computers: ${detail}.` });
    }

    for (const item of inventory.computers) {
        if (userMessage.includes(item.brand.toLowerCase())) {
            return res.json({
                response: `The ${item.model} has ${item.features} and costs $${item.price}. Do you want to buy it?`
            });
        }
    }

    return res.json({ response: "Sorry, I didn’t understand your question." });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
