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
	    $scope.title = RoleModel.title;
	    $scope.home = function() {
		window.location.href='#/librariantool/login';
	    }
	    $scope.logout = function() {
		$cookieStore.remove("credentialId");
		$cookieStore.remove("secretKey");
		delete $window.sessionStorage.credentialId;
		delete $window.sessionStorage.secretKey;
		$scope.home();
	    }
	    $scope.setTitle = function(title) {
		$scope.title = title;
	    }

	    $scope.partyInfo = RoleModel.partyInfo;
	    $http({
		url: $scope.apiUri+'/credentials/?username='+$cookies.username+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
		method: 'GET',
	    }).success(function(data, status, headers, config) {
	    	$scope.email = data[0].email;
	    }).error(function() {
		alert("Cannot get user email info");
	    });
            $http({
                url: $scope.apiUri+'/parties/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
                $scope.partyInfo = data[0];
            }).error(function(data, status, headers, config){
                alert("partyId failed");
            });


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
