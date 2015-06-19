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
				firstname: '',
				lastname: '',
				email: '',
				institution: '',			
				librarianName: '',
				librarianEmail: '',
				comments: '',
			}
		};

		function init() {
			$scope.formdata = InstitutionInfoModel.formdata;
                }
	}
]);
