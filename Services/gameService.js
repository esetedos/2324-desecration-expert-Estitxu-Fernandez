const axios = require('axios');
const game = require('../Controllers/gameController')

const getData = async () => {
    // const data = await getData2();
    await axios
      .get(
        "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
      )
      .then(function (response) {
        const data = response.data;
        // console.log(data);
        game(data);
        return response;
      })
      .catch(function (error) {
        console.log("ERROR: " + error);
        return false;
      });
  };


  module.exports = getData;