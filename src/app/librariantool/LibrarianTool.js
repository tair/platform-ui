/**
 * ContentAccess Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.login',
	'platform-ui.librariantool.role',
    ])
    .config(
	function ($stateProvider) {
	    $stateProvider.state('ltlogin', {
		url: '/librariantool/login',
		views: {
		    'main': {
			controller: 'LTLoginController',
			templateUrl: 'librariantool/login/login.html'
		    }
		}
	    }).state('role', {
		url: '/librariantool/role',
		views: {
		    'main': {
			controller: 'RoleController',
			templateUrl: 'librariantool/role/role.html'
		    }
		}
	    });
	});

