const  { nextISSTimesForMyLocation } = require('./iss_promised');

/* fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body)); */

  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };

  nextISSTimesForMyLocation()
    .then((passtimes) => { 
      printPassTimes(passtimes);
    })
    // .catch((error) => {
    //   console.log("It didn't work: ", error.message);
    // });