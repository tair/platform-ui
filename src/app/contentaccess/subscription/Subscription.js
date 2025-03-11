/**
 * Subscription Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.subscription',

    /* Dependencies */
    [
      'ui.router',
      'service.title',

      'platform-ui.contentaccess.subscription.landing',
      'platform-ui.contentaccess.subscription.individual',
      'platform-ui.contentaccess.subscription.commercial',
      'platform-ui.contentaccess.subscription.institution',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
      .state('subscription.landing', {
        url: '?{partnerId}&{redirect}',
        views: {
          subscription: {
            controller: 'LandingController',
            templateUrl: 'contentaccess/subscription/landing/landing.html',
          },
        },
      })
      .state('subscription.commercial', {
        abstract: true,
        url: '/commercial',
        views: {
          subscription: {
            controller: 'CommercialController',
            templateUrl:
              'contentaccess/subscription/commercial/commercial.html',
          },
        },
      })
      .state('subscription.institution', {
        abstract: true,
        url: '/institution',
        views: {
          subscription: {
            controller: 'InstitutionController',
            templateUrl:
              'contentaccess/subscription/institution/institution.html',
          },
        },
      })
      .state('subscription.individual', {
        abstract: true,
        url: '/individual',
        views: {
          subscription: {
            controller: 'IndividualController',
            templateUrl:
              'contentaccess/subscription/individual/individual.html',
          },
        },
        resolve: {
          redirectToProperView: ['$state', '$stateParams', function($state, $stateParams) {
            var partnerId = $stateParams.partnerId;
            
            // If we're already in a child state, don't redirect
            if ($state.current.name !== 'subscription.individual') {
              return;
            }

            if (partnerId && partnerId.toLowerCase() === 'tair') {
              console.log('partnerId is tair; redirecting to bucket')
              return $state.go('subscription.individual.bucket', $stateParams);
            } else {
              console.log('partnerId is not tair; redirecting to term')
              return $state.go('subscription.individual.term', $stateParams);
            }
          }]
        }
      })
  })
