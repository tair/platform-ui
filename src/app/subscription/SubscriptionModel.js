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
			currentTab: 'chooseTab',

			licenses: {
				individual: {
					id: 'individual',
					heading: 'Individual benefits',
					benefits: [
					    'Who should choose this', 
					    'What they get'
					],
				},
				institution: {
					id: 'institution',
					heading: 'Institutional Benefits',
					benefits: [
					    'Who should choose this', 
					    'What they get'
					],
				},
				commercial: {
					id: 'commercial',
					heading: 'Commercial Benefits',
					benefits: [
					    'Who should choose this', 
					    'What they get'
					],
				},
				def: {
				    id: 'default',
				    heading: 'Subscription Benefits',
				    benefits: [
					'Unlimited Access to the TAIR pages',
					'More wonderful benefits and features',
					'Some other option'
				    ],
				},
			},

			tabs: {
				tab1: {
					id: 'chooseTab',
					text: 'Choose License',
				},
				tab2: {
					id: 'infoTab',
					text: 'Your Info',
				},
				tab3: {
					id: 'paymentConfirmationTab',
					text: 'Payment/Confirmation',
				}
			},

			templates : {
				chooseTab: 'subscription/choose/choose.html',
				infoTab: {
					individual: 'subscription/info/individual/individualInfo.html',
					institution: 'subscription/info/institution/institutionInfo.html',
					commercial: 'subscription/info/commercial/commercialInfo.html',
				},
				paymentConfirmationTab: {
					individual: 'subscription/paymentConfirmation/individual/individualPay.html',
					institution: 'subscription/paymentConfirmation/institution/institutionPay.html',
					commercial: 'subscription/paymentConfirmation/commercial/commercialPay.html',
				},
			},

		}
	}
]);
