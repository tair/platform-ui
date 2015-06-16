/**
 * IndividualInfo Controller
 */

angular.module('boilerplate.subscription.info.individual').controller(
	/* Name */
	'IndividualInfoController',

	/* Dependencies */
	[
	'$scope',
	'$rootScope',
	'IndividualInfoModel',

	/* Controller Definition */
	function ($scope, $rootScope, IndividualInfoModel) {
		init();

		$scope.resetIndividualForm = function() {
			$scope.formdata = {
				firstname: '',
				lastname: '',
				email: '',
				individual: '',			
				librarianName: '',
				librarianEmail: '',
				comments: '',
			}
		};

		function init() {
			$scope.formdata = IndividualInfoModel.formdata;
                }
	}
]);
