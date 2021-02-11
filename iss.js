const request = require('request');
/* Makes a single API request to retrieve the user's IP address.
* Input:
*   - A callback (to pass back an error or the IP string)
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The IP address as a string (null if error). Example: "162.245.144.188"
*/
const fetchMyIP = (callback) => {
  request.get('https://api.ipify.org/poil', (error, response, body) => {
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


module.exports = { fetchMyIP };