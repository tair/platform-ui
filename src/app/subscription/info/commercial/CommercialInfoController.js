/**
 * Subscription Controller
 */

angular.module('boilerplate.subscription.info.commercial').controller(
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
			$scope.formdata.firstname = '';
			$scope.formdata.lastname = '';
			$scope.formdata.email = '';
			$scope.formdata.institution = '';
			$scope.formdata.license = 0;
			$scope.formdata.comments = '';
		};

		function init() {
			$scope.formdata = CommercialInfoModel.formdata;
                }
	}
]);
