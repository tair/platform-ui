/**
 * Login Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.librariantool.role.institution',
    
    /* Dependencies */
    [
	'ui.router',
	'service.title',
	'platform-ui.librariantool.role.institution.iprange',
	'platform-ui.librariantool.role.institution.consortium',
	'platform-ui.librariantool.role.institution.subscription',
	'platform-ui.librariantool.role.institution.profile',
	'platform-ui.librariantool.role.institution.usage',
    ])
    .config(
	function ($stateProvider) {
            $stateProvider.state('role.institution.default', {
                url: '',
                views: {
                    'institution': {
                        controller: 'InstitutionIpRangeController',
                        templateUrl: 'librariantool/role/institution/iprange/iprange.html'
                    }
                }
            }).state('role.institution.iprange', {
		url: '/iprange',
		views: {
		    'institution': {
			controller: 'InstitutionIpRangeController',
			templateUrl: 'librariantool/role/institution/iprange/iprange.html'
		    }
		  }
        }).state('role.institution.consortium', {
    	  url: '/consortium',
    	  views: {
       	 	'institution': {
        	  controller: 'InstitutionConsortiumController',
       	   	  templateUrl: 'librariantool/role/institution/consortium/consortium.html'
       	    }
      	  }
    	}).state('role.institution.subscription', {
                url: '/subscription',
                views: {
                    'institution': {
                        controller: 'InstitutionSubscriptionController',
                        templateUrl: 'librariantool/role/institution/subscription/subscription.html'
                    }
                }
            }).state('role.institution.profile', {
                url: '/profile',
                views: {
                    'institution': {
                        controller: 'InstitutionProfileController',
                        templateUrl: 'librariantool/role/institution/profile/profile.html'
                    }
                }
            }).state('role.institution.usage', {
                url: '/usage',
                views: {
                    'institution': {
                        controller: 'InstitutionUsageController',
                        templateUrl: 'librariantool/role/institution/usage/usage.html'
                    }
                }
            });
	});

