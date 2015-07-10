/**
 * Landing Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.subscription.landing',
    
    /* Dependencies */
    [
        'ui.router',
        'service.title',
    ])
    .config(
        function ($stateProvider) {
            $stateProvider.state('subscription.landing', {
                url: '/subscription/landing',
                views: {
                    'main': {
                        controller: 'LandingController.js',
                        templateUrl: 'subscription/landing.html'
                    }
                }
            });
        });
