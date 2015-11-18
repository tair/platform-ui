/**
 * App Model
 */

angular.module('platform-ui').factory(
	/* Name */
	'PlatformModel',

	/* Dependencies */
	[

	/* Controller */
	function () {
	    
	    console.log('PlatformModel controller called');
	    
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
