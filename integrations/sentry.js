require('dotenv').config()
const chalk = require('chalk');


exports.SentryClient;

exports.ConnectToSentryClient = (app) => {


    // Setup Sentry for issues, performance and custom logging
	if (process.env.ENVIRONMENT === "PROD") {
	    // init sentry logging
	    const Sentry = require('@sentry/node');
	    const Tracing = require("@sentry/tracing");

	    Sentry.init({
	      dsn: process.env.SENTRY_KEY,
		  integrations: [
		    // enable HTTP calls tracing
		    new Sentry.Integrations.Http({ tracing: true }),
		    // enable Express.js middleware tracing
		    new Tracing.Integrations.Express({ app }),
		  ],

		  // We recommend adjusting this value in production, or using tracesSampler
		  // for finer control
		  tracesSampleRate: 1.0,
		});

	    // RequestHandler creates a separate execution context using domains, so that every
		// transaction/span/breadcrumb is attached to its own Hub instance
		app.use(Sentry.Handlers.requestHandler());
		// TracingHandler creates a trace for every incoming request
		app.use(Sentry.Handlers.tracingHandler());

		// the rest of your app
		app.use(Sentry.Handlers.errorHandler());



	    this.SentryClient = Sentry;
		console.log( chalk.bgBlue("Sentry"), "Sentry connected successfully" );
        return;


	}else{
		console.log( chalk.bgRed("Sentry"), "not connected, APP IS IN DEVELOPMENT STATE" );
	}

}

exports.CaptureException = (err) =>{

	if (process.env.ENVIRONMENT === "PROD") {
		  this.SentryClient.captureException(err);
	}

}