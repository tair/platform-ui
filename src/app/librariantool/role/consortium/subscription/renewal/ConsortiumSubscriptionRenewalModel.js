/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.subscription.renewal').factory(
	/* Name */
	'ConsortiumSubscriptionRenewalModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'SUBSCRIPTION',
			uiparams: {
				"colwidth": 'col-xs-11',
			}
		};
	}
]);
