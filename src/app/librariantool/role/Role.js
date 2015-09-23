/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
        'platform-ui.librariantool.role.institution',
	'platform-ui.librariantool.role.consortium',
	'platform-ui.librariantool.role.phoenix',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.default', {
                url: '',
                views: {
                    'role': {
                        controller: 'InstitutionRoleController',
                        templateUrl: 'librariantool/role/institution/institution.html'
                    }
                }
            }).state('role.institution', {
                url: '/institution',
                views: {
                    'role': {
                        controller: 'InstitutionRoleController',
                        templateUrl: 'librariantool/role/institution/institution.html'
                    }
                }
            }).state('role.consortium', {
                url: '/consortium',
                views: {
                    'role': {
                        controller: 'ConsortiumController',
                        templateUrl: 'librariantool/role/consortium/consortium.html'
                    }
                }
            }).state('role.phoenix', {
                url: '/phoenix',
                views: {
                    'role': {
                        controller: 'PhoenixController',
                        templateUrl: 'librariantool/role/phoenix/phoenix.html'
                    }
                }
            });

	});

