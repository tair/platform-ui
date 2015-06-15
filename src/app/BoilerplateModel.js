/**
 * App Model
 */

angular.module('boilerplate').factory(
	/* Name */
	'BoilerplateModel',

	/* Dependencies */
	[

	/* Controller */
	function () {
		return {
			title: 'Sample Angular App',
			brand: 'Boilerplate',
			author: 'Getexp',

			menu: [
				{ label: 'Home', target: '#home' },
				{ label: 'About', target: '',
					dropdown: [
						{ label: 'About', icon: 'fa-info-circle', target: '#about' },
						{ label: 'Contact', icon: 'fa-phone', target: '#contact' }
					]
				}
			]
		};
	}	
]);