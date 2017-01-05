/**
 * Landing Model
 */

angular.module('platform-ui.contentaccess.subscription.landing').factory(
/* Name */
'LandingModel',

/* Dependencies */
[ function() {
	return {
		title : 'Default',
		api : 'def',
		apis : {
			partners : {
				id : 'partners',
				heading : 'Partners',
			},
			parties : {
				id : 'parties',
				heading : 'Parties',
			},
			credentials : {
				id : 'credentials',
				heading : 'Credentials',
			},
			subscriptions : {
				id : 'subscriptions',
				heading : 'Subscriptions',
			},
			meters : {
				id : 'meters',
				heading : 'Meters',
			},
			authorizations : {
				id : 'authorizations',
				heading : 'Authorizations',
			},
			sessionlogs : {
				id : 'sessionlogs',
				heading : 'Session Logs',
			},
			def : {
				id : 'default',
				heading : 'Subscription Management REST API',
			},
		},
	}
} ])
