/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.login').factory(
	/* Name */
	'LoginModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Login',

			formdata: {
				user: null,
				password: null,
				//emailsent: false,
				email: null
			}
		};
	}
]);
