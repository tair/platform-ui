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
//		if($scope.role != ("staff" || "consortium")){
//			alert("Please use staff or consortium account to login.");
//			$state.go('ltlogin');
//		}
		//set title or load default title
		$scope.setTitle(ConsortiumModel.title);
		$scope.consortium = $state.params.consortium;
		if(scope.consortium == null || $scope.consortium == undefined){
			$scope.consortium = $scope.getPartyInfo();
		}
		$scope.title = $scope.consortium.name;
		if($scope.title){
			$scope.setTitle($scope.title);
		}
		if($scope.role == "staff") {
			$scope.setPhoenix(true);
		} else if ($scope.role = "consortium") {
			$scope.setConsortium(false);
		}
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
