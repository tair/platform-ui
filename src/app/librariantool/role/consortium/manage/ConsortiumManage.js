/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.consortium.manage',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.consortium.manage.consortium',
	'platform-ui.librariantool.role.consortium.manage.institution',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.consortium.manage.consortium', {
                url: '/consortium',
                views: {
                    'manage': {
                        controller: 'ConsortiumManageConsortiumController',
                        templateUrl: 'librariantool/role/consortium/manage/consortium/consortium.html'
                    }
                }
            }).state('role.consortium.manage.institution', {
		url: '/institution',
		views: {
		    'manage': {
                        controller: 'ConsortiumManageInstitutionController',
                        templateUrl: 'librariantool/role/consortium/manage/institution/institution.html'
		    }
		}
	    })
	});

