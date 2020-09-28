/**
 * Login Module
 *
 * The main landing page
 */

angular
  .module(
    /* Name */
    'platform-ui.adminportal.role.institution',

    /* Dependencies */
    [
      'ui.router',
      'service.title',
      'platform-ui.adminportal.role.institution.iprange',
      'platform-ui.adminportal.role.institution.consortium',
      'platform-ui.adminportal.role.institution.subscription',
      'platform-ui.adminportal.role.institution.profile',
      'platform-ui.adminportal.role.institution.usage',
    ]
  )
  //    .config('$urlRouterProvider',function ($urlRouterProvider) {
  //		$urlRouterProvider.when('','/iprange');
  //    }) //TODO:use urlRouterProvider to set default state of role.institution
  .config(function ($stateProvider) {
    $stateProvider
      .state('role.institution.iprange', {
        url: '/iprange',
        views: {
          institution: {
            controller: 'InstitutionIpRangeController',
            templateUrl: 'adminportal/role/institution/iprange/iprange.html',
          },
        },
      })
      .state('role.institution.consortium', {
        url: '/consortium',
        views: {
          institution: {
            controller: 'InstitutionConsortiumController',
            templateUrl:
              'adminportal/role/institution/consortium/consortium.html',
          },
        },
      })
      .state('role.institution.subscription', {
        url: '/subscription',
        views: {
          institution: {
            controller: 'InstitutionSubscriptionController',
            templateUrl:
              'adminportal/role/institution/subscription/subscription.html',
          },
        },
      })
      .state('role.institution.profile', {
        url: '/profile',
        views: {
          institution: {
            controller: 'InstitutionProfileController',
            templateUrl: 'adminportal/role/institution/profile/profile.html',
          },
        },
      })
      .state('role.institution.usage', {
        url: '/usage',
        views: {
          institution: {
            controller: 'InstitutionUsageController',
            templateUrl: 'adminportal/role/institution/usage/usage.html',
          },
        },
      })
      .state('role.institution.banner', {
        url: '/membership-banner',
        views: {
          institution: {
            controller: 'InstitutionMembershipBannerController',
            templateUrl:
              'adminportal/role/institution/banner/membership-banner.html',
          },
        },
      })
  })
