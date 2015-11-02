/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.phoenix.subscription',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.phoenix.subscription.list',
	'platform-ui.librariantool.role.phoenix.subscription.renewal',
	'platform-ui.librariantool.role.phoenix.subscription.request'
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('role.phoenix.subscription.list', {
			url: '/list',
			views: {
				'subscription': {
					controller: 'SubscriptionListController',
					templateUrl: 'librariantool/role/phoenix/subscription/list/list.html'
				}
			}
		}).state('role.phoenix.subscription.renewal', {
			url: '/renewal?partnerId',
			views: {
				'subscription': {
					controller: 'SubscriptionRenewalController',
					templateUrl: 'librariantool/role/phoenix/subscription/renewal/renewal.html'
				}
			}
		}).state('role.phoenix.subscription.request', {
			url: '/request?partnerId',
			views: {
				'subscription': {
					controller: 'SubscriptionRequestController',
					templateUrl: 'librariantool/role/phoenix/subscription/request/request.html'
				}
			}
		});
	});

