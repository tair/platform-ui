/**
 * API Doc Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.apidoc').factory(
	/* Name */
	'ApiDocModel',

	/* Dependencies */
	[

	function () {
	    return {
		title: 'Subscription Management REST API Documentation',
		doc: 'def',
		currentTab: 'landing',
		
		templates : {
		    landing: 'contentaccess/apidoc/landing/landing.html',
		    partners: 'contentaccess/apidoc/partners/partners.html',
		    parties: 'contentaccess/apidoc/parties/parties.html',
		    ipranges: 'contentaccess/apidoc/ipranges/ipranges.html',
		    subscriptions: 'contentaccess/apidoc/subscriptions/subscriptions.html',
		    meters: 'contentaccess/apidoc/meters/meters.html',
		    credentials: 'contentaccess/apidoc/credentials/credentials.html',
		    authorizations: 'contentaccess/apidoc/authorizations/authorizations.html',
		    sessionlogs: 'contentaccess/apidoc/sessionlogs/sessionlogs.html',
		},
	    }
	}
]);
