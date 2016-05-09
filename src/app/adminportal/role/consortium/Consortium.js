/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.role.consortium',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'service.currenttab',
	'service.pageinfo',
	'platform-ui.adminportal.role.consortium.institution',
	'platform-ui.adminportal.role.consortium.subscription',
	'platform-ui.adminportal.role.consortium.profile',
	'platform-ui.adminportal.role.consortium.usage',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider
//            .state('role.consortium.default', {
//                url: '/',
//                views: {
//                    'consortium': {
//                        controller: 'ConsortiumInstitutionController',
//                        templateUrl: 'adminportal/role/consortium/institution/institution.html'
//                    }
//                }
//            })
            .state('role.consortium.institution', {
                url: '/institution',
                views: {
                    'consortium': {
                        controller: 'ConsortiumInstitutionController',
                        templateUrl: 'adminportal/role/consortium/institution/institution.html'
                    }
                }
            }).state('role.consortium.subscription', {
                url: '/subscription',
                views: {
                    'consortium': {
                        controller: 'ConsortiumSubscriptionController',
                        templateUrl: 'adminportal/role/consortium/subscription/subscription.html'
                    }
                }
            }).state('role.consortium.profile', {
                url: '/profile',
                views: {
                    'consortium': {
                        controller: 'ConsortiumProfileController',
                        templateUrl: 'adminportal/role/consortium/profile/profile.html'
                    }
                }
            }).state('role.consortium.usage', {
                url: '/usage',
                views: {
                    'consortium': {
                        controller: 'ConsortiumUsageController',
                        templateUrl: 'adminportal/role/consortium/usage/usage.html'
                    }
                }
            });
	});

