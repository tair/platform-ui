/**
 * Term Controller
 */

angular.module('platform-ui.contentaccess.subscription.individual.term').controller(
    /* Name */
    'TermController',
    
    /* Dependencies */
    [
	'$http',
	'$scope',
	'$rootScope',
	'$stateParams',
	'TermModel',
	
	/* Controller Definition */
	function ($http, $scope, $rootScope, $stateParams, TermModel) {
	    init();
	    
	    $scope.reset = function() {
                $scope.info.numOfSubscribers = 1;
                $scope.userbool = false;
                $scope.termsbool = false;
	    };
	    
	    $scope.validate = function() {
		return (
			$scope.selectedSubscription.subscriptionTermId != null
			&&
			$scope.info.numOfSubscribers > 0
			&&
			$scope.userbool == true 
			&&
			$scope.termsbool == true
		);
	    };

	    $scope.validateAndSubmit = function() {
		$scope.errors = null;
		if ($scope.selectedSubscription.subscriptionTermId == null) {
			$scope.errors = 'Please select a subscription term.';
			return false;
		}
		if ($scope.info.numOfSubscribers <= 0) {
			$scope.errors = 'Number of licenses must be a poitive integer.';
			return false;
		}
		if ($scope.userbool == false) {
			$scope.errors = 'Please confirm that you are an academic individual.';
			return false;
		}
		if ($scope.termsbool == false) {
			$scope.errors = 'Please accept the terms of use.';
			return false;
		}
		return true;
	    };
	    
	    function init() {
	    	var debugMsg='';
	    	//1. inialize $scope.partnerId with $stateParams.partnerId if the $scope.partnerId is NULL
	    	if($scope.partnerId == null){
		    	$scope.partnerId = $stateParams.partnerId;
		    	//vet PW-251
		    	debugMsg='1.1 $scope.partnerId NULL. it is initialised with $stateParams.partnerId which is '+$stateParams.partnerId;
		    	console.log(debugMsg);
		    	//alert is not good to show for users but very useful to show for developers/debugging
				bootbox.alert(debugMsg);//TODO comment out for release
		    } else {
		    	debugMsg = '1.2 $scope.partnerId is '+ $scope.partnerId+ ' and $stateParams.partnerId is'+ $stateParams.partnerId;
		    	console.log(debugMsg);
		    	bootbox.alert(debugMsg);//TODO comment out for release
		    }
	    	
	    	//2. get partner details
		    if($scope.partner == null){
		    	$http({
				    url:$scope.apiUri+'/partners/?partnerId='+$scope.partnerId,
				    method:'GET',
				}).success(function(data, status, headers, config) {
				    $scope.partner = data[0];
			    	//vet PW-251
				    debugMsg = '2.1. OK $scope.partner is '+$scope.partner;
			    	console.log(debugMsg);
			    	bootbox.alert(debugMsg);
				}).error(function(data, status, headers, config) {
					debugMsg = '2.2. ERROR $scope.partner is '+$scope.partner;
			    	console.log(debugMsg);
			    	bootbox.alert(debugMsg);//TODO comment out for release
                });
		    } else {
		    	debugMsg = '2.3. $scope.partner is '+$scope.partner;
		    	console.log(debugMsg);
		    	bootbox.alert(debugMsg);//TODO comment out for release
		    }
		    //3. initialise with default values
		    	//PW-215 that's the place where wrong default values are assigned
		        //commenting out the assignment
                //$scope.subscriptions = TermModel.subscriptions;
                $scope.userbool = TermModel.userbool;
                $scope.termsbool = TermModel.termsbool;
            
            //4. rewrite the default values with correct actual values    
                $http({
                	url:$scope.apiUri+'/partners/terms/?partnerId='+$scope.partnerId,
                	method:'GET',
                }).success(function(data, status, headers, config) {
                	$scope.subscriptions = data; //vet PW-215 here the default values are being rewritten with correct values
                	debugMsg = '4.1. OK $scope.subscriptions is '+$scope.subscriptions;
    		    	console.log(debugMsg);
    		    	bootbox.alert(debugMsg);//TODO comment out for release
                }).error(function(data, status, headers, config) {
                	debugMsg = '4.1. ERROR $scope.subscriptions is '+$scope.subscriptions;
    		    	console.log(debugMsg);
    		    	bootbox.alert(debugMsg);//TODO comment out for release
                });
	    };
	}
    ]);
