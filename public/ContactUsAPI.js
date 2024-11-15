const express = require('express');
const router = express.Router();

router.get('/api/contactus', (req, res) => {
    res.json({ message: 'Contact Us API' });
});

module.exports = router;
