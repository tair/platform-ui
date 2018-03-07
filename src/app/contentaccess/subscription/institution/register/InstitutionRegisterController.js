/**
 * Subscription Controller
 */

angular.module('platform-ui.contentaccess.subscription.institution.register').controller(
	/* Name */
        'InstitutionRegisterController',

	/* Dependencies */
	[
	    '$http',
	'$scope',
	'$stateParams',
    '$location',
	'InstitutionRegisterModel',

	/* Controller Definition */
	function ($http, $scope, $stateParams, $location, InstitutionRegisterModel) {
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
            // sendToAPI();
            sendToSalesForceCampaign();
            // $scope.next('thankyou');
	    }

	    function init() {

	    if($scope.partnerId == null){
	    	$scope.partnerId = $stateParams.partnerId;
	    }
    	$http({
		    url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
		    method:'GET',
		}).success(function(data, status, headers, config) {
		    $scope.partner = data[0];
		    $scope.formdata.partnerName = $scope.partner.name;
			$scope.formdata.comments = $scope.partner.name+' is essential to my work. I would like my library to consider a subscription.'
		});
		$scope.formdata = InstitutionRegisterModel.formdata;
		    }

        // sends form data to API; API code will send an email to subscriptions@phoenixbioinformatics.org
        function sendToAPI() {
            $http({
                url:$scope.apiUri+'/subscriptions/institutions/',
                data:$scope.formdata,
                method:'POST',
            }).success(function(data, status, headers, config) {
            }).error(function(data, status, headers, config) {
            });
        }

        function sendToSalesForceCampaign() {
            var urlComponents = $location.absUrl().split('?');
            var nextPage = urlComponents[0] + '/thankyou';
            if (urlComponents[1] != undefined) nextPage += ('?' + urlComponents[1]);
            var formData = {
                retURL: nextPage,
                oid: '00D29000000E57I',
                Campaign_ID: getCampaignId(),
                member_status: 'Responded',
                first_name: $scope.formdata.firstName,
                last_name: $scope.formdata.lastName,
                email: $scope.formdata.email,
                company: $scope.formdata.institution,          
                '00N1J00000G2kmS': $scope.formdata.librarianName, // Librarian Name
                '00N1J00000G2kmN': $scope.formdata.librarianEmail, // Librarian Email
                '00N1J00000G2kmX': $scope.formdata.comments // Comments
            }
            var form = document.createElement("form");
            form.method = "POST";
            form.action = "https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

            for (var field in formData) {
                if (formData.hasOwnProperty(field)) {
                    var fieldElement = document.createElement("input");  
                    fieldElement.name=field;
                    fieldElement.value=formData[field];
                    fieldElement.setAttribute("type", "hidden");
                    form.appendChild(fieldElement);
                }
            }
            document.body.appendChild(form);
            form.submit();
            // $http({
            //     url: "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8",
            //     data: formData,
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "text/html; charset=UTF-8"
            //     }
            // }).success(function(data, status, headers, config) {
            // }).error(function(data, status, headers, config) {
            // });
        }

        function getCampaignId() {
            switch ($scope.partnerId) {
                case 'tair':
                    return '70129000000INSEAA4';
                case 'biocyc':
                    return '70129000000INS9AAO';
                default:
                    return null;
            }
        }
	}
]);
