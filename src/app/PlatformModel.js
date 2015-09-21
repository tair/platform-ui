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
	    return {
		title: 'PW2 Angular App',
		brand: 'Platform UI',
		author: 'Getexp',
		uiDomain: '.arabidopsis.org',
		apiUri: 'https://demoapi.arabidopsis.org',
	    };
	}
]);
