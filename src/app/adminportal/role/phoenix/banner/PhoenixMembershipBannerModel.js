/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.role.phoenix.banner').factory(
	/* Name */
	'PhoenixMembershipBannerModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'MEMBERSHIP BANNER',
			currentTab: {label:"MEMBERSHIP BANNER", state:"role.phoenix.banner"},
			imageInfo: {
				"partyId": null,
				"name": null,
				"imageUrl": null,
			},
			uiparams: {
				"colwidth": 'col-xs-7',
			},
		};
	}
]);
