/**
 * Partners Module
 * 
 * The main landing page
 */

angular.module(
    /* Name */
	'platform-ui.contentaccess.apidoc.partners',

	/* Dependencies */
	[ 'ui.router', 'service.title',	'platform-ui.contentaccess.apidoc.partners.doc', ]).config(
	    function($stateProvider) {
		    $stateProvider.state('apidoc.partners.doc',
			    {
				    url : '',
					views : 
					{
					    'partners' : 
					        {
						        controller : 'PartnersDocController',
							    templateUrl : 'contentaccess/apidoc/partners/doc/doc.html'
							}
					}
			    });
        });
