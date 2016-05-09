/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.role',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'service.currenttab',
    'platform-ui.adminportal.role.institution',
	'platform-ui.adminportal.role.consortium',
	'platform-ui.adminportal.role.phoenix',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.default', {
                url: '',
                views: {
                    'role': {
                        controller: 'InstitutionRoleController',
                        templateUrl: 'adminportal/role/institution/institution.html'
                    }
                }
            }).state('role.institution', {
                url: '/institution?institutionId',
//                params: {
//                	institution: null,
//                },
                views: {
                    'role': {
                        controller: 'InstitutionRoleController',
                        templateUrl: 'adminportal/role/institution/institution.html'
                    }
                }
            }).state('role.consortium', {
                url: '/consortium?consortiumId',//TODO: find a way to keep state params after page reload
//                params: {
//                	consortium: null,
//                },
                views: {
                    'role': {
                        controller: 'ConsortiumController',
                        templateUrl: 'adminportal/role/consortium/consortium.html'
                    }
                }
            }).state('role.phoenix', {
                url: '/phoenix',
                views: {
                    'role': {
                        controller: 'PhoenixController',
                        templateUrl: 'adminportal/role/phoenix/phoenix.html'
                    }
                }
            });

	});

