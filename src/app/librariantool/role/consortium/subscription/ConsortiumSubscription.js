/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.consortium.subscription',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.consortium.subscription.list',
	'platform-ui.librariantool.role.consortium.subscription.renewal',
	'platform-ui.librariantool.role.consortium.subscription.request'
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('role.consortium.subscription.list', {
			url: '/list',
			views: {
                                'subscription': {
                                        controller: 'ConsortiumSubscriptionListController',
                                        templateUrl: 'librariantool/role/consortium/subscription/list/list.html'
                                }
                        }
                }).state('role.consortium.subscription.renewal', {
                        url: '/renewal?partnerId',
                        views: {
                                'subscription': {
                                        controller: 'ConsortiumSubscriptionRenewalController',
                                        templateUrl: 'librariantool/role/consortium/subscription/renewal/renewal.html'
                                }
                        }
                }).state('role.consortium.subscription.request', {
                        url: '/request?partnerId',
                        views: {
                                'subscription': {
                                        controller: 'ConsortiumSubscriptionRequestController',
                                        templateUrl: 'librariantool/role/consortium/subscription/request/request.html'
                                }
                        }
                });
	});

