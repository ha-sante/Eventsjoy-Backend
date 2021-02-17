require('dotenv').config()

const chalk = require('chalk');
const faunadb = require('faunadb'), q = faunadb.query;

exports.databaseConnection;


function instanceAlreadyExists(err) {
    let collectionExistsMessage = "instance already exists";

    if (err.message !== collectionExistsMessage) {
        console.log(err.message)
    }
}


export const CollectionLabels = {
    eventsData: "eventsData"
}

export const CollectionSearchIndexes = {
    find_event_by_id: "find_event_by_id",
    events_by_owner_id: "events_by_owner_id",
}


export function connectToDatabase(){

    // connect the database
    var client = new faunadb.Client({ secret: process.env.FAUNADB_KEY })

    // error check
    if (client !== null) {

        console.log(chalk.bgBlue("FaunaDB"), 'Database is connected successfully')

        // Create our apps data collections
        client.query(
            q.CreateCollection({ name: this.CollectionLabels.events_data })
        ).catch(err => instanceAlreadyExists(err))


        // Create the search index for the collections
        // client.query(
        //     q.CreateIndex({
        //         name: 'find_verified_user_by_email',
        //         source: q.Collection(this.CollectionLabels.userAccounts),
        //         terms: [{ field: ['data', 'email'] }],
        //     })
        // ).then((ret) => console.log(ret)).catch(err => console.log(err.message))


        // Set this database connection to the client
        this.databaseConnection = client;

        return client;
    } else {
        console.error("Error connecting to database: ", client);
    }

}
