/**
 * InstitutionUsage Controller
 */

angular.module('platform-ui.adminportal.role.institution.usage').controller(
  /* Name */
  'InstitutionUsageController',

  /* Dependencies */
  [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    'Title',
    'InstitutionUsageModel',

    /* Controller Definition */
    function (
      $scope,
      $http,
      $cookies,
      $window,
      $location,
      $state,
      Title,
      InstitutionUsageModel
    ) {
      init()

      $scope.validateForm = function () {
        var getEndDate = new Date($scope.postData.endDate)
        var getStartDate = new Date($scope.postData.startDate)
        if (getEndDate >= getStartDate) return true
        alert('End date must be greater than start date')
        return false
      }

      $scope.requestUsage = function () {
        $http({
          url:
            $scope.apiUri +
            '/parties/usage/?partyId=' +
            $scope.institutuionId +
            '&credentialId=' +
            $scope.credentialId +
            '&secretKey=' +
            encodeURIComponent($scope.secretKey),
          method: 'POST',
          data: $scope.postData,
        })
          .success(function () {
            alert(
              'Your request has been received. We will get back to you shortly.'
            )
            $scope.postData.startDate = null
            $scope.postData.endDate = null
            $scope.postData.comments = null
            $scope.postData.partner = null
            $scope.postData.name = null
          })
          .error(function () {
            alert('Form submit failed')
          })
      }

      function init() {
        $scope.setCurrentTab(InstitutionUsageModel.currentTab)
        $scope.uiparams = InstitutionUsageModel.uiparams
        $scope.postData = InstitutionUsageModel.postData
        //			if(!$scope.credentialId || !$scope.secretKey){
        //				$state.go('ltlogin');
        //			}

        //get institution name
        $http({
          url:
            $scope.apiUri +
            '/parties/institutions/?credentialId=' +
            $scope.credentialId +
            '&secretKey=' +
            encodeURIComponent($scope.secretKey) +
            '&partyId=' +
            $scope.institutionId,
          method: 'GET',
        })
          .success(function (data, status, headers, config) {
            $scope.postData.institution = data[0].name
            $scope.postData.email = data[1].email
            $scope.postData.name = data[1].firstName + ' ' + data[1].lastName
          })
          .error(function () {
            alert('failed to get party information')
          })
        $http({
          url: $scope.apiUri + '/partners/',
          method: 'GET',
        })
          .success(function (data, status, headers, config) {
            $scope.partners = data
          })
          .error(function () {
            alert('Cannot get partner information')
          })
        $(function () {
          $('#startDate').datepicker()
        })
        $(function () {
          $('#endDate').datepicker()
        })
      }
    },
  ]
)
