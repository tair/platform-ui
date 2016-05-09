/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.role.institution.subscription',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.adminportal.role.institution.subscription.list',
	'platform-ui.adminportal.role.institution.subscription.renewal',
	'platform-ui.adminportal.role.institution.subscription.request'
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('role.institution.subscription.list', {
			url: '/list',
			views: {
				'subscription': {
					controller: 'SubscriptionListController',
					templateUrl: 'adminportal/role/institution/subscription/list/list.html'
				}
			}
		}).state('role.institution.subscription.renewal', {
			url: '/renewal?partnerId',
			views: {
				'subscription': {
					controller: 'SubscriptionRenewalController',
					templateUrl: 'adminportal/role/institution/subscription/renewal/renewal.html'
				}
			}
		}).state('role.institution.subscription.request', {
			url: '/request?partnerId',
			views: {
				'subscription': {
					controller: 'SubscriptionRequestController',
					templateUrl: 'adminportal/role/institution/subscription/request/request.html'
				}
			}
		});
	});

