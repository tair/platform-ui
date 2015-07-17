/**
 * Subscription Controller
 */

angular.module('platform-ui.subscription.institution.register').controller(
	/* Name */
        'InstitutionRegisterController',

	/* Dependencies */
	[
	    '$http',
	'$scope',
	'InstitutionRegisterModel',

	/* Controller Definition */
	function ($http, $scope, InstitutionRegisterModel) {
		init();

		$scope.reset = function() {
			$scope.formdata = {
				firstName: null,
				lastName: null,
				email: null,
				institution: null,			
				librarianName: null,
				librarianEmail: null,
			    comments:$scope.partner.name+' is essential to my work. I would like my library to consider a subscription.',
			    partnerName: $scope.partner.name,
			}
		};

		$scope.validate = function() {
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

		$scope.validateAndSubmit = function() {
			$scope.errors = null;
			if ($scope.formdata.firstName == null) {
				$scope.errors = 'Please provide a firstname.';
				return false;
			}
			if ($scope.formdata.lastName == null) {
				$scope.errors = 'Please provide a lastname.';
				return false;
			}
			if ($scope.formdata.email == null) {
				$scope.errors = 'Please provide an email.';
				return false;
			}
			if ($scope.formdata.institution == null) {
				$scope.errors = 'Please provide an institution.';
				return false;
			}
			return true;
		};

	    $scope.send = function() {
                $http({
                    url:$scope.apiUri+'/subscriptions/institutions/',
		    data:$scope.formdata,
                    method:'POST',
                }).success(function(data, status, headers, config) {
                }).error(function(data, status, headers, config) {
                });
		$scope.next('thankyou');
	    }

	    function init() {
		$scope.formdata = InstitutionRegisterModel.formdata;
		$scope.formdata.partnerName = $scope.partner.name;
		$scope.formdata.comments = $scope.partner.name+' is essential to my work. I would like my library to consider a subscription.'
            }
	}
]);
