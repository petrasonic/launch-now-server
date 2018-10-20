const config = require('./config');
const express = require('express');
const app = express();
const router = express.Router();

const spacex = require('./parsers/spacex');

app.listen(config.HOST_PORT);

let launchData = [];
// Get all launch data on launch and cache it
spacex.getFutureLaunches().then((data) => {
  launchData = launchData.concat(data);
});


/* END POINTS */

// Sample endpoint
router.get('/example', (req, res) => {
  res.json({ yo: 'lo' });
});

router.get('/launches', (req, res) => {
  let { agency } = req.query;
  let data = [];

  // filter agencies
  if(agency){
    agency = agency.split(',');
    agency = config.SUPPORTED_AGENCIES.filter(value => agency.indexOf(value) !== -1);
  } else {
    agency = config.SUPPORTED_AGENCIES;
  }

  // get data for all agencies
  // for(let i in agency){
  //   switch (agency[i]){
  //     case 'spacex':
  //       data = launchData;
  //   }
  // }

  res.json(launchData);
});

// Namespace the API
app.use('/api', router);

// Default/ 404
app.route('/*').get(((req, res) => { res.sendStatus(404); }));
