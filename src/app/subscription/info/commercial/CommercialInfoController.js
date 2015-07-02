/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription.info.commercial').controller(
	/* Name */
	'CommercialInfoController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	'$scope',
	'$rootScope',
	'CommercialInfoModel',

	/* Controller Definition */
	function ($http, $cookies, $scope, $rootScope, CommercialInfoModel) {
		init();

		$scope.resetCommercialForm = function() {
			$scope.formdata.firstName = null;
			$scope.formdata.lastName = null;
			$scope.formdata.email = null;
			$scope.formdata.institution = null;
			$scope.formdata.individualLicense = false;
			$scope.formdata.companyLicense = false;
			$scope.formdata.comments = null;
		};

		$scope.validateInfoCommercialForm = function() {
			return ($scope.formdata.firstName != null
					&&
				$scope.formdata.lastName != null
					&&
				$scope.formdata.email != null
					&&
				$scope.formdata.institution != null
					&&
				(
					$scope.formdata.individualLicense 
						||
					$scope.formdata.companyLicense
				)
			);
		};

            $scope.sendCommercialRegistration = function() {
                $cookies.apiKey = 'test123';
                $http({
                    url:'http://pb.steveatgetexp.com/subscriptions/commercials/',
                    data:$scope.formdata,
                    method:'POST',
                    withCredentials:true,
                }).success(function(data, status, headers, config) {
                }).error(function(data, status, headers, config) {
                });
                $scope.next();
            }

		function init() {
			$scope.formdata = CommercialInfoModel.formdata;
                }
	}
]);
