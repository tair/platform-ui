/**
 * List Controller
 */

angular.module('platform-ui.contentaccess.list').controller(
  /* Name */
  'ListController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$location',
    '$window',
    'Title',

    /* Controller Definition */
    function ($http, $scope, $location, $window, Title) {
      init()

      sortfunction = function (a, b) {
        /* 0 = institution name, 1 = country name */
        institution1 = a[0].toLowerCase()
        institution2 = b[0].toLowerCase()
        country1 = a[1].toLowerCase()
        country2 = b[1].toLowerCase()
        if (country1 > country2) return 1
        if (country1 < country2) return -1
        if (institution1 > institution2) return 1
        if (institution2 > institution1) return -1
        return 0
      }

      function init() {
        Title.setTitle('University List')
        $scope.partnerId = $location.search()['partnerId']
        if ($scope.partnerId == 'biocyc') {
          $window.location.href = "https://biocyc.org/subscriber-list.shtml"
        }
        
        $http({
          url: $scope.apiUri + '/partners/?partnerId=' + $scope.partnerId,
          method: 'GET',
        }).success(function (data, status, headers, config) {
          $scope.partner = data[0]
        })

        $http({
          //vet PW-265
          url:
            $scope.apiUri +
            '/parties/organizations/?partnerId=' +
            $scope.partnerId,
          method: 'GET',
        }).success(function (data, status, headers, config) {
          $scope.institutions = data.sort(sortfunction)
        })

        $scope.headerVariable = getHeaderVariable()
      }

      function getHeaderVariable() {
        var variable = 'Subscribers'
        var partnerId = $scope.partnerId
        if (partnerId && partnerId.toLowerCase() == 'morphobank') {
          variable = 'Members'
        }
        return variable
      }
    },
  ]
)
