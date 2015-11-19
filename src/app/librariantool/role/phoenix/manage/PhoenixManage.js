/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.phoenix.manage',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.phoenix.manage.consortium',
	'platform-ui.librariantool.role.phoenix.manage.institution',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.phoenix.manage.default', {
                url: '/',
                views: {
                    'manage': {
                        controller: 'PhoenixManageConsortiumController',
                        templateUrl: 'librariantool/role/phoenix/manage/consortium/consortium.html'
                    }
                }
            }).state('role.phoenix.manage.consortium', {
                url: '/consortium',
                views: {
                    'manage': {
                        controller: 'PhoenixManageConsortiumController',
                        templateUrl: 'librariantool/role/phoenix/manage/consortium/consortium.html'
                    }
                }
            }).state('role.phoenix.manage.institution', {
		url: '/institution?partyId',
		views: {
		    'manage': {
                        controller: 'PhoenixManageInstitutionController',
                        templateUrl: 'librariantool/role/phoenix/manage/institution/institution.html'
		    }
		},
        params: {
        	partyId : null
        }
	    })
	});

