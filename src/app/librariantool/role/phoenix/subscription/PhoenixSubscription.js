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
	'platform-ui.librariantool.role.phoenix.subscription.edit'
    ])
    .config(
	function ($stateProvider) {
		$stateProvider.state('role.phoenix.subscription.list', {
			url: '/list',
			views: {
				'pheonixSubscription': {
					controller: 'PhoenixSubscriptionListController',
					templateUrl: 'librariantool/role/phoenix/subscription/list/list.html'
				}
			}
		}).state('role.phoenix.subscription.edit', {
			url: '/edit?partnerId&subscriptionId',
			views: {
				'pheonixSubscription': {
					controller: 'SubscriptionEditController',
					templateUrl: 'librariantool/role/phoenix/subscription/edit/edit.html'
				}
			}
		});
	});

