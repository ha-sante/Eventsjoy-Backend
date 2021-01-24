require('dotenv').config()
const chalk = require('chalk');


var faunadb = require('faunadb'), q = faunadb.query;

exports.databaseConnection;

function instanceAlreadyExists(err) {
    let collectionExistsMessage = "instance already exists";

    if (err.message !== collectionExistsMessage) {
        console.log(err.message)
    }
}


exports.CollectionLabels = {
    userAccounts: "UserAccounts",
    courses: "Courses",
    leads: "Leads",
    userPayoutRequests: "UserPayoutRequests",
    userAppSubscriptions: "UserAppSubscriptions",
    userCourseEarnings: "UserCourseEarnings",
    
    UserWebsitesData: "UserWebsitesData",
    UserAnalyticsData: "UserAnalyticsData",
}

exports.CollectionSearchIndexes = {
    find_verified_user_by_email: "find_verified_user_by_email",
    find_all_courses_by_ownerID: "find_all_courses_by_ownerID",
    find_all_payout_requests_by_ownerID: "find_all_payout_requests_by_ownerID",
    find_website_data_by_domain_name: "find_website_data_by_domain_name",
}


exports.UserAppAnalyticsDataType = {
    earnings: 0,
    courseCount: 0,
    studentsCount: 0,
}

function connectToDatabase(){

    // connect the database
    var client = new faunadb.Client({ secret: process.env.FAUNADB_KEY })

    // error check
    if (client !== null) {

        console.log(chalk.bgBlue("FaunaDB"), 'Database is connected successfully')

        // Create our apps data collections
       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.userAccounts })
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.courses })
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.leads })
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.userPayoutRequests })
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.userAppSubscriptions })
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.userCourseEarnings }),
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.userWebsitesData }),
       //  ).catch(err => instanceAlreadyExists(err))

       //  client.query(
       //      q.CreateCollection({ name: this.CollectionLabels.userAnalyticsData }),
       //  ).catch(err => instanceAlreadyExists(err))



       //  // Create the search index for the collections
       //  client.query(
       //      q.CreateIndex({
       //          name: 'find_verified_user_by_email',
       //          source: q.Collection(this.CollectionLabels.userAccounts),
       //          terms: [{ field: ['data', 'email'] }],
       //      })
       //  ).then((ret) => console.log(ret)).catch(err => console.log(err.message))

       //  client.query(
       //      q.CreateIndex({
       //          name: 'find_all_courses_by_ownerID',
       //          source: q.Collection(this.CollectionLabels.courses),
       //          terms: [{ field: ['data', 'ownerID'] }],
       //      })
       //  ).then((ret) => console.log(ret)).catch(err => console.log(err.message))

       //  client.query(
       //      q.CreateIndex({
       //          name: 'find_all_earnings_by_ownerID',
       //          source: q.Collection(this.CollectionLabels.userCourseEarnings),
       //          terms: [{ field: ['data', 'ownerID'] }],
       //      })
       //  ).then((ret) => console.log(ret)).catch(err => console.log(err.message))


       //  client.query(
       //      q.CreateIndex({
       //          name: 'find_all_payout_requests_by_ownerID',
       //          source: q.Collection(this.CollectionLabels.userPayoutRequests),
       //          terms: [{ field: ['data', 'ownerID'] }],
       //      })
       //  ).then((ret) => console.log(ret)).catch(err => console.log(err.message))


       // client.query(
       //      q.CreateIndex({
       //          name: this.CollectionSearchIndexes.find_website_data_by_domain_name,
       //          source: q.Collection(this.CollectionLabels.UserWebsitesData),
       //          terms: [{ field: ['data', 'domain_name'] }],
       //      })
       //  ).then((ret) => console.log(ret)).catch(err => console.log(err.message))



        // Print out the number of users we have 


            client.query(
                q.Map(
                   q.Paginate(q.Documents(q.Collection("UserAccounts"))),
                   q.Lambda(x => q.Get(x))
               )
            ).then(results => {
          

                client.query(
                    q.Map(
                       q.Paginate(q.Documents(q.Collection("Leads"))),
                       q.Lambda(x => q.Get(x))
                   )
                ).then(leadsCollectionData => {
                    
                         
                        client.query(
                            q.Map(
                               q.Paginate(q.Documents(q.Collection("Courses"))),
                               q.Lambda(x => q.Get(x))
                           )
                        ).then(coursesCollectionData => {
                            
                                 
                                const structDatas = {
                                    "Active App Users":  results.data.length - 3,
                                    "Unconfirmed App Users":  leadsCollectionData.data.length,
                                    "Courses Created":  coursesCollectionData.data.length - 4,
                                }
                                
                                console.table(structDatas);

                        });

                });



            });

        

        // Set this database connection to the client
        this.databaseConnection = client;


        return client;
    } else {
        console.error("Error connecting to database: ", client);
    }

}


connectToDatabase();
