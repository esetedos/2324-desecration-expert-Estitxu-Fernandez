const getData = require('./Services/gameService')

async function startGame(){
    await getData();
   
}


startGame();
