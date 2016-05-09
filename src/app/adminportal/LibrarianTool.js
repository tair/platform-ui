/**
 * adminportal Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'service.currenttab',
	'platform-ui.adminportal.login',
	'platform-ui.adminportal.role',
    ])
    .config(
	function ($stateProvider) {
	    $stateProvider.state('ltlogin', {
		url: '/adminportal/login',
		views: {
		    'main': {
			controller: 'LTLoginController',
			templateUrl: 'adminportal/login/login.html'
		    }
		}
	    }).state('role', {
		url: '/adminportal/role',
		views: {
		    'main': {
			controller: 'RoleController',
			templateUrl: 'adminportal/role/role.html'
		    }
		}
	    });
	});

