/**
 * Landing Controller                                                                                                                                                                                
 */

angular.module('platform-ui.subscription.landing').controller(
    /* Name */
    'LandingController',
    
    /* Dependencies */
    [
        '$cookies',
        '$http',
        '$scope',
        '$location',
        'Title',
        'LandingModel',
	
        /* Controller Definition */
        function ($cookies, $http, $scope, $location, Title, LandingModel) {
	    $scope.next = function(){
		if ($scope.license == "def"){
		    alert("Please select a license type");
		    return;
		}
		$scope.switchTab($scope.license);
	    }
            $scope.set_license = function(str) {
                $scope.license = str;
            };
	    init();

            function init() {
		$scope.licenses = LandingModel.licenses;
		$scope.license = LandingModel.license;
                $http({
                    url:'http://pb.steveatgetexp.com/partners/descriptions/?partnerId='+$scope.partnerId+'&includeText=True',
                    method:'GET',
                    withCredentials:true,
                }).success(function(data, status, headers, config) {
                    $scope.licenses=data;
                }).error(function(data, status, headers, config) {
                    alert("error!");
                });
	    }
	}
    ]
)
