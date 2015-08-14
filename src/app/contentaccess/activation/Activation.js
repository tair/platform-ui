/**
 * Activation Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.contentaccess.activation',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('activation.form', {
				url: '?{partnerId}&{redirect}',
				views: {
					'activation': {
						templateUrl: 'contentaccess/activation/form/form.html'
					}
				}
			}).state('activation.success', {
				url: '/success?{partnerId}&{redirect}',
				views: {
					'activation': {
						templateUrl: 'contentaccess/activation/success/success.html'
					}
				}
			}).state('activation.error', {
				url: '/error?{partnerId}&{redirect}',
				views: {
					'activation': {
						templateUrl: 'contentaccess/activation/error/error.html'
					}
				}
			});
		});

