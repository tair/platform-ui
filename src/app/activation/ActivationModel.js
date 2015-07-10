/**
 * Activation Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.activation').factory(
	/* Name */
	'ActivationModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Activation'
		};
	}
]);