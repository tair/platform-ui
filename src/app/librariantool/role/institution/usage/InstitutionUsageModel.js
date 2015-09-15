/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.role.institution.usage').factory(
	/* Name */
	'InstitutionUsageModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'USAGE',
			uiparams: {
				"colwidth": 'col-md-11',
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
