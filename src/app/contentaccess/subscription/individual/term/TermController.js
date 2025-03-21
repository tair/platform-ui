/**
 * Term Controller
 */

angular
  .module('platform-ui.contentaccess.subscription.individual.term')
  .controller(
    /* Name */
    'TermController',

    /* Dependencies */
    [
      '$http',
      '$scope',
      '$rootScope',
      '$stateParams',
      'TermModel',

      /* Controller Definition */
      function ($http, $scope, $rootScope, $stateParams, TermModel) {
        init()

        $scope.reset = function () {
          $scope.info.numOfSubscribers = 1
          $scope.userbool = false
          $scope.termsbool = false
        }

        $scope.validate = function () {
          return (
            $scope.selectedSubscription.subscriptionTermId != null &&
            $scope.info.numOfSubscribers > 0 &&
            $scope.userbool == true &&
            $scope.termsbool == true
          )
        }

        $scope.validateAndSubmit = function () {
          $scope.errors = null
          if ($scope.selectedSubscription.subscriptionTermId == null) {
            $scope.errors = 'Please select a subscription term.'
            return false
          }
          if ($scope.info.numOfSubscribers <= 0) {
            $scope.errors = 'Number of licenses must be a poitive integer.'
            return false
          }
          if ($scope.userbool == false) {
            $scope.errors =
              'Please confirm that you are an academic individual.'
            return false
          }
          if ($scope.termsbool == false) {
            $scope.errors = 'Please accept the terms of use.'
            return false
          }
          return true
        }

        function init() {
          var debugMsg = ''
          //1.
          if ($scope.partnerId == null) {
            $scope.partnerId = $stateParams.partnerId
          } 

          //2.
          if ($scope.partner == null) {
            $http({
              url: $scope.apiUri + '/partners/?partnerId=' + $scope.partnerId,
              method: 'GET',
            })
              .success(function (data, status, headers, config) {
                $scope.partner = data[0]
              })
              .error(function (data, status, headers, config) {
                debugMsg = '2.2. ERROR with $scope.partner'
                console.log(debugMsg)
                bootbox.alert(debugMsg)
              })
          }
          //3. initialise with default values
          //PW-215 that's the place where wrong default values are assigned
          //commenting out the assignment
          //$scope.subscriptions = TermModel.subscriptions;
          $scope.userbool = TermModel.userbool
          $scope.termsbool = TermModel.termsbool

          //4. rewrite the default values with correct actual values
          $http({
            url:
              $scope.apiUri + '/partners/terms/?partnerId=' + $scope.partnerId,
            method: 'GET',
          })
            .success(function (data, status, headers, config) {
              $scope.subscriptions = data //vet PW-215 here the default values are being rewritten with correct values
            })
            .error(function (data, status, headers, config) {
              debugMsg =
                '4.2. ERROR $scope.subscriptions is ' + $scope.subscriptions
              console.log(debugMsg)
              bootbox.alert(debugMsg)
            })
        }
      },
    ]
  )
