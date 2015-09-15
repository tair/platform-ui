/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.institution.subscription',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.institution.subscription.list',
	'platform-ui.librariantool.role.institution.subscription.renewal',
	'platform-ui.librariantool.role.institution.subscription.request'
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('role.institution.subscription.list', {
			url: '/list',
			views: {
				'subscription': {
					controller: 'SubscriptionListController',
					templateUrl: 'librariantool/role/institution/subscription/list/list.html'
				}
			}
		}).state('role.institution.subscription.renewal', {
			url: '/renewal',
			views: {
				'subscription': {
					controller: 'SubscriptionRenewalController',
					templateUrl: 'librariantool/role/institution/subscription/renewal/renewal.html'
				}
			}
		}).state('role.institution.subscription.request', {
			url: '/request',
			views: {
				'subscription': {
					controller: 'SubscriptionRequestController',
					templateUrl: 'librariantool/role/institution/subscription/request/request.html'
				}
			}
		});
	});

