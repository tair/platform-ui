/**
 * App Model
 */

angular.module('platform-ui').factory(
	/* Name */
	'PlatformModel',

	/* Dependencies */
	[

	/* Controller */
	function ($http) {
	    
	    console.log('PlatformModel controller called');

	    var config; 
	    
        $http.get('/config/config.json').then(function(res) { 
            config = res.data[0]; 
        });

	    return {
		title: 'PW2 Angular App',
		brand: 'Platform UI',
		author: 'Getexp',
		uiDomain: '.arabidopsis.org',
		apiUri: 'https://demoapi.arabidopsis.org',
		//apiUri: 'http://steveapi.steveatgetexp.com',
	    };
	}
]);
