const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work, ', error);
    return;
  }
  console.log('It worked! Here is my IP: ', ip);
});

