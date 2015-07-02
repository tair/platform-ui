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
			
			formdata: {
				numOfSubscribers: 1,
				userbool: false,
				termsbool: false,
			},

			subscriptions: [
				{
					subscriptionTermId:1, 
					partnerId:'cdiff', 
					period:180, 
					price:99.99, 
					groupDiscountPercentage:10,
				    description: '3 Months'
				},
				{
					subscriptionTermId:8, 
					partnerId:'cdiff', 
					period:270, 
					price:149.99, 
					groupDiscountPercentage:20,
				    description: '9 months'
				},
				{
					subscriptionTermId:5,
					partnerId:'cdiff',
					period:360,
					price:199.99,
					groupDiscountPercentage:0,
				    description: '1 year'
				}
			],

			selectedSubscription: {
				subscriptionTermId: null,
				partnerId: null,
				period: null,
				price: null,
				groupDiscountPercentage: null
			},

			subtotal: null,

		}
	}
]);
