/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.subscription').factory(
	/* Name */
	'ConsortiumSubscriptionModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Consortium Subscription',
			partners: [],
			activeSubscriptions: {},
		};
	}
]);
