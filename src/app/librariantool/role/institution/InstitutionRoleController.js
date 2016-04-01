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
		if(!$scope.credentialId || !$scope.secretKey){
			$state.go('ltlogin');
		}
		$http({
            url: $scope.apiUri+'/parties/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
            method: 'GET',
        }).success(function(data, status, headers, config){
            $scope.partyInfo = data[0];
            $scope.setTitle($scope.partyInfo.name);
        }).error(function(data, status, headers, config){
            alert("partyId failed");
        });	
		$scope.tabs = InstitutionRoleModel.tabs;
		if($window.sessionStorage.currentTab!=null
			&&$window.sessionStorage.currentTab!=undefined){
			$scope.currentTab = JSON.parse($window.sessionStorage.currentTab);
		}else{
			$scope.currentTab = InstitutionRoleModel.currentTab;
		}
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
	    $scope.toTab = function(tab) {
		$state.go(tab.state);
		$scope.currentTab = tab;
		$window.sessionStorage.currentTab = JSON.stringify(tab);
	    }
	    $state.go($scope.currentTab.state);
	}
]);
