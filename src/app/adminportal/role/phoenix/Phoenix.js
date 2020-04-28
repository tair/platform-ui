/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.adminportal.role.phoenix',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.adminportal.role.phoenix.institution',
	'platform-ui.adminportal.role.phoenix.consortium',
	'platform-ui.adminportal.role.phoenix.profile',
    'platform-ui.adminportal.role.phoenix.subscription',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.phoenix.default', {
                url: '/',
                views: {
                    'phoenix': {
                        controller: 'PhoenixInstitutionController',
                        templateUrl: 'adminportal/role/phoenix/institution/institution.html'
                    }
                }
            }).state('role.phoenix.consortium', {
		        url: '/consortium',
		        views: {
		          'phoenix': {
		          controller: 'PhoenixConsortiumController',
		          templateUrl: 'adminportal/role/phoenix/consortium/consortium.html'
		        }
		      }
		    }).state('role.phoenix.institution', {
	    		url: '/institution',
	    		views: {
	    		    'phoenix': {
	    			controller: 'PhoenixInstitutionController',
	    			templateUrl: 'adminportal/role/phoenix/institution/institution.html'
	    		    }
	    		}
            }).state('role.phoenix.profile', {
	            url: '/profile',
	            views: {
	                'phoenix': {
	                    controller: 'PhoenixProfileController',
	                    templateUrl: 'adminportal/role/phoenix/profile/profile.html'
	                }
	            }
            }).state('role.phoenix.subscription', {
	            url: '/subscription',
	            views: {
	                'phoenix': {
	                    controller: 'PhoenixSubscriptionController',
	                    templateUrl: 'adminportal/role/phoenix/subscription/subscription.html'
	                }
	            }
            });
	});

