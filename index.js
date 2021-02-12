const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work, ', error);
    return;
  }
  console.log('It worked! Here is my IP: ', ip);
});

fetchCoordsByIP('70.81.220.168', (error, data) => {
  if (error) {
    console.log('It didn\'t work, ', error);
    return;
  }
  console.log('It worked! Here are my coordinates: ', data);
});

//fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
fetchISSFlyOverTimes({ latitude: '49', longitude: '-123.13000' }, (error, data) => {
  if (error) {
    console.log('It didn\'t work, ', error);
    return;
  }
  console.log('It worked! Here are the fly over times: ', data);
});

