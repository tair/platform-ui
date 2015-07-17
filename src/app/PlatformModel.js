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
		apiUri: 'https://steveapi.steveatgetexp.com',
		apiKey: 'test123'
	    };
	}
]);
