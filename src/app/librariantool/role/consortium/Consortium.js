/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.consortium',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'service.currenttab',
	'service.pageinfo',
	'platform-ui.librariantool.role.consortium.institution',
	'platform-ui.librariantool.role.consortium.subscription',
	'platform-ui.librariantool.role.consortium.profile',
	'platform-ui.librariantool.role.consortium.usage',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider
//            .state('role.consortium.default', {
//                url: '/',
//                views: {
//                    'consortium': {
//                        controller: 'ConsortiumInstitutionController',
//                        templateUrl: 'librariantool/role/consortium/institution/institution.html'
//                    }
//                }
//            })
            .state('role.consortium.institution', {
                url: '/institution',
                views: {
                    'consortium': {
                        controller: 'ConsortiumInstitutionController',
                        templateUrl: 'librariantool/role/consortium/institution/institution.html'
                    }
                }
            }).state('role.consortium.subscription', {
                url: '/subscription',
                views: {
                    'consortium': {
                        controller: 'ConsortiumSubscriptionController',
                        templateUrl: 'librariantool/role/consortium/subscription/subscription.html'
                    }
                }
            }).state('role.consortium.profile', {
                url: '/profile',
                views: {
                    'consortium': {
                        controller: 'ConsortiumProfileController',
                        templateUrl: 'librariantool/role/consortium/profile/profile.html'
                    }
                }
            }).state('role.consortium.usage', {
                url: '/usage',
                views: {
                    'consortium': {
                        controller: 'ConsortiumUsageController',
                        templateUrl: 'librariantool/role/consortium/usage/usage.html'
                    }
                }
            });
	});

