/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.adminportal.role.institution.iprange').controller(
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
//		if(!$scope.credentialId || !$scope.secretKey){
//			$state.go('ltlogin');
//		}	
		$scope.setCurrentTab(InstitutionIpRangeModel.currentTab);	
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
		    if (!IpValidator.IpRangeLimit(iprange['start'], iprange['end'])) {
		    	alert('IP range is too large, please enter a smaller IP range.  Please contact us at info@phoenixbioinformatics.org with any questions.');
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
			url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&ipRangeId='+iprange['ipRangeId'],
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
	    
	    //adding a new ip range
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
            if (!IpValidator.IpRangeLimit($scope.newRange['start'], $scope.newRange['end'])) {
            	alert('IP range is too large, please enter a smaller IP range.  Please contact us at info@phoenixbioinformatics.org with any questions.');
             	return;
            }
            
		    if ($scope.ipranges.length >= 1) {
				var currentStart = $scope.ipranges[0]['start'];
				var newStart = $scope.newRange['start'];
				var currentEnd = $scope.ipranges[0]['end'];
				var newEnd = $scope.newRange['end'];
				
				//1. Range already exists
				if (newStart === currentStart &&
						newEnd === currentEnd) {
					alert('Error:Range already exists');
					return;
				}
				
				//2. New Range is already covered by (is within) current range
				//currentStart<newStart && currentEnd>newEnd
				//comp(a,b) returns false when a>b ; comp(a,b) returns true when a<b
				var currentStartLESSnewStart = (IpValidator.CompareIpAddress(currentStart,newStart));
				var currentEndGREATERnewEnd = !(IpValidator.CompareIpAddress(currentEnd,newEnd));
				if (currentStartLESSnewStart && currentEndGREATERnewEnd) {
					alert('Error:New Range is already covered by (is within) Current Range');
					return;
				}
			
				//3. New Range overlaps Current Range on the left
				//newStart<currentStart && newEnd>currentStart && newEnd<currentEnd
				var newStartLESScurrentStart = (IpValidator.CompareIpAddress(newStart,currentStart));
				var newEndGREATERcurrentStart = !(IpValidator.CompareIpAddress(newEnd,currentStart));
				var newEndLESScurrentEnd = (IpValidator.CompareIpAddress(newEnd,currentEnd));
				if (newStartLESScurrentStart && newEndGREATERcurrentStart && newEndLESScurrentEnd){
					alert('Error:New Range overlaps Current Range on the left');
					return;
				}
				
				//4. New Range overlaps Current Range on the right
				//currentStart<newStart && newStart<currentEnd && currentEnd<newEnd
				if (IpValidator.CompareIpAddress(currentStart,newStart) &&
					IpValidator.CompareIpAddress(newStart,currentEnd) &&
					IpValidator.CompareIpAddress(currentEnd,newEnd)){
						alert('Error:New Range overlaps Current Range on the right');
						return;
				}
				
				//5. Current Range is within New Range
				//newStart<currentStart && currentStart<currentEnd && currentEnd<newEnd
				if (IpValidator.CompareIpAddress(newStart,currentStart) &&
						IpValidator.CompareIpAddress(currentStart,currentEnd) &&
						IpValidator.CompareIpAddress(currentEnd,newEnd)){
							alert('Error:Current Range is within New Range');
							return;
				}
		}
			 
		// instert/POST only if both start and end ips are valid
	    var startIpValid = validateIP($scope.newRange['start']);
	    var endIpValid = validateIP($scope.newRange['end']);
		if (startIpValid && endIpValid) { 
			var data = {
					start:$scope.newRange['start'],
					end:$scope.newRange['end'],
					partyId:$scope.institutionId,
					label:$scope.newRange['name'],
					}
			$http({
	            url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
			    data:data,
	            method: 'POST',
			}).success(function(data, status, headers, config){
				$scope.ipranges.unshift({
					ipRangeId:data['ipRangeId'],
					start:data['start'],
					end:data['end'],
					name:data['label'],
					partyId:data['partyId'],
					state:null
				    });
			}).error(function(data, status, headers, config){
	                    alert("add ip range request failed");
			});
		}
		else{
			alert("IP range "+$scope.newRange['start']+"-"+$scope.newRange['end']+" invalid and not added...")
		}
		$scope.newRange = null;
		$scope.adding = false;
	  }
	    
	  //validateIP
	   $scope.validateIP = function(ip) {
	   //function validateIP(ip) {
			 $http({
	                url: $scope.apiUri+'/ipranges/validateip/?ip='+ip,
	                method: 'GET',
	            }).success(function(data, status, headers, config){
	            	if (data["ip version"] === 4 || data["ip version"] === 6){
	            		debugMsg = 'IP is valid. version: '+ data["ip version"];
	    		    	console.log(debugMsg);
	    		    	return true;
	            	}
	            	else {
	            		debugMsg = 'IP is invalid. version: '+ data["ip version"];
	    		    	console.log(debugMsg);
	            		alert("IP invalid");
	            		return false;
	            	}
	            }).error(function(data, status, headers, config){
	            	alert("error getting /ipranges/validateip/?ip= for IP");
	            	return false;
	            });
		}
	    
		//reset function
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
                url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&ipRangeId='+data['ipRangeId'],
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
                url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.institutionId+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
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
