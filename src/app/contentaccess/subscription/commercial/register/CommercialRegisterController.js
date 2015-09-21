/**
 * Subscription Controller
 */

angular.module('platform-ui.contentaccess.subscription.commercial.register').controller(
	/* Name */
	'CommercialRegisterController',

	/* Dependencies */
	[
	    '$http',
	    '$scope',
	    'CommercialRegisterModel',

	/* Controller Definition */
	function ($http, $scope, CommercialRegisterModel) {
	    init();
	    
	    $scope.reset= function() {
		$scope.formdata.firstName = null;
		$scope.formdata.lastName = null;
		$scope.formdata.email = null;
		$scope.formdata.institution = null;
		$scope.formdata.individualLicense = false;
		$scope.formdata.companyLicense = false;
		$scope.formdata.comments = 'Please send me information about a commercial subscription to '+$scope.partner.name+'.';
		$scope.formdata.partnerName = $scope.partner.name;
	    };

	    $scope.validate = function() {
		return (
		    $scope.formdata.firstName != null &&
			$scope.formdata.lastName != null &&
			$scope.formdata.email != null &&
			$scope.formdata.institution != null &&
			(
			    $scope.formdata.individualLicense ||
				$scope.formdata.companyLicense
			)
		);
	    };

	    $scope.validateAndSubmit = function() {
		$scope.errors = null;
		if ($scope.formdata.firstName == null) {
			$scope.errors = 'Please provide a firstname.';
			return false;
		}
		if ($scope.formdata.lastName == null ) {
			$scope.errors = 'Please provide a lastname.';
			return false;
		}
		if ($scope.formdata.email == null ) {
			$scope.errors = 'Please provide an email.';
			return false;
		}
		if ($scope.formdata.institution == null) {
			$scope.errors = 'Please provide an email.';
			return false;
		}
		if (!($scope.formdata.individualLicense || $scope.formdata.companyLicense)) {
			$scope.errors = 'Please select either individual or company license option.';
			return false;
		}
		return true;
	    };

            $scope.send = function() {
                $http({
                    url:$scope.apiUri+'/subscriptions/commercials/',
                    data:$scope.formdata,
                    method:'POST',
                }).success(function(data, status, headers, config) {
                }).error(function(data, status, headers, config) {
                });
                $scope.next("thankyou");
            }

	    function init() {
		$scope.formdata = CommercialRegisterModel.formdata;
		$scope.formdata.partnerName = $scope.partner.name;
		$scope.formdata.comments = 'Please send me information about a commercial subscription to '+$scope.partner.name+'.'
            }
	}
]);