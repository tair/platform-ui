/**
 * ContentAccess Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess').factory(
	/* Name */
	'ContentAccessModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'ContentAccess'
		};
	}
]);