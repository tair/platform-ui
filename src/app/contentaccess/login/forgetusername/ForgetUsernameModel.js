/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.contentaccess.login.forgetusername').factory(
	/* Name */
	'ForgetUsernameModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'vet forget username',
			formdata: {
				user: null,
				password: null
			}
		};
	}
]);
