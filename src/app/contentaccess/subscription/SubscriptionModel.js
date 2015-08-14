/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.subscription').factory(
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
		    individual: 'contentaccess/subscription/individual/individual.html',
		    landing: 'contentaccess/subscription/landing/landing.html',
		    institution: 'contentaccess/subscription/institution/institution.html',
		    commercial: 'contentaccess/subscription/commercial/commercial.html',
		},
	    }
	}
]);
