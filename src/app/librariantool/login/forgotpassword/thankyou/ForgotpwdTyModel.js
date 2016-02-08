/**
 * Login Model
 * Model for root /index.html template that wraps every other view.
 */

angular.module('platform-ui.librariantool.login.forgotpassword.thankyou').factory(
	/* Name */
	'ForgotpwdTyModel',

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
