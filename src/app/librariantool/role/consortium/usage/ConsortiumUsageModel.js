/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.consortium.usage').factory(
	/* Name */
	'ConsortiumUsageModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Consortium',
			uiparams: {
				"colwidth": 'col-xs-11',
			},
			postData: {
				"institution": null,
				"startDate": null,
				"endDate": null,
				"comments": null
			},
		};
	}
]);
