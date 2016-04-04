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
	'platform-ui.librariantool.role.phoenix.consortium',
	'platform-ui.librariantool.role.phoenix.profile',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.phoenix.default', {
                url: '/',
                views: {
                    'phoenix': {
                        controller: 'PhoenixInstitutionController',
                        templateUrl: 'librariantool/role/phoenix/institution/institution.html'
                    }
                }
            }).state('role.phoenix.consortium', {
		        url: '/consortium',
		        views: {
		          'phoenix': {
		          controller: 'PhoenixConsortiumController',
		          templateUrl: 'librariantool/role/phoenix/consortium/consortium.html'
		        }
		      }
		    }).state('role.phoenix.institution', {
	    		url: '/institution',
	    		views: {
	    		    'phoenix': {
	    			controller: 'PhoenixInstitutionController',
	    			templateUrl: 'librariantool/role/phoenix/institution/institution.html'
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

