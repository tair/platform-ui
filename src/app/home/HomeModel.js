/**
 * Home Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.home').factory(
	/* Name */
	'HomeModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Home'
		};
	}
]);