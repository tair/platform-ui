/**
 * Subscription Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.contentaccess.subscription.individual',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.contentaccess.subscription.individual.bucket',
      'platform-ui.contentaccess.subscription.individual.term',
      'platform-ui.contentaccess.subscription.individual.pay',
    ]
  )
  .config(function ($stateProvider) {
    $stateProvider
    .state('subscription.individual.bucket', {
      url: '?{partnerId}&{redirect}',
      views: {
        individual: {
          controller: 'BucketController',
          templateUrl: function (stateParam) {
            var partnerId = stateParam.partnerId
            var viewFile = 'bucket.html'
            return (
              'contentaccess/subscription/individual/bucket/' + viewFile
            )
          },
        },
      },
    })
    // .state('subscription.individual.term', {
    //     url: '?{partnerId}&{redirect}',
    //     views: {
    //       individual: {
    //         controller: 'TermController',
    //         templateUrl: function (stateParam) {
    //           var partnerId = stateParam.partnerId
    //           var viewFile = 'term.html'
    //           if (partnerId != null) {
    //             switch(partnerId.toLowerCase()){
    //               case 'biocyc':
    //                 viewFile = 'biocyc-transition-info.html'
    //                 break;
    //             }
    //           }
    //           return (
    //             'contentaccess/subscription/individual/term/' + viewFile
    //           )
    //         },
    //       },
    //     },
    //   })
      
      .state('subscription.individual.pay', {
        url: '/pay?{partnerId}&{redirect}',
        views: {
          individual: {
            controller: 'PayController',
            templateUrl: 'contentaccess/subscription/individual/pay/pay.html',
          },
        },
      })
      .state('subscription.individual.confirm', {
        url: '/confirm?{partnerId}&{redirect}',
        views: {
          individual: {
            templateUrl:
              'contentaccess/subscription/individual/confirm/confirm.html',
          },
        },
      })
      .state('subscription.individual.thankyou', {
        url: '/thankyou?{partnerId}&{redirect}',
        views: {
          individual: {
            templateUrl:
              'contentaccess/subscription/individual/thankyou/thankyou.html',
          },
        },
      })
  })
