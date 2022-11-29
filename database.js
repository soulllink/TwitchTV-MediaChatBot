require('dotenv').config();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json')
const db = low(adapter)

// set defaults for DB
db.defaults({ users: [] })
  .write()


//functions
//check and update
const alert_cost = parseInt(process.env.ALERT_COST);
const post_value = parseInt(process.env.POST_VALUE);

function getCoins (twitch_name){
    const coins_data = db.get('users')
        .find({ username: twitch_name})
        .value();
    return coins_data.coins;
}
const coinsOperator = function(twitch_name) {
    if(getCoins(twitch_name) < alert_cost) {
        return false;
    } else {
        const take_cost = db.get('users')
        .find({ username: twitch_name })
        .update('coins', n => n - alert_cost)
        .write()
        take_cost;
        return true;
    }
}
const addCoins = function(twitch_name) {
    const addCoinsq = db.get('users')
    .find({ username: twitch_name})
    .update('coins', n => n + post_value)
    .write()
    addCoinsq;
}
const userOperator = function(twitch_name) {
    const finduser = db.get('users')
    .find({ username: twitch_name})
    .value()
    console.log(finduser);
    
    if(finduser === undefined) {
        db.get('users')
        .push({username: twitch_name, coins: 10})
        .write()
        //console.log('user created: ' + twitch_name);
    } else {
        addCoins(twitch_name);
        //console.log('coins added');
    }

}

module.exports.getCoins = getCoins;
module.exports.coinsOperator = coinsOperator;
module.exports.userOperator = userOperator;

