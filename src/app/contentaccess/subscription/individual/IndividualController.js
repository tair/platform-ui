/**
 * IndividualInfo Controller
 */

angular.module('platform-ui.contentaccess.subscription.individual').controller(
  /* Name */
  'IndividualController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$rootScope',
    '$state',
    '$location',
    'IndividualModel',

    /* Controller Definition */
    function ($http, $scope, $rootScope, $state, $location, IndividualModel) {
      init()

      $scope.next = function (nextTab) {
        //$scope.currentTab = nextTab;
        if (nextTab == 'term') {
          $state.go('subscription.individual.term')
          return
        }
        if (nextTab == 'pay') {
          $state.go('subscription.individual.pay')
          return
        }
        if (nextTab == 'confirm') {
          $state.go('subscription.individual.confirm')
          return
        }
        if (nextTab == 'thankyou') {
          $state.go('subscription.individual.thankyou')
          return
        }
      }

      $scope.setSelectedSubscription = function (
        id,
        partner,
        period,
        price,
        discount,
        description
      ) {
        $scope.selectedSubscription.subscriptionTermId = id
        $scope.selectedSubscription.partnerId = partner
        $scope.selectedSubscription.period = period
        $scope.selectedSubscription.price = price
        $scope.selectedSubscription.groupDiscountPercentage = discount
        $scope.selectedSubscription.description = description
      }

      $scope.get_total_price2 = function () {
        if ($scope.selectedSubscription.price == null) return null
        if ($scope.info.numOfSubscribers == null) return null
        if ($scope.info.numOfSubscribers < 0) return 0
        var num = Math.round($scope.info.numOfSubscribers)
        var ret =
          $scope.selectedSubscription.groupDiscountPercentage > 0
            ? num > 1
              ? $scope.selectedSubscription.price *
                num *
                (1 - $scope.selectedSubscription.groupDiscountPercentage / 100)
              : $scope.selectedSubscription.price * num
            : $scope.selectedSubscription.price * num
        $scope.info.subtotal = Math.round(ret * 100) / 100
        return $scope.info.subtotal
      }

      $scope.makeCharge = function (bool, next) {
        Stripe.setPublishableKey($scope.stripePublishableKey)
        var stripeData = {
          name: $scope.formdata.firstname + ' ' + $scope.formdata.lastname,
          address_line1: $scope.formdata.street,
          address_city: $scope.formdata.city,
          address_state: $scope.formdata.state,
          address_zip: $scope.formdata.zip,
          number: $scope.formdata.creditcard,
          cvc: $scope.formdata.cvc,
          exp_month: $scope.formdata.expmonth,
          exp_year: $scope.formdata.expyear,
        //   other: $scope.formdata.other, // stripe doesn't accept unknown fields after update
        }
        Stripe.card.createToken(stripeData, function (status, response) {
          if (response.error) {
            $scope.stripeerrors = '' + response.error.message
            console.log(
              'response=' + response.error.message + ';status=' + status
            ) //PW-193
            bootbox.alert(response.error.message + ' status=' + status) //PW-193 TBD what exact error msg to show here
          } else {
            $scope.stripeerrors = null
            $scope.last4 = response.card.last4
            if (bool) {
              $scope.loading = true
              $http({
                url: $scope.apiUri + '/subscriptions/payments/',
                data: {
                  stripeToken: response.id,
                  price: $scope.info.subtotal,
                  termId: $scope.selectedSubscription.subscriptionTermId,
                  quantity: $scope.info.numOfSubscribers,
                  email: $scope.formdata.email,
                  firstName: $scope.formdata.firstname,
                  lastName: $scope.formdata.lastname,
                  institute: $scope.formdata.institution,
                  street: $scope.formdata.street,
                  city: $scope.formdata.city,
                  state: $scope.formdata.state,
                  country: $scope.formdata.country,
                  zip: $scope.formdata.zip,
                  other: $scope.formdata.other, //PW-248
                  redirect: $scope.redirect,
                  domain: $scope.domain,
                },
                method: 'POST',
                timeout: 30000
              })
                .success(function (data, status, headers, config) {
                    $scope.next(next)
                })
                .error(function (data, status, headers, config) {
                  $scope.loading = false
                  if (data.message) {
                    errMsg = 'Sorry, there is an error submitting your payment (Error Message: ' + data.message +
                      '). <br>Please try again later or contact us at <a href="mailto:subscriptions@phoenixbioinformatics.org">subscriptions@phoenixbioinformatics.org</a>'
                  } else {
                    errMsg = 'Sorry, there is an error submitting your payment (Error Code: ' + status +
                      '). <br>Please try again later or contact us at <a href="mailto:subscriptions@phoenixbioinformatics.org">subscriptions@phoenixbioinformatics.org</a>'
                  }
                  bootbox.alert(errMsg) //PW-120 PWL-882
                })
            }else{
                $scope.next(next)
            }
          }
          $scope.$apply()
        })
      }

      function init() {
        $scope.formdata = IndividualModel.formdata
        $scope.currentTab = IndividualModel.currentTab
        $scope.tabs = IndividualModel.tabs
        $scope.templates = IndividualModel.templates
        $scope.info = IndividualModel.info
        $scope.selectedSubscription = IndividualModel.selectedSubscription
        $scope.loading = false
        //            $scope.domain = $location.protocol() + "://" + $location.host();
      }
    },
  ]
)
