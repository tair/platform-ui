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

			/*menu: [
				{ label: 'Home', target: '#home' },
				{ label: 'About', target: '',
					dropdown: [
						{ label: 'About', icon: 'fa-info-circle', target: '#about' },
						{ label: 'Contact', icon: 'fa-phone', target: '#contact' }
					]
				}
			]*/
		};
	}	
]);
