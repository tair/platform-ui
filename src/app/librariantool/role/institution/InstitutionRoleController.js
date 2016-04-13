/**
 * InstitutionRole Controller
 */

angular.module('platform-ui.librariantool.role.institution').controller(
	/* Name */
	'InstitutionRoleController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'InstitutionRoleModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, InstitutionRoleModel) {
		//load credentials
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
		//check credentials
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		//check role
//		if($scope.role != ("staff" || "consortium" || "organization")){
//			alert("Please use staff ,consortium or organization account to login.");
//			$scope.logout();
//		}
		//set title
		$scope.institutionId = $location.search()['institutionId'];
		$http({
			url: $scope.apiUri+'/parties/institutions?partyId='+$scope.institutionId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
			method: 'GET'
		    }).success(function(data, status, headers, config){
		    	$scope.institution = data;
		    	$scope.title = data[0].name;
				if($scope.title){
					$scope.setTitle($scope.title);
				}
		    }).error(function() {});
		//display option of back button
		if($scope.role == "staff") {
			$scope.setPhoenix(true);
		} else if ($scope.role = "consortium") {
			$scope.setConsortium(true);
		}
		//set currentTab
		$scope.currentTab = InstitutionRoleModel.currentTab;
		$scope.setCurrentTab = function(currentTab){
			$scope.currentTab = currentTab;
		}
		//tab content and style
		$scope.tabs = InstitutionRoleModel.getTabs($scope.role);
	    $scope.navbarLabel = function(tab) {
		if (tab.label == $scope.currentTab.label) {
		    return "lt-navbar-label-highlight";
		} 
		return "lt-navbar-label";
	    }
	    $scope.navbarLine = function(tab) {
                if (tab.label == $scope.currentTab.label) {
                    return "show";
                }
                return "hide";
	    }
	    //tab action
	    $scope.toTab = function(tab) {
		$state.go(tab.state);
		$scope.currentTab = tab;
	    }
//	    $state.go($scope.currentTab.state);
	}
]);
