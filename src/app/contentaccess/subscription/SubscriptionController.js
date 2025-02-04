/**
 * Subscription Controller
 */

angular.module('platform-ui.contentaccess.subscription').controller(
  /* Name */
  'SubscriptionController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$location',
    //'$cookies',
    '$state',
    'Title',
    'SubscriptionModel',

    /* Controller Definition */
    function ($http, $scope, $location, $state, Title, SubscriptionModel) {
      init()
      rerouteByPartner() // init first then reroute to make sure scope params are set for child

      $scope.switchTab = function (tabName) {
        if (tabName == 'landing') {
          $state.go('subscription.landing', {
            partnerId: $scope.partnerId,
            redirect: $scope.redirect,
          })
          return
        }
      }

      $scope.listInstitution = function ($event) {
        $scope.currentTab = 'listTab'
        $event.preventDefault()
      }

      function getPartnerUriFromRedirect() {
        // console.log("$scope.redirectNoEncode (before split)="+$scope.redirect); //PW-218
        arr = $scope.redirect.split('/')
        // console.log("arr (after split)="+arr[0]+"//"+arr[2]); //PW-218
        return arr[0] + '//' + arr[2]
      }

      function init() {
        Title.setTitle(SubscriptionModel.title) //PW-264
        $scope.initialheading = SubscriptionModel.initialheading
        $scope.currentTab = SubscriptionModel.currentTab
        $scope.tabs = SubscriptionModel.tabs
        $scope.templates = SubscriptionModel.templates
        $scope.partnerId = $location.search()['partnerId'] //TODO: need to use $stateParams in the future
        $scope.partner = SubscriptionModel.partner
        $scope.institutions = SubscriptionModel.institutions
        $scope.countries = SubscriptionModel.countries
        $scope.redirect = $scope.getRedirectNoEncode()
        $scope.redirect = decodeURIComponent($scope.redirect)
        $scope.redirectNoEncode = $scope.getRedirectNoEncode()
        $scope.domain = getPartnerUriFromRedirect()
        $http({
          url: $scope.apiUri + '/partners/?partnerId=' + $scope.partnerId,
          method: 'GET',
        }).success(function (data, status, headers, config) {
          $scope.partner = data[0]
          $scope.helpLink = getHelpLink()
        })
        $http({
          url: $scope.apiUri + '/parties/organizations/', //needed for PW-266
          method: 'GET',
        }).success(function (data, status, headers, config) {
          $scope.institutions = data
        })
        $http({
          url: $scope.apiUri + '/parties/countries/',
          method: 'GET',
        }).success(function (data, status, headers, config) {
          $scope.countries = data
        })
        $scope.panelHeader = getPanelHeader()
      }

      function getHelpLink() {
        return SubscriptionModel.helpLink
      }

      function rerouteByPartner() {
        var partnerId = $scope.partnerId
        if (!partnerId) return
        if (partnerId.toLowerCase() == 'morphobank') {
          if (!$location.url().includes('thankyou')) {
            // not redirect for thank you page
            $state.go('subscription.institution.register', {
              partnerId: $scope.partnerId,
              redirect: $scope.redirect,
            })
          }
        }
      }

      function getPanelHeader() {
        var header = 'Subscribe'
        var partnerId = $scope.partnerId
        if (partnerId && partnerId.toLowerCase() == 'morphobank') {
          header = 'How can you help?'
        }
        if(partnerId && partnerId.toLowerCase() == 'tair'){
          header = 'Purchase usage units for individual academic or non-profit use'
        }
        return header
      }
    },

  ]
)
