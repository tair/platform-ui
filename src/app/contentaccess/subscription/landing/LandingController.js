/**
 * Landing Controller                                                                                                                                                                                
 */

angular.module('platform-ui.contentaccess.subscription.landing').controller(
    /* Name */
    'LandingController',
    
    /* Dependencies */
    [
	'$http',
        '$scope',
        '$location',
	'$state',
        'Title',
        'LandingModel',
	
        /* Controller Definition */
        function ($http, $scope, $location, $state, Title, LandingModel) {
	    $scope.next = function(){
		if ($scope.license == "def"){
		    alert("Please select a license type");
		    return;
		}
		//$scope.switchTab($scope.license);
		if ($scope.license == "individual") {
			$state.go("subscription.individual.term", {partnerId:$scope.partnerId,redirect:$scope.redirect});
			console.log($state);
			return;
		}
		if ($scope.license == "institution") {
			$state.go("subscription.institution.register", {partnerId:$scope.partnerId,redirect:$scope.redirect});
			console.log($state);
			return;
		}
		if ($scope.license == "commercial") {
			$state.go("subscription.commercial.register", {partnerId:$scope.partnerId,redirect:$scope.redirect});
			console.log($state);
			return;
		}
	    }
            $scope.set_license = function(str) {
                $scope.license = str;
            };
	    init();

            function init() {
		$scope.licenses = LandingModel.licenses;
		$scope.license = LandingModel.license;
                $http({
                    url:$scope.apiUri+'/partners/descriptions/?partnerId='+$scope.partnerId+'&includeText=True',
                    method:'GET',
                }).success(function(data, status, headers, config) {
                    $scope.licenses=data;
                }).error(function(data, status, headers, config) {
                    alert("error!");
                });
	    }
	}
    ]
)
