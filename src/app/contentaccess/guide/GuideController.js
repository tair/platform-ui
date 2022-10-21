/**
 * Guide Controller
 */

angular.module('platform-ui.contentaccess.guide').controller(
  /* Name */
  'GuideController',

  /* Dependencies */
  [
    '$http',
    '$scope',
    '$location',
    '$timeout',
    'Title',

    /* Controller Definition */
    function ($http, $scope, $location, $timeout, Title) {
      init()
      function init() {
        Title.setTitle('Troubleshooting guide')
        $scope.partnerId = $location.search()['partnerId']
        if ($scope.partnerId == 'biocyc') {
          $location.href = "https://biocyc.org/subscriber-list.shtml"
        }
        $http({
          url: $scope.apiUri + '/partners/?partnerId=' + $scope.partnerId,
          method: 'GET',
        }).success(function (data, status, headers, config) {
          $scope.partner = data[0]
        })
        if (showChineseGuide()) {
          var notice = document.getElementById('tair-chinese-notice')
          notice.classList.remove('ng-hide')
        }
      }

      function showChineseGuide() {
        var partnerId = $scope.partnerId
        if (!partnerId) return false
        return partnerId.toLowerCase() == 'tair'
      }
    },
  ]
)
