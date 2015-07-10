/**
 * List Module
 *
 * The main landing page
 */

angular.module(
	/* Name */
	'platform-ui.list',

	/* Dependencies */
	[
	'ui.router',
	'service.title',
	])
	.config(
		function ($stateProvider) {
			$stateProvider.state('list', {
				url: '/list',
				views: {
					'main': {
						controller: 'ListController',
						templateUrl: 'list/list.html'
					}
				}
			});
		});

