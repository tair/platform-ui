/**
 * PhoenixRole Controller
 */

angular.module('platform-ui.librariantool.role.phoenix').controller(
	/* Name */
	'PhoenixController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'Title',
	'PhoenixModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, PhoenixModel) {
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
		//check credential info
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		//check role
//		if($scope.role != ("staff")){
//		alert("Please use staff account to login.");
//		$scope.logout();
//	}
		//set title
		$scope.setTitle($scope.partyInfo.name);
		//display option of back button
		$scope.setPhoenix(false);
        //tab content and style
        $scope.tabs = PhoenixModel.tabs;
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
		//set currentTab
	    $scope.setCurrentTab = function(currentTab){
	    	$scope.currentTab = currentTab;
	    }
	}
]);
