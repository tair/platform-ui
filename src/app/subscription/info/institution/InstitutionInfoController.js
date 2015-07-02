/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription.info.institution').controller(
	/* Name */
	'InstitutionInfoController',

	/* Dependencies */
	[
	    '$http',
	    '$cookies',
	'$scope',
	'$rootScope',
	'InstitutionInfoModel',

	/* Controller Definition */
	function ($http, $cookies, $scope, $rootScope, InstitutionInfoModel) {
		init();

		$scope.resetInstitutionForm = function() {
			$scope.formdata = {
				firstName: null,
				lastName: null,
				email: null,
				institution: null,			
				librarianName: null,
				librarianEmail: null,
				comments: null,
			}
		};

		$scope.validateInfoInstitutionForm = function() {
			return (
				$scope.formdata.firstName != null
					&&
				$scope.formdata.lastName != null
					&&
				$scope.formdata.email != null
					&&
				$scope.formdata.institution != null
			);
		};

	    $scope.sendInstitutionRegistration = function() {
                $cookies.apiKey = 'test123';
                $http({
                    url:'http://pb.steveatgetexp.com/subscriptions/institutions/',
		    data:$scope.formdata,
                    method:'POST',
                    withCredentials:true,
                }).success(function(data, status, headers, config) {
                }).error(function(data, status, headers, config) {
                });
		$scope.next();
	    }

	    function init() {
		$scope.formdata = InstitutionInfoModel.formdata;
            }
	}
]);
