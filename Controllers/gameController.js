const throwDice =require('../Helpers/Dices')


async function game(data){

    //contrincantes
    const villainZarate = await getVillain(data);

    const superHero = getHero(data);

    const erudito = generateErudito();

    const order = decideOrder(villainZarate, superHero);
// console.log(order)
    console.log("------------------------------")
    console.log("------------------------------")

    console.log("El primer asalto es para " + order[0].name)

    let asalto = 0;

    let eruditoTime = Math.round(Math.random() * (6 - 3) + 3-1);
    console.log(eruditoTime)


    //turnos *******************************************
    while(order[0].hp > 0 && order[1].hp > 0){
        console.log("------------------------------");
        console.log("Comienza el asalto " + asalto);
        console.log("------------------------------");

        let oponent = 0;
        if(asalto % 2 === 0){
            oponent = 1;
        }

        console.log("El asalto es para " + order[asalto % 2].name)
        
        if(asalto === eruditoTime && erudito.hpw > 0){
            //el turno ha sido robado por el erudito
            console.log("El Erudito ha aparecido. El turno es suspendido. " + order[asalto % 2].name + " ha tomado las gafas y se las ha puesto.")

            order[asalto % 2].glasses = true;
            order[oponent].glasses = false;
            erudito.glasses = false;

            order[asalto % 2].leftArm = false;
            order[asalto % 2].rightArm = false;

            order[oponent].leftArm = false;
            order[oponent].rightArm = false;

            erudito.ang = throwDice(20, 1);
            erudito.hpw = 1 + erudito.ang;


            while((!erudito.glasses) && erudito.hpw > 0){
                if(asalto % 2 === 0){
                    oponent = 1;
                }

                switch(erudito.ang){
                    case 1:
                    case 2:
                    case 3:
                        if(order[asalto % 2].leftArm === false){
                            console.log("Pifia. " + order[asalto % 2].name + " se lesiona el brazo izquierdo, quedando su atributo dañado")
                            order[asalto % 2].leftArm=true;
                            order[asalto % 2].powerstats.strength=order[asalto % 2].powerstats.strength/2;
                            const damage = throwDice(20, 1);
                            console.log("Recibe un daño de " + damage + " puntos")
                            order[asalto % 2].hp -= damage;
                        }
                        else{
                            console.log("Pifia. " + order[asalto % 2].name + " se lesiona el brazo izquierdo, pero como ya lo tenía lesionado, no empeora.")
                        }
                        break;

                    case 4:
                    case 5:
                    case 6:
                        if(!order[asalto % 2].rightArm){
                            console.log("Pifia. " + order[asalto % 2].name + " se lesiona el brazo derecho, quedando su atributo dañado")
                            order[asalto % 2].rightArm=true;
                            order[asalto % 2].powerstats.strength=order[asalto % 2].powerstats.strength/2;
                            const damage = throwDice(20, 1);
                            console.log("Recibe un daño de " + damage + " puntos")
                            order[asalto % 2].hp -= damage;
                        }
                        else{
                            console.log("Pifia. " + order[asalto % 2].name + " se lesiona el brazo derecho, pero como ya lo tenía lesionado, no empeora.")
                        }
                        break;

                    case 7:
                    case 8:
                    case 9:
                        console.log("Caos. " + order[asalto % 2].name + " pierde la memoria y no ataca")
                        break;

                    case 10:
                    case 11:
                    case 12:
                    case 13:
                        console.log('Aullido. El Erudito grita "tú eres tonto" y ' + order[asalto % 2].name + " descubre dónde se encuentra, momento en el que aprovecha patra atacarle")
                        const damage10 = throwDice(10, 1);
                        erudito.hpw -= damage10;
                        console.log(order[asalto % 2].name + " le causa " + damage10 + " de daño al erudito")
                        break;

                    case 14:
                    case 15:
                    case 16:
                        console.log("Granuja. " + order[asalto % 2].name + " aprovecha un despiste del enemigo para colocarle las gafas")
                        order[asalto % 2].glasses = false;
                        order[oponent].glasses = true;
                        break;

                    case 17:
                    case 18:
                        console.log('Perspicaz. El erudito detecta al atacante y lo atrae con su famoso grito "tú eres tonto" momento que aprovecha para recuperar sus gafas. Sin embargo, la furia caótica del atacante se desata y El Erudito resulta herido.')
                        order[asalto % 2].glasses = false;
                        order[oponent].glasses = false;
                        erudito.glasses = true;
                        break;

                    case 19:
                    case 20:
                        console.log("Endemoniado. El atacatnte desata todo el caos de El Erudito, persiguiéndole y cortándole la cabeza.")
                        erudito.hpw = 0;
                        break;

                    default:
                        // console.log(erudito.ang)
                }
                if(order[asalto % 2].glasses){
                    console.log("---")
                    console.log("El atacante ha sufrido un mareo por lo que se quita las gafas. Momento que El Erudito aprovecha para recuperarlas.")
                    order[asalto % 2].glasses = false;
                    order[oponent].glasses = false;
                    erudito.glasses = true;
                }
                erudito.ang = throwDice(20, 1);

                asalto++;

    
            }
            if(erudito.glasses){
                console.log("------------------------------")            
                console.log("El erudito ha recuperado sus gafas, por lo que desaparece hasta nuevo aviso.")
                console.log("------------------------------")            

            }
            else if(erudito.hpw <= 0){
                console.log("------------------------------")            
                console.log("El erudito ha fallecido y es desterrado a los infiernos del caos para siempre")
                console.log("------------------------------")            

            }

            eruditoTime = asalto + Math.round(Math.random() * (6 - 3) + 3); //para el proximo turno del erudito

            for(let i = 0; i < 2; i++){
                const character = {
                    "name": order[i].name,
                    "intelligence": order[i].powerstats.intelligence,
                    "strength": order[i].powerstats.strength,
                    "speed": order[i].powerstats.speed,
                    "durability": order[i].powerstats.durability,
                    "power": order[i].powerstats.power,
                    "combat": order[i].powerstats.combat,
                    "hp": order[i].hp,
                    "damageOnLeftArm": order[i].leftArm,
                    "damageOnRightArm": order[i].rightArm,
                    "glasses": order[i].glasses

                }
                console.log(character)
    
            }
            console.log(erudito)

        }
        else{
            //Tiradas ----------
            const tirada = throwDice(100, 1);
    
            if(tirada <= order[asalto % 2].powerstats.combat){
                //Éxito-------------
                const segundaTirada = throwDice(20, 1);
                console.log(order[asalto % 2].name + " obtiene un " + tirada + " y ataca con éxito");
    
                if(segundaTirada > 2){
                    //Éxito certero
    
                    const normalDamage = Math.ceil((order[asalto % 2].powerstats.power + order[asalto % 2].powerstats.strength)*segundaTirada/100);

                    if(segundaTirada >= 18){
                        //DAÑO CRITICO
                        
                        let damage = 0;
                        let diceResult = -1;
                        switch(segundaTirada){
                            case 18:
                            case 19:
                                diceResult = throwDice(3, (segundaTirada-17))
                                damage = Math.ceil((order[asalto % 2].powerstats.intelligence*order[asalto % 2].powerstats.durability/100)*diceResult);
                                break;
                            case 20:
                                diceResult = throwDice(3, 5)
                                damage = Math.ceil((order[asalto % 2].powerstats.intelligence*order[asalto % 2].powerstats.durability/100)*diceResult);
                                break;
                        }
    
                        order[oponent].hp -= (damage+normalDamage);
                        
                        console.log("CRITICAL HIT !!! " + order[asalto % 2].name + " obtiene un " + segundaTirada + ", ejerce un daño de " + (damage+normalDamage) + " puntos")
                    }
                    else{
                        //DAÑO NORMAL
                        order[oponent].hp -= (normalDamage);
    
                        console.log(order[asalto % 2].name + " obtiene un " + segundaTirada + ", empuña su arma y ejerce un daño de " + (normalDamage) + " puntos")
    
    
                    }
    
    
                }
                else{
                    //Éxito pero mala puntería
                    let failDamage = 0;
                    let diceValue = 0;
    
                    switch(segundaTirada){
                        case 1:
                            diceValue = throwDice(3, 1);
                            break;
    
                        case 2:
                            diceValue = throwDice(3, 4);
                            break;
    
                    }
                    failDamage = Math.ceil(order[asalto % 2].powerstats.speed/diceValue);
                    order[asalto % 2].hp -= failDamage;
    
                    console.log("FAIL !! " + order[asalto % 2].name + " obtiene un " + segundaTirada + " y se clava el arma en su pierna izq. Recibe un daño de " + failDamage);
    
                }
    
    
            }
            else{
                //FRACASO
                console.log(order[asalto % 2].name + " obtiene un " + tirada + " y ha fallado")
            }
    
            for(let i = 0; i < 2; i++){
                const character = {
                    "name": order[i].name,
                    "intelligence": order[i].powerstats.intelligence,
                    "strength": order[i].powerstats.strength,
                    "speed": order[i].powerstats.speed,
                    "durability": order[i].powerstats.durability,
                    "power": order[i].powerstats.power,
                    "combat": order[i].powerstats.combat,
                    "hp": order[i].hp
                }
                console.log(character)
    
            }
            asalto++;

        }
        
        






    
    }

    console.log("------------------------------")
    console.log("------------------------------")

    if(order[0].hp <= 0){
        console.log(order[0].name + " ha sido derrotado.")
    }
    else{
        console.log(order[1].name + " ha sido derrotado.")

    }


}

function generateErudito(){
    const data = {
        "name": "El Erudito XG.",
        "ang": 0,
        "hpw": 1,
        "hpg": -1,
        "glasses": false
    }
    return data;
}



function decideOrder(villain, hero){
    const order = [];
    const villanValue = villain.powerstats.intelligence + villain.powerstats.combat;
    const heroValue = hero.powerstats.intelligence + hero.powerstats.combat;
    if(villanValue > heroValue){
        order.push(villain);
        order.push(hero);
    }
    else{
        order.push(hero);
        order.push(villain);
    }
    return order;
}


function getVillain(data){
    const character = data.find(character => character.name === "Junkpile");
    character.hp = character["powerstats"].strength*10;
    if(character.hp > 666){
        character.hp = 666;
    }
    return character;
}

function getHero(data){
    let randomNum = Math.round(Math.random() * ((data.length) - 0) + 0);
    while(data[randomNum].name === "Junkpile"){
        randomNum = Math.round(Math.random() * ((data.length) - 0) + 0);
    }
    data[randomNum].hp = data[randomNum]["powerstats"].strength*10;
    if(data[randomNum].hp > 666){
        data[randomNum].hp = 666;
    }

    return data[randomNum];
}


module.exports = game;