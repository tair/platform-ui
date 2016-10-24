/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.adminportal.login.forgotusername.thankyou').factory(
	/* Name */
	'ForgotUsernameTyModel',

	/* Dependencies */
	[

	function () {
		return {
			title: 'vet forgot pwd',
			formdata: {
				user: null,
				password: null
			}
		};
	}
]);
