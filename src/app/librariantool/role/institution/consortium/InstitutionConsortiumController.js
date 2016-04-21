/**
 * InstitutionConsortium Controller
 */

angular.module('platform-ui.librariantool.role.institution.consortium').controller(
	/* Name */
	'InstitutionConsortiumController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'InstitutionConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, InstitutionConsortiumModel) {
		$scope.setCurrentTab(InstitutionConsortiumModel.currentTab);
		$scope.consortiums = InstitutionConsortiumModel.consortiums;
	    $scope.adding = false;
	    $scope.newConsortium = InstitutionConsortiumModel.newConsortium;
	    $scope.removeConsortium = null;
	    $scope.editConsortium = null;
	    $scope.searchTerm = null;
	    $scope.sortings = InstitutionConsortiumModel.sortings; //List of sorting objects which contain predicate and reverse attributes.
	    $scope.reverse = $scope.sortings[0].reverse;
	    $scope.predicate = $scope.sortings[0].predicate;
	    
	  //initializing orderBy function
	    var orderBy = $filter('orderBy');
	    $scope.order = function(predicate, reverse) {
	      $scope.consortiums = orderBy($scope.consortiums, predicate, reverse);
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
            $scope.groupsMoveOver = function(consortium) {
                if (consortium.state == null && !$scope.adding) {
                    consortium.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(consortium) {
                if (consortium.state == "selected" && !$scope.adding) {
                    consortium.state = null;
                }
            }
            //enter consortium
    	    $scope.enterConsortium = function(consortium){
    	    	if(!(consortium.state=='edit')){
    	    		$state.go("role.consortium.institution", {consortiumId: consortium.partyId});
    				consortium.state = null;
    	    	}
    	    }
	    $scope.right = function(consortium) {
		if (consortium.state == "selected") {
		    // this is the trash button at normal state
                    consortium.state = "remove";
		}
		else if (consortium.state == "edit") {
		    // this is the "x" button at edit state
		    if ($scope.editConsortium) {
			consortium.name = $scope.editConsortium.name;
			$scope.editConsortium = null;
		    }
		    consortium.state = null;
		} else if (consortium.state == "remove") {
		    // this is the cancel button at remove state.
		    consortium.state = null;
		}
	    }
	    $scope.left = function(consortium) {
		if (consortium.state == "selected") {
		    // This is the edit button at normal state.
                    $scope.editConsortium = angular.copy(consortium);
                    consortium.state = "edit";
                    $scope.adding = false;
		}
		else if (consortium.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			name:consortium['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+consortium['partyId'],
			data: data,
			method: 'PUT',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).success(function(data, status, headers, config){
		    }).error(function(data, status, headers, config){
			alert("edit consortium request failed");
		    });
		    consortium.state = null;
		    $scope.editConsortium = null;
		} else if (consortium.state == "remove") {
		    // this is the remove button at remove state
		    $scope.removeConfirm(consortium);
		    consortium.state = null;
		}
	    }
	    $scope.addConfirm = function() {
	    
		var data = {
				parentPartyId:$scope.foundConsortium.partyId,
				childPartyId:$scope.institutionId,
		}
		$http({
					url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
					data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){			
		}).error(function(data, status, headers, config){
                    alert("add consortium request failed");
		});
		$scope.foundConsortium['state'] = null;
		$scope.consortiums.unshift(angular.copy($scope.foundConsortium));
		$scope.foundConsortium = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.consortiums.length; i++) {
		    $scope.consortiums[i].state=null;
		}
	    }
	    $scope.removeConfirm = function(consortium) {
                $http({
                    url: $scope.apiUri+'/parties/affiliations/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&parentPartyId='+consortium.partyId+'&childPartyId='+$scope.institutionId,
                    method: 'DELETE',
                }).success(function(data, status, headers, config){
                }).error(function(data, status, headers, config){
                    alert("delete consortium request failed");
                });
                var index = $scope.consortiums.indexOf(consortium);
                if (index > -1) {
                    $scope.consortiums.splice(index,1);
                }
		$scope.removeConsortium = null;
	    }
	    // init
        $http({
            url: $scope.apiUri+'/parties/affiliations?partyId='+$scope.institutionId +'&partyType=organization'+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
            method: 'GET',
        }).success(function(data, status, headers, config){
			$scope.consortiums = [];
			for (var i = 0; i < data.length; i++) {
			    entry = data[i];
			    $scope.consortiums.push({
				partyId:entry['partyId'],
				partyType:entry['partyType'],
				name:entry['name'],
				country:entry['country'],
				display:entry['display'],
				consortium:entry['consortium'],
				state:null
			    });
			}
        }).error(function(data, status, headers, config){
        	alert("consortium request failed");
        });
        $http({
            url: $scope.apiUri+'/parties/?partyType=consortium&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
            method: 'GET',
        }).success(function(data, status, headers, config){
			$scope.allConsortiums = [];
			for (var i = 0; i < data.length; i++) {
			    entry = data[i];
			    $scope.allConsortiums.push({
				partyId:entry['partyId'],
				partyType:entry['partyType'],
				name:entry['name'],
				country:entry['country'],
				display:entry['display'],
				consortium:entry['consortium'],
				state:null
			    });
			}
        }).error(function(data, status, headers, config){
        	alert("all consortium request failed");
        });
	}
]);
