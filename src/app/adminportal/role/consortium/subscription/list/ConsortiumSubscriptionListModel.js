/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.consortium.subscription.list').factory(
	/* Name */
	'ConsortiumSubscriptionListModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'SUBSCRIPTION',
			uiparams: {
				"partnercolwidth": 'col-xs-4',
				"expcolwidth": 'col-xs-3',
				"actionscolwidth": 'col-xs-2',
				"statescolwidth": 'col-xs-3'
			}
		};
	}
]);
