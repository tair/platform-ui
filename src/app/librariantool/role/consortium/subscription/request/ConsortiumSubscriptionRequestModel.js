/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.subscription.request').factory(
	/* Name */
	'ConsortiumSubscriptionRequestModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'SUBSCRIPTION',
			uiparams: {
				"colwidth": 'col-xs-9',
			}
		};
	}
]);
