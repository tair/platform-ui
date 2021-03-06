/**
 * Login Controller
 */

angular.module('platform-ui.adminportal.role').controller(
  /* Name */
  'RoleController',

  /* Dependencies */
  [
    '$scope',
    '$http',
    '$cookies',
    '$window',
    '$location',
    '$state',
    'Title',
    'CurrentTab',
    'RoleModel',
    '$cookieStore',

    /* Controller Definition */
    function (
      $scope,
      $http,
      $cookies,
      $window,
      $location,
      $state,
      Title,
      CurrentTab,
      RoleModel,
      $cookieStore
    ) {
      //load credential info
      if ($cookies.org_phoenixbioinformatics_ui_credentialId != null) {
        $scope.credentialId = $cookies.org_phoenixbioinformatics_ui_credentialId
      } else if (
        $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId != null
      ) {
        $scope.credentialId =
          $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId
      }
      if ($cookies.org_phoenixbioinformatics_ui_secretKey != null) {
        $scope.secretKey = $cookies.org_phoenixbioinformatics_ui_secretKey
      } else if (
        $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey != null
      ) {
        $scope.secretKey =
          $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey
      }
      $scope.title = RoleModel.title
      $scope.home = function () {
        window.location.href = '#/adminportal/login'
      }
      $scope.logout = function () {
        $cookieStore.remove('org_phoenixbioinformatics_ui_credentialId')
        $cookieStore.remove('org_phoenixbioinformatics_ui_secretKey')
        delete $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId
        delete $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey
        $scope.home()
      }
      $scope.setTitle = function (title) {
        $scope.title = title
      }
      $scope.backToConsortium = function () {
        $state.go('role.consortium.institution', {
          consortiumId: $scope.credentialId,
        })
      }
      $scope.backToPhoenix = function () {
        $state.go('role.phoenix.consortium')
      }
      $scope.setConsortium = function (bool) {
        $scope.isConsortium = bool
      }
      $scope.setPhoenix = function (bool) {
        $scope.isPhoenix = bool
      }
      //partyInfo and role initialization
      $scope.partyInfo = RoleModel.partyInfo
      $scope.role = ''
      $http({
        url:
          $scope.apiUri +
          '/parties/?partyId=' +
          $scope.credentialId +
          '&secretKey=' +
          encodeURIComponent($scope.secretKey) +
          '&credentialId=' +
          $scope.credentialId,
        method: 'GET',
      })
        .success(function (data, status, headers, config) {
          $scope.partyInfo = data[0]
          $scope.title = $scope.partyInfo['name']
          $scope.role = $scope.partyInfo['partyType']
          //				if($scope.role == "staff"){
          //					$state.go("role.phoenix");
          //				}else if($scope.role == "consortium"){
          //					$state.go("role.consortium",{consortiumId: $scope.partyInfo.partyId});
          //				}else if($scope.role == "organization"){
          //					$state.go("role.institution", {institutionId: $scope.partyInfo.partyId});
          //				}else{
          //					alert("Cannot recognize account type");
          //					$scope.logout();
          //				}
        })
        .error(function () {})
      $http({
        url:
          $scope.apiUri +
          '/credentials/?partyId=' +
          $scope.credentialId +
          '&secretKey=' +
          encodeURIComponent($scope.secretKey) +
          '&credentialId=' +
          $scope.credentialId,
        method: 'GET',
      })
        .success(function (data, status, headers, config) {
          $scope.email = data[0].email
          //		    	$cookies.partyInfo.username = data[0].username;
          //		    	$cookies.partyInfo.email = data[0].email;
          //		    	$cookies.partyInfo.institution = data[0].institution;
          //		    	$cookies.partyInfo.partnerId = data[0].partnerId;
          //		    	$cookies.partyInfo.userIdentifier = data[0].userIdentifier;
        })
        .error(function () {})
    
        // get countries info which will be widely used in all roles
        $http({
            url: $scope.apiUri + '/parties/countries/',
            method: 'GET',
        }).success(function (data, status, headers, config) {
            $scope.countries = data
        })

      // get country name by id
      $scope.getCountryNameById = function (countryId) {
        var country =  $scope.countries.find( function(countryObj){
            return countryObj.countryId == countryId
        })
        return country? country.name : ''
      }

      // CSS Logics common to all admin pages in different roles:
      $scope.groupsAddCss = function (adding) {
        if (adding) {
          return 'show'
        }
        return 'hidden'
      }

      $scope.actionButtonAddCss = function (adding) {
        if (adding) {
          return 'lt-admin-action-button-selected'
        }
        return 'lt-admin-action-button'
      }

      $scope.actionButtonGlyphiconAddCss = function (adding) {
        if (adding) {
          return 'lt-glyphicon-green'
        }
        return 'lt-glyphicon'
      }

      $scope.actionButtonLabelAddCss = function (adding) {
        if (adding) {
          return 'lt-admin-action-button-label-selected'
        }
        return 'lt-admin-action-button-label'
      }
      $scope.groupsListCss = function (state) {
        if (state == null) {
          return 'lt-admin-groups-list'
        } else if (state == 'selected') {
          return 'lt-admin-groups-list-selected'
        } else if (state == 'edit') {
          return 'lt-admin-groups-list-edit'
        } else if (state == 'remove') {
          return 'lt-admin-groups-list-remove'
        }
      }
      $scope.groupsListLabelCss = function (state) {
        if (state == 'edit') {
          return 'lt-admin-groups-list-label-edit'
        }
        return 'lt-admin-groups-list-label'
      }
      $scope.groupsListGlyphiconCss = function (state) {
        if (state == null) {
          return 'lt-admin-groups-list-glyphicon-container hidden'
        }
        return 'lt-admin-groups-list-glyphicon-container show'
      }
      $scope.groupsListGlyphiconRightCss = function (state) {
        if (state == 'selected') {
          return 'glyphicon-trash lt-glyphicon'
        } else if (state == 'edit') {
          return 'glyphicon-remove lt-glyphicon-green'
        } else if (state == 'remove') {
          return 'delete-no' //PW-137
        }
      }
      $scope.groupsListGlyphiconLeftCss = function (state) {
        if (state == 'selected') {
          return 'glyphicon-pencil lt-glyphicon'
        } else if (state == 'edit') {
          return 'glyphicon-ok lt-glyphicon-green'
        } else if (state == 'remove') {
          return 'delete-yes' //PW-137
        }
        return 'lt-glyphicon'
      }
    },
  ]
)
