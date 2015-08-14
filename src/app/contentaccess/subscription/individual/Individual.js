/**
 * Subscription Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.contentaccess.subscription.individual',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	    'platform-ui.contentaccess.subscription.individual.term',
	    'platform-ui.contentaccess.subscription.individual.pay',
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('subscription.individual.term', {
				url: '?{partnerId}&{redirect}',
				views: {
					'individual': {
						controller: 'TermController',
						templateUrl: 'contentaccess/subscription/individual/term/term.html'
					}
				}
			}).state('subscription.individual.pay', {
				url: '/pay?{partnerId}&{redirect}',
				views: {
					'individual': {
						controller: 'PayController',
						templateUrl: 'contentaccess/subscription/individual/pay/pay.html'
					}
				}
			}).state('subscription.individual.confirm', {
				url: '/confirm?{partnerId}&{redirect}',
				views: {
					'individual': {
						templateUrl: 'contentaccess/subscription/individual/confirm/confirm.html'
					}
				}
			}).state('subscription.individual.thankyou', {
				url: '/thankyou?{partnerId}&{redirect}',
				views: {
					'individual': {
						templateUrl: 'contentaccess/subscription/individual/thankyou/thankyou.html'
					}
				}
			});
		});

