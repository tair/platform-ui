/**
 * Login Controller
 */

angular.module('platform-ui.librariantool.role').controller(
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
	'RoleModel',
	'$cookieStore',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, RoleModel, $cookieStore) {
		//load credential info
		if($cookies.org_phoenixbioinformatics_ui_credentialId!=null){
			$scope.credentialId = $cookies.org_phoenixbioinformatics_ui_credentialId;
		}else if($window.sessionStorage.org_phoenixbioinformatics_ui_credentialId!=null){
			$scope.credentialId = $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId;
		}
		if($cookies.org_phoenixbioinformatics_ui_secretKey!=null){
			$scope.secretKey = $cookies.org_phoenixbioinformatics_ui_secretKey;
		}else if($window.sessionStorage.org_phoenixbioinformatics_ui_secretKey!=null){
			$scope.secretKey = $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey;
		}
		$scope.title = RoleModel.title;
	    $scope.home = function() {
		window.location.href='#/librariantool/login';
	    }
	    $scope.logout = function() {
		$cookieStore.remove("org_phoenixbioinformatics_ui_credentialId");
		$cookieStore.remove("org_phoenixbioinformatics_ui_secretKey");
		delete $window.sessionStorage.org_phoenixbioinformatics_ui_credentialId;
		delete $window.sessionStorage.org_phoenixbioinformatics_ui_secretKey;
		$scope.home();
	    }
	    $scope.setTitle = function(title) {
		$scope.title = title;
	    }

	    $scope.partyInfo = RoleModel.partyInfo;
	    $http({
		url: $scope.apiUri+'/credentials/?username='+$cookies.username+'&secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
		method: 'GET',
	    }).success(function(data, status, headers, config) {
	    	$scope.email = data[0].email;
	    }).error(function() {
		alert("Cannot get user email info");
	    });
        $http({
            url: $scope.apiUri+'/parties/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
            method: 'GET',
        }).success(function(data, status, headers, config){
            $scope.partyInfo = data[0];
        }).error(function(data, status, headers, config){
            alert("partyId failed");
        });

		$scope.title = $scope.partyInfo.name;

	    // CSS Logics common to all admin pages in different roles:
            $scope.groupsAddCss = function(adding) {
                if (adding) {
                    return "show";
                }
                return "hidden";
            }

            $scope.actionButtonAddCss = function(adding) {
                if (adding) {
                    return "lt-admin-action-button-selected";
                }
                return "lt-admin-action-button";
            }

            $scope.actionButtonGlyphiconAddCss = function(adding) {
                if (adding) {
                    return "lt-glyphicon-green";
                }
                return "lt-glyphicon";
            }

            $scope.actionButtonLabelAddCss = function(adding) {
                if (adding) {
                    return "lt-admin-action-button-label-selected";
                }
                return "lt-admin-action-button-label";
            }
            $scope.groupsListCss = function(state) {
                if (state == null) {
                    return "lt-admin-groups-list";
                }
                else if (state == "selected") {
                    return "lt-admin-groups-list-selected";
                } else if (state == "edit") {
                    return "lt-admin-groups-list-edit";
                } else if (state == "remove") {
                    return "lt-admin-groups-list-remove";
                }

            }
            $scope.groupsListLabelCss = function(state) {
                if (state == "edit") {
                    return "lt-admin-groups-list-label-edit";
                }
                return "lt-admin-groups-list-label";
            }
            $scope.groupsListGlyphiconCss = function(state) {
                if (state == null) {
                    return "lt-admin-groups-list-glyphicon-container hidden";
                }
                return "lt-admin-groups-list-glyphicon-container show";
            }
            $scope.groupsListGlyphiconRightCss = function(state) {
                if (state == "selected") {
                    return "glyphicon-trash lt-glyphicon";
                } else if (state == "edit") {
                    return "glyphicon-remove lt-glyphicon-green";
                } else if (state == "remove") {
                    return "glyphicon-remove lt-glyphicon-red";
                }

            }
            $scope.groupsListGlyphiconLeftCss = function(state) {
                if (state == "selected") {
                    return "glyphicon-pencil lt-glyphicon";
                } else if (state == "edit") {
                    return "glyphicon-ok lt-glyphicon-green";
                } else if (state == "remove") {
                    return "glyphicon-ok lt-glyphicon-red";
                }
                return "lt-glyphicon";
            }
	}
]);
