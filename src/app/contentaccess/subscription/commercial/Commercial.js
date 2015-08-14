/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.contentaccess.subscription.commercial',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	'platform-ui.contentaccess.subscription.commercial.register',
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('subscription.commercial.register', {
				url: '?{partnerId}&{redirect}',
				views: {
					'commercial': {
						controller: 'CommercialRegisterController',
						templateUrl: 'contentaccess/subscription/commercial/register/register.html'
					}
				}
			}).state('subscription.commercial.thankyou', {
				url: '/thankyou?{partnerId}&{redirect}',
				views: {
					'commercial': {
						templateUrl: 'contentaccess/subscription/commercial/thankyou/thankyou.html'
					}
				}
			});
		});

