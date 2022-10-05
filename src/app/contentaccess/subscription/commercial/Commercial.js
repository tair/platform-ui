/**
 * Subscription Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.subscription.commercial',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.subscription.commercial.register',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
      .state('subscription.commercial.register', {
        url: '?{partnerId}&{redirect}',
        views: {
          commercial: {
            controller: 'CommercialRegisterController',
            templateUrl: function (stateParam) {
              var partnerId = stateParam.partnerId
              var viewFile = 'register.html'
              if (partnerId != null) {
                switch(partnerId.toLowerCase()){
                  case 'biocyc':
                    viewFile = 'biocyc-transition-info.html'
                    break;
                }
              }
              return (
                'contentaccess/subscription/commercial/register/' + viewFile
              )
            },
          },
        },
      })
      .state('subscription.commercial.thankyou', {
        url: '/thankyou?{partnerId}&{redirect}',
        views: {
          commercial: {
            templateUrl:
              'contentaccess/subscription/commercial/thankyou/thankyou.html',
          },
        },
      })
  })
