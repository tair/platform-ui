/**
 * Subscription Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.subscription.info.individual').factory(
	/* Name */
	'IndividualInfoModel',

	/* Dependencies */
	[

	function () {
		return {
			
			subscriptions: {
				sub1: {
					id: '1',
					period: '1 month',
					price: 19.99,
				},
				sub2: {
					id: '2',
					period: '1 year',
					price: 99.99,
				},
				sub3: {
					id: '3',
					period: '2 years',
					price: 199.99,
				},
			},

			formdata: {
				numOfSubscribers: 0,
				userbool: false,
				termsbool: false,
			},

			groupDiscount: {
				available: true,
				percentage: 10,
				group: 2,
			},

		}
	}
]);
