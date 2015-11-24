/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.phoenix',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.phoenix.institution',
	'platform-ui.librariantool.role.phoenix.manage',
	'platform-ui.librariantool.role.phoenix.subscription',
	'platform-ui.librariantool.role.phoenix.profile',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.phoenix.default', {
                url: '/',
                views: {
                    'phoenix': {
                        controller: 'PhoenixManageController',
                        templateUrl: 'librariantool/role/phoenix/manage/manage.html'
                    }
                }
            }).state('role.phoenix.manage', {
		url: '/manage',
		views: {
		    'phoenix': {
			controller: 'PhoenixManageController',
			templateUrl: 'librariantool/role/phoenix/manage/manage.html'
		    }
		}
            }).state('role.phoenix.institution', {
        		url: '/institution?partyId',
        		views: {
        		    'phoenix': {
        			controller: 'PhoenixInstitutionController',
        			templateUrl: 'librariantool/role/phoenix/institution/institution.html'
        		    }
        		}
                    }).state('role.phoenix.subscription', {
                url: '/subscription',
                views: {
                    'phoenix': {
                        controller: 'PhoenixSubscriptionController',
                        templateUrl: 'librariantool/role/phoenix/subscription/subscription.html'
                    }
                }
            }).state('role.phoenix.profile', {
                url: '/profile',
                views: {
                    'phoenix': {
                        controller: 'PhoenixProfileController',
                        templateUrl: 'librariantool/role/phoenix/profile/profile.html'
                    }
                }
            });
	});

