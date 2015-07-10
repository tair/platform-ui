/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.login').factory(
	/* Name */
	'LoginModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'Login',

			formdata: {
				user: null,
				password: null
			},

			resources: {
				login: 'http://azeemapi.steveatgetexp.com/users/login/',
			}
		};
	}
]);
