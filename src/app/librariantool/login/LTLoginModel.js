/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.login').factory(
	/* Name */
	'LTLoginModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Login',

			formdata: {
				user: null,
				password: null
			}
		};
	}
]);
