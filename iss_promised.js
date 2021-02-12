const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = () => {
     return (request('https://api.ipify.org/?format=json'));
};

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);
  const ip = data.ip;
  return (request(`https://freegeoip.app/json/${ip}`));
};


/* 
 * Makes a request to api.open-notify.org using the provided coordinates, to get fly over times
 * Input: JSON string containing various key/values
 * Returns: Promise of request for fly over
 */
const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const LON = Math.round(data.longitude);
  const LAT = Math.round(data.latitude);
  return (request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`));
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };