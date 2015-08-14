/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.contentaccess.login',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('login.form', {
				url: '?{partnerId}&{redirect}',
				views: {
					'login': {
						templateUrl: 'contentaccess/login/form/form.html'
					}
				}
			}).state('login.success', {
				url: '/success?{partnerId}&{redirect}',
				views: {
					'login': {
						templateUrl: 'contentaccess/login/success/success.html'
					}
				}
			});
		});

