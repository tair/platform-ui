/**
 * List Controller
 */

angular.module('platform-ui.contentaccess.list').controller(
	/* Name */
	'ListController',

	/* Dependencies */
	[
	'$http',
	'$scope',
	'$location',
	'Title',

	/* Controller Definition */
	function ($http, $scope, $location, Title) {
	    init();
	    
	    sortfunction = function(a,b) {
		/* 0 = institution name, 1 = country name */
		institution1 = a[0].toLowerCase();
		institution2 = b[0].toLowerCase();
		country1 = a[1].toLowerCase();
		country2 = b[1].toLowerCase();
		if (country1 > country2) return 1;
		if (country1 < country2) return -1
		if (institution1 > institution2) return 1;
		if (institution2 > institution1) return -1;
		return 0;
	    }
	    $timeout(function(){
	    	$scope.searchTerm="";
	    	$scope.$apply();
	    }, 1000);
	    
	    function init() {
                Title.setTitle('University List');
		$scope.partnerId = $location.search()['partnerId'];
		$http({
		    url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
		    method:'GET',
		}).success(function(data, status, headers, config) {
		    $scope.partner = data[0];
		});
		$http({
                    url:$scope.apiUri+'/parties/organizations?partnerId='+$scope.partnerId,
                    method:'GET',
                }).success(function(data, status, headers, config) {
                    $scope.institutions = data.sort(sortfunction);
                });
	    }
	}
]);
