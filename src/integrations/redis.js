require('dotenv').config()
const chalk = require('chalk');


exports.redisConnection;

exports.connectToDatabase = () => {

    // connec to redis for caching
    var redis = require('redis');
    var client = redis.createClient(process.env.REDISCLOUD_URL, { no_ready_check: true });

    // error check
    if (client !== null) {

        this.redisConnection = client;
        console.log( chalk.bgBlue("Redis"), "Redis Database is connected successfully: " );
        return;
    }

    console.error("Error connecting to redis: ", client);

}