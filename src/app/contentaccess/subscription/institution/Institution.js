/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.contentaccess.subscription.institution',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
  	'platform-ui.contentaccess.subscription.institution.register',
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('subscription.institution.register', {
				url: '?{partnerId}&{redirect}',
				views: {
					'institution': {
						controller: 'InstitutionRegisterController',
						templateUrl: 'contentaccess/subscription/institution/register/register.html'
					}
				}
			}).state('subscription.institution.thankyou', {
				url: '/thankyou?{partnerId}&{redirect}',
				views: {
					'institution': {
						templateUrl: 'contentaccess/subscription/institution/thankyou/thankyou.html'
					}
				}
			});
		});

