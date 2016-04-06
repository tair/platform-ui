/**
 * Consortium Controller
 */

angular.module('platform-ui.librariantool.role.consortium').controller(
	/* Name */
	'ConsortiumController',

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
	'ConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, Title, CurrentTab, ConsortiumModel) {
		if($cookies.credentialId!=null){
			$scope.credentialId = $cookies.credentialId;
		}else if($window.sessionStorage.credentialId!=null){
			$scope.credentialId = $window.sessionStorage.credentialId;
		}
		if($cookies.secretKey!=null){
			$scope.secretKey = $cookies.secretKey;
		}else if($window.sessionStorage.secretKey!=null){
			$scope.secretKey = $window.sessionStorage.secretKey;
		}
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}
		$scope.setTitle(ConsortiumModel.title);
		$scope.currentTab = ConsortiumModel.currentTab;
	    $scope.setCurrentTab = function(currentTab){
	    	$scope.currentTab = currentTab;
	    }
        $scope.tabs = ConsortiumModel.getTabs($scope.role);
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
        $scope.clickTab = function(tab) {
            $state.go(tab.state);
            $scope.currentTab = tab;
        }
	}
]);
