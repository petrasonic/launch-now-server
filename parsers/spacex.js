const request = require('request');
const cheerio = require('cheerio');

const spacex = {
  getPastLaunches: () => {
    return [];
  },
  getFutureLaunches: () => {
    return new Promise((resolve, reject) => {
      request('https://www.spacex.com/missions', (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html, {
            xml: {
              normalizeWhitespace: true,
            }
          });
          const rows = [];
          $('#future-missions-header ~ .views-table tr').each((i, element) => {
            const customer = $(element).children('.customer').children().text();
            const launchSite = $(element).children('.launch-site').children().text();
            const vehicle = $(element).children('.vehicle').children().text();

            if(!customer || !launchSite || !vehicle){
              reject('could not get all data from the site');
            }

            rows.push({
              customer,
              launchSite,
              vehicle
            });
          });
          resolve(rows);
          return;
        }
        reject(error);
      });
    });
  },
};

module.exports = spacex;