const request = require('request');
/* Makes a single API request to retrieve the user's IP address.
* Input:
*   - A callback (to pass back an error or the IP string)
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The IP address as a string (null if error). Example: "162.245.144.188"
*/

const fetchMyIP = (callback) => {
  request.get('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      // callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null); << from compass
      return callback(msg, null);
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request.get(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      // callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null); << from compass
      return callback(msg, null);
    }
    const data = JSON.parse(body);
    //console.log(data)
    const coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    return callback(null, coords);
  });
};

//http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON

const fetchISSFlyOverTimes = function(coords, callback) {
  const LON = Math.round(coords.longitude);
  const LAT = Math.round(coords.latitude);
  //console.log(LAT, LON)
  request.get(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`, (error, response, body) => {
    //http://api.open-notify.org/iss-pass.json?lat=49&lon=-123
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      // callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null); << from compass
      return callback(msg, null);
    }
    const data = JSON.parse(body);
    return callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log('It didn\'t work, ', error);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log('It didn\'t work, ', error);
        return;
      }
      fetchISSFlyOverTimes(data, (error, flyTimes) => {
        if (error) {
          console.log('It didn\'t work, ', error);
          return;
        }
        callback(null, flyTimes);
        //console.log(`Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!`);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
// module.exports = { fetchCoordsByIP };