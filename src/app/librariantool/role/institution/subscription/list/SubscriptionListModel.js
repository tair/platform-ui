/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.institution.subscription.list').factory(
	/* Name */
	'SubscriptionListModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'SUBSCRIPTION',
			uiparams: {
				"partnercolwidth": 'col-xs-5',
				"expcolwidth": 'col-xs-3',
				"actionscolwidth": 'col-xs-4'
			}
		};
	}
]);
