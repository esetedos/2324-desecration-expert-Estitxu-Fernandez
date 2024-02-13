

function throwDice(num, times){
    let result = 0;
    for(let i = 0; i < times; i++){
        result += Math.round(Math.random() * ((num+1) - 1) + 1);
    }
    return result;
}

module.exports = throwDice;