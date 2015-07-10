/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription').factory(
	/* Name */
	'SubscriptionModel',

	/* Dependencies */
	[

	function () {
	    return {
		title: 'Subscription',
		license: 'def',
		currentTab: 'landing',
		
		partner: {
		    partnerId: 'tair',
		    name: 'TAIRI',
		    logoUri: 'https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png',
		    termOfServiceUri: 'http://thisisanotherbrokenuri.com',
		},
		
		institutions: [
		    "Azeem's lab",
		    "Steve's lab",
		],
		countries: [
		    "USA",
		    "Canada",
		],

		templates : {
		    individual: 'subscription/individual/individual.html',
		    landing: 'subscription/landing/landing.html',
		    institution: 'subscription/institution/institution.html',
		    commercial: 'subscription/commercial/commercial.html',
		},
	    }
	}
]);
