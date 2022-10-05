/**
 * Subscription Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.subscription.institution',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.subscription.institution.register',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
      .state('subscription.institution.register', {
        url: '?{partnerId}&{redirect}',
        views: {
          institution: {
            controller: 'InstitutionRegisterController',
            templateUrl: function (stateParam) {
              var partnerId = stateParam.partnerId
              var viewFile = 'register.html'
              if (partnerId != null) {
                switch(partnerId.toLowerCase()){
                  case 'morphobank':
                    viewFile = 'membership-register.html'
                    break;
                  case 'biocyc':
                    viewFile = 'biocyc-transition-info.html'
                    break;
                }
              }
              return (
                'contentaccess/subscription/institution/register/' + viewFile
              )
            },
          },
        },
      })
      .state('subscription.institution.thankyou', {
        url: '/thankyou?{partnerId}&{redirect}',
        views: {
          institution: {
            templateUrl:
              'contentaccess/subscription/institution/thankyou/thankyou.html',
          },
        },
      })
  })
