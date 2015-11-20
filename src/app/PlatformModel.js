/**
 * App Model
 */

angular.module('platform-ui').factory(
	/* Name */
	'PlatformModel',

	/* Dependencies */
	[

	'$http',

	/* Controller */
	function ($http) {
	    
	    return {
		title: 'PW2 Angular App',
		brand: 'Platform UI',
		author: 'Getexp',
		uiDomain: '.arabidopsis.org',
	    };
	}
]);
