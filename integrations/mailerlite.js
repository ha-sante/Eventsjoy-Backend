require('dotenv').config()

const MailerLite = require('mailerlite-api-v2-node').default;
const chalk = require('chalk');


exports.MailerLiteClientConnection;


exports.connectToMailerLiteClient = () => {

    this.MailerLiteClientConnection = MailerLite(process.env.MAILERLITE_API_KEY)
    

	// error check
    if ( this.MailerLiteClientConnection !== null) {
        console.log( chalk.bgBlue("MailerLite"), "MailerLite service is connected successfully" );
        
    }


	return;
}
