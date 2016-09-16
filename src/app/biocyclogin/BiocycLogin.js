/**
 * Biocyc Login
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.biocyclogin',

	/* Dependencies */
	[
	'ui.router',
	'service.title'
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('biocyclogin', {
				url: '/login',
				views: {
					'main': {
						controller: 'BiocycLoginController',
						templateUrl: 'biocyclogin/biocyclogin.html'
					}
				}
			});
		});

