/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription.info.commercial').controller(
	/* Name */
	'CommercialInfoController',

	/* Dependencies */
	[
	'$scope',
	'$rootScope',
	'CommercialInfoModel',

	/* Controller Definition */
	function ($scope, $rootScope, CommercialInfoModel) {
		init();

		$scope.resetCommercialForm = function() {
			$scope.formdata.firstname = null;
			$scope.formdata.lastname = null;
			$scope.formdata.email = null;
			$scope.formdata.institution = null;
			$scope.formdata.individualLicense = false;
			$scope.formdata.companyLicense = false;
			$scope.formdata.comments = null;
		};

		$scope.validateInfoCommercialForm = function() {
			return ($scope.formdata.firstname != null
					&&
				$scope.formdata.lastname != null
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

		function init() {
			$scope.formdata = CommercialInfoModel.formdata;
                }
	}
]);
