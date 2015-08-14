/**
 * Landing Module
 *
 * The main landing page
 */

angular.module(
    /* Name */
    'platform-ui.contentaccess.subscription.landing',
    
    /* Dependencies */
    [
        'ui.router',
        'service.title',
    ])
    .config(
        function ($stateProvider) {
            /*$stateProvider.state('subscription.landing', {
                url: '/contentaccess/subscription/landing',
                views: {
                    'main': {
                        controller: 'LandingController.js',
                        templateUrl: 'contentaccess/subscription/landing.html'
                    }
                }
            });*/
        });
