/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription.info.institution').controller(
	/* Name */
	'InstitutionInfoController',

	/* Dependencies */
	[
	'$scope',
	'$rootScope',
	'InstitutionInfoModel',

	/* Controller Definition */
	function ($scope, $rootScope, InstitutionInfoModel) {
		init();

		$scope.resetInstitutionForm = function() {
			$scope.formdata = {
				firstname: null,
				lastname: null,
				email: null,
				institution: null,			
				librarianName: null,
				librarianEmail: null,
				comments: null,
			}
		};

		$scope.validateInfoInstitutionForm = function() {
			return (
				$scope.formdata.firstname != null
					&&
				$scope.formdata.lastname != null
					&&
				$scope.formdata.email != null
					&&
				$scope.formdata.institution != null
			);
		};

		function init() {
			$scope.formdata = InstitutionInfoModel.formdata;
                }
	}
]);
