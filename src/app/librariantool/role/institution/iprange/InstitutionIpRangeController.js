/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.institution.iprange').controller(
	/* Name */
	'InstitutionIpRangeController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$window',
	'$location',
	'$state',
	'$filter',
	'Title',
	'InstitutionIpRangeModel',
	'IpValidator',

	/* Controller Definition */
	function ($scope, $http, $cookies, $window, $location, $state, $filter, Title, InstitutionIpRangeModel, IpValidator) {
	    $scope.setTitle(InstitutionIpRangeModel.title);
	    $scope.ipranges = InstitutionIpRangeModel.ipranges;
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.newRange = InstitutionIpRangeModel.newRange;
	    $scope.removeRange = null;
	    $scope.editRange = null;
	    $scope.searchTerm = null;
	    $scope.sortings = InstitutionIpRangeModel.sortings; //List of sorting objects which contain sortField and reverse attributes.
	    $scope.reverse = $scope.sortings[0].reverse;
	    $scope.predicate = $scope.sortings[0].predicate;
	    $scope.currentTab = InstitutionIpRangeModel.currentTab;
	    //load credential
	    if($cookies.credentialId!=null){
			$scope.credentialId = $cookies.credentialId;
		}else if($window.sessionStorage.credentialId!=null){
			$scope.credentialId = $window.sessionStorage.credentialId;
		}
		if($cookies.secretKey!=null){
			$scope.secretKey = $cookies.secretKey;
		}else if($window.sessionStorage.secretKey!=null){
			$scope.secretKey = $window.sessionStorage.secretKey;
		}
	    //initializing orderBy function
	    var orderBy = $filter('orderBy');
	    $scope.order = function(predicate, reverse) {
	      $scope.ipranges = orderBy($scope.ipranges, predicate, reverse);
	    };
	    $scope.order($scope.predicate,$scope.reverse);
	    
	    //Sorting function for ng-click
	    $scope.sortByField = function(sorting) {
	    	if ($scope.predicate!=sorting.predicate){
	    	    $scope.predicate=sorting.predicate;
	    	    $scope.reverse=sorting.reverse;
	    	}else{
	    		sorting.reverse = !sorting.reverse;
	    		$scope.reverse=sorting.reverse;
	    	}
	    	$scope.order($scope.predicate,$scope.reverse);
	    }

	    // CSS Logics as response to state changes.
	    $scope.groupsListStartCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-start-edit";
		}
		return "lt-ip-groups-list-start";
	    }
	    $scope.groupsListEndCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-end-edit";
		}
		return "lt-ip-groups-list-end";
	    }


	    // Events that change states
            $scope.groupsMoveOver = function(iprange) {
                if (iprange.state == null && !$scope.adding) {
                    iprange.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(iprange) {
                if (iprange.state == "selected" && !$scope.adding) {
                    iprange.state = null;
                }
            }
	    $scope.right = function(iprange) {
		if (iprange.state == "selected") {
		    // this is the trash button at normal state
                    iprange.state = "remove";
		}
		else if (iprange.state == "edit") {
		    // this is the "x" button at edit state
		    if ($scope.editRange) {
			iprange.name = $scope.editRange.name;
			iprange.start = $scope.editRange.start;
			iprange.end = $scope.editRange.end;
			$scope.editRange = null;
		    }
		    iprange.state = null;
		} else if (iprange.state == "remove") {
		    // this is the cancel button at remove state.
		    iprange.state = null;
		}
	    }
	    $scope.left = function(iprange) {
		if (iprange.state == "selected") {
		    // This is the edit button at normal state.
                    $scope.editRange = angular.copy(iprange);
                    iprange.state = "edit";
                    $scope.adding = false;
		}
		else if (iprange.state == "edit") {
		    // This is the confirm button at edit state
			if(!IpValidator.ValidateIpAddress(iprange['start'])){
		    	alert("Invalid starting IP");
		    	return;
		    };
		    if(!IpValidator.ValidateIpAddress(iprange['end'])){
		    	alert("Invalid ending IP");
		    	return;
		    };
		    if(IpValidator.ValidateIpAddress(iprange['start'])!=IpValidator.ValidateIpAddress(iprange['end'])){
		    	alert("Invalid IP address");
		    	return;
		    }
		    if(!IpValidator.CompareIpAddress(iprange['start'],iprange['end'])){
		    	alert("Starting IP cannot be greater than ending IP");
		    	return;
		    }
			
		    data = {
			ipRangeId:iprange['ipRangeId'],
			start:iprange['start'],
			end:iprange['end'],
			partyId:iprange['partyId'],
			label:iprange['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&ipRangeId='+iprange['ipRangeId'],
			data: data,
			method: 'PUT',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).success(function(data, status, headers, config){
		    }).error(function(data, status, headers, config){
			alert("ip range request failed");
		    });
		    iprange.state = null;
		    $scope.editRange = null;
		} else if (iprange.state == "remove") {
		    // this is the remove button at remove state
		    $scope.removeConfirm(iprange);
		    iprange.state = null;
		}
	    }
	    $scope.addConfirm = function() {
	    	if(!IpValidator.ValidateIpAddress($scope.newRange['start'])){
		    	alert("Invalid starting IP");
		    	return;
		    };
		    if(!IpValidator.ValidateIpAddress($scope.newRange['end'])){
		    	alert("Invalid ending IP");
		    	return;
		    };
		    if(IpValidator.ValidateIpAddress($scope.newRange['start'])!=IpValidator.ValidateIpAddress($scope.newRange['end'])){
		    	alert("Invalid IP address");
		    	return;
		    }
		    if(!IpValidator.CompareIpAddress($scope.newRange['start'],$scope.newRange['end'])){
		    	alert("Starting IP cannot be greater than ending IP");
		    	return;
		    }
		//alert("Nothing is added!");
		var data = {
		    start:$scope.newRange['start'],
		    end:$scope.newRange['end'],
		    partyId:$scope.credentialId,
		    label:$scope.newRange['name'],
		}
		$http({
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
		    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){
                    alert("add ip range request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.ipranges.length; i++) {
		    $scope.ipranges[i].state=null;
		}
	    }
	    $scope.removeConfirm = function(iprange) {
                data = {
                    ipRangeId:iprange['ipRangeId'],
                    start:iprange['start'],
                    end:iprange['end'],
                    partyId:iprange['partyId'],
                    label:iprange['name'],
                };
                $http({
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&ipRangeId='+data['ipRangeId'],
                    data:data,
                    method: 'DELETE',
                }).success(function(data, status, headers, config){
                }).error(function(data, status, headers, config){
                    alert("ip range request failed");
                });
                var index = $scope.ipranges.indexOf(iprange);
                if (index > -1) {
                    $scope.ipranges.splice(index,1);
                }
		$scope.removeRange = null;
	    }
	    
	    // init
            $http({
                url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.credentialId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
		$scope.ipranges = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.ipranges.push({
			ipRangeId:entry['ipRangeId'],
			start:entry['start'],
			end:entry['end'],
			name:entry['label'],
			partyId:entry['partyId'],
			state:null
		    });
		}
            }).error(function(data, status, headers, config){
		alert("ip range request failed");
            });
	}
]);
