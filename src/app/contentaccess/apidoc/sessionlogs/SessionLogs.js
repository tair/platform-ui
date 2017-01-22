/**
 * SessionLogs Module
 * 
 * The main landing page
 */

angular.module(
    /* Name */
	'platform-ui.contentaccess.apidoc.sessionlogs',

	/* Dependencies */
	[ 'ui.router', 'service.title',	'platform-ui.contentaccess.apidoc.sessionlogs.doc', ]).config(
	    function($stateProvider) {
		    $stateProvider.state('apidoc.sessionlogs.doc',
			    {
				    url : '',
					views : 
					{
					    'sessionlogs' : 
					        {
						        controller : 'SessionLogsDocController',
							    templateUrl : 'contentaccess/apidoc/sessionlogs/doc/doc.html'
							}
					}
			    });
        });
