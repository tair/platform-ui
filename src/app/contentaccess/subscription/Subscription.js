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
          authCheck: ['$cookies', '$stateParams', '$state', function($cookies, $stateParams, $state) {
            var partnerId = $stateParams.partnerId;
            var isTair = partnerId && partnerId.toLowerCase() === 'tair';
            
            // Only require login for TAIR partner
            if (isTair) {
              var hasCredential = !!$cookies.credentialId;
              var hasOrcid = !!$stateParams.orcid_id;
              
              if (!hasCredential && !hasOrcid) {
                // Not logged in - redirect to login
                var returnUrl = '/contentaccess/subscription/individual?partnerId=' + partnerId;
                if ($stateParams.redirect) {
                  returnUrl += '&redirect=' + encodeURIComponent($stateParams.redirect);
                }
                return $state.go('login.form', {
                  partnerId: partnerId,
                  redirect: $stateParams.redirect,
                  returnTo: returnUrl,
                });
              }
            }
          }]
        }
      })
  })
