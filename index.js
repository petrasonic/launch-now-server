const config = require('./config');
const express = require('express');
const app = express();
const router = express.Router();

app.listen(config.HOST_PORT);

router.use((req, res, next) => {
  next();
});

// Sample endpoint
router.get('/example', (req, res) => {
  res.json({ yo: 'lo' });
});

// Namespace the API
app.use('/api', router);

// Default/ 404
app.route('/*').get(((req, res) => { res.sendStatus(404); }));
