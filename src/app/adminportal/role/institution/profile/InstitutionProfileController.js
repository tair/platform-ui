/**
 * InstitutionProfileController
 */

angular.module('platform-ui.adminportal.role.institution.profile').controller(
  /* Name */
  'InstitutionProfileController',

  /* Dependencies */
  [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    'Title',
    'InstitutionProfileModel',

    /* Controller Definition */
    function (
      $scope,
      $http,
      $cookies,
      $window,
      $location,
      $state,
      Title,
      InstitutionProfileModel
    ) {
      init()

      $scope.edit_fields = function () {
        if ($scope.edit == true) {
          if (!validateInfo()) {
            return false
          }
          //Save info
          put_data = {}
          has_update = false
          //put original values from GET
          put_data['partyId'] = $scope.user.partyId

          //rewrite with new from UI
          forceReSignIn = false
          for (k in $scope.user) {
            if ($scope.userprev[k] != $scope.user[k]) {
              has_update = true
              put_data[k] = $scope.user[k]
              if (
                (k == 'username' || k == 'password') &&
                $scope.role == 'organization'
              ) {
                forceReSignIn = true
              }
            }
          }

          if (has_update == true) {
            $http({
              url:
                $scope.apiUri +
                '/parties/institutions/?credentialId=' +
                $scope.credentialId +
                '&secretKey=' +
                encodeURIComponent($scope.secretKey),
              data: put_data,
              method: 'PUT',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
              .success(function (data, status, headers, config) {
                bootbox.alert(
                  'Institution Profile Successfully Updated' +
                    (forceReSignIn ? '. Please re-login' : '!')
                )
                if (forceReSignIn) {
                  $scope.logout()
                }

                $scope.user.partyId = data[0].partyId
                $scope.user.partyType = data[0].partyType
                $scope.user.name = data[0].name
                $scope.user.country = data[0].country
                $scope.user.display = data[0].display
                $scope.user.consortiums = data[0].consortiums

                if (data.length > 1) {
                  if ('username' in data[1]) {
                    $scope.user.username = data[1].username
                  }
                  if ('email' in data[1]) {
                    $scope.user.email = data[1].email
                  }
                  if ('institution' in data[1]) {
                    $scope.user.institution = data[1].institution
                  }
                  if ('partnerId' in data[1]) {
                    $scope.user.partnerId = data[1].partnerId
                  }
                  if ('userIdentifier' in data[1]) {
                    $scope.user.userIdentifier = data[1].userIdentifier
                  }
                  if ('firstName' in data[1]) {
                    $scope.user.firstName = data[1].firstName
                  }
                  if ('lastName' in data[1]) {
                    $scope.user.lastName = data[1].lastName
                  }
                }

                $scope.userprev = {}
                for (k in $scope.user) $scope.userprev[k] = $scope.user[k]

                $scope.email_validate = $scope.user.email
                $scope.email_validate_prev = $scope.email_validate
                $scope.password_validate = $scope.user.password
                $scope.password_validate_prev = $scope.password_validate
              })
              .error(function (data, status, headers, config) {
                bootbox.alert(
                  'Failed to update Institution Profile! ' + data['error']
                )
                $scope.cancel()
              })
          }
        }
        $scope.edit = !$scope.edit
      }

      $scope.cancel = function () {
        $scope.edit = false
        for (k in $scope.userprev) $scope.user[k] = $scope.userprev[k]
        $scope.email_validate = $scope.email_validate_prev
        $scope.password_validate = $scope.password_validate_prev
      }

      function validateInfo() {
        if (!$scope.user.country){
          console.log('Country field is required')
          alert('Country field is required')
          return false
        }
        if ($scope.user.email && $scope.user.email.$invalid) {
          console.log('User email is invalid')
          alert('Email not valid')
          return false
        }
        if ($scope.user.email && $scope.user.email != $scope.email_validate) {
          console.log(
            'User email is ' +
              $scope.user.email +
              ' and validate email is ' +
              $scope.email_validate
          )
          alert('Email not match')
          return false
        }
        if (
          $scope.user.password &&
          $scope.user.password != $scope.password_validate
        ) {
          console.log(
            'User password is ' +
              $scope.user.password +
              ' and validate password is ' +
              $scope.password_validate
          )
          alert('Password not match')
          return false
        }
        return true
      }

      function init() {
        $scope.setCurrentTab(InstitutionProfileModel.currentTab)
        $scope.user = InstitutionProfileModel.user
        //				if(!$scope.credentialId || !$scope.secretKey){
        //					$state.go('ltlogin');
        //				}
        $http({
          url:
            $scope.apiUri +
            '/parties/institutions/?partyId=' +
            $scope.institutionId +
            '&credentialId=' +
            $scope.credentialId +
            '&secretKey=' +
            encodeURIComponent($scope.secretKey),
          method: 'GET',
        })
          .success(function (data, status, headers, config) {
            $scope.user.partyId = data[0].partyId
            $scope.user.partyType = data[0].partyType
            $scope.user.name = data[0].name
            $scope.user.country = data[0].country
            $scope.user.display = data[0].display
            $scope.user.consortiums = data[0].consortiums

            $scope.user.username = data[1].username
            //$scope.user.password = "random";
            $scope.user.email = data[1].email
            $scope.user.institution = data[1].institution
            //$scope.user.partyId = data[1].partyId;
            $scope.user.partnerId = data[1].partnerId
            $scope.user.userIdentifier = data[1].userIdentifier
            $scope.user.firstName = data[1].firstName
            $scope.user.lastName = data[1].lastName

            $scope.userprev = {}
            for (k in $scope.user) $scope.userprev[k] = $scope.user[k]

            $scope.email_validate = $scope.user.email
            $scope.email_validate_prev = $scope.email_validate
            $scope.password_validate = $scope.user.password
            $scope.password_validate_prev = $scope.password_validate
          })
          .error(function (data, status, headers, config) {
            errMsg = 'GET /parties/institutions/ Failed'
            //                            	bootbox.alert(errMsg);
          })

        $scope.edit = false
        $scope.uiparams = InstitutionProfileModel.uiparams
      }
    },
  ]
)
