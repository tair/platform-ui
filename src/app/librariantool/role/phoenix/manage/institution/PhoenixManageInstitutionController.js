/**
 * PhoenixInstitution Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.manage.institution').controller(
	/* Name */
	'PhoenixManageInstitutionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'PhoenixManageInstitutionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, PhoenixManageInstitutionModel) {
	    $scope.setTitle(PhoenixManageInstitutionModel.title);
	    $scope.institutions = PhoenixManageInstitutionModel.institutions;
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.newRange = PhoenixManageInstitutionModel.newRange;
	    $scope.removeRange = null;
	    $scope.editRange = null;
	    $scope.searchTerm = null;
	    $scope.sortings = PhoenixManageInstitutionModel.sortings; //List of sorting objects which contain predicate and reverse attributes.
	    $scope.reverse = $scope.sortings[0].reverse;
	    $scope.predicate = $scope.sortings[0].predicate;
	    
	    //for subscription list
	    $scope.activeSubscriptions = PhoenixManageInstitutionModel.activeSubscriptions;
	    $scope.partners = PhoenixManageInstitutionModel.partners;
	    $scope.uiparams = PhoenixManageInstitutionModel.uiparams;
	    
	    $scope.getExpDate = function(id) {
			if (id in $scope.activeSubscriptions) {
				return $scope.activeSubscriptions[id].endDate;
			}
			return "Unlicensed";
		    };
		    
	    $scope.listPartners = function(partners) {
			var ret = [];
			for (var i=0; i<partners.length; i++) {
			    if (partners[i].partnerId!="phoenix") {
				ret.push(partners[i]);
			    }
			}
			console.log(ret);
			return ret;
		    }
	    
	  //initializing orderBy function
	    var orderBy = $filter('orderBy');
	    $scope.order = function(predicate, reverse) {
	      $scope.institutions = orderBy($scope.institutions, predicate, reverse);
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
            $scope.groupsMoveOver = function(institution) {
                if (institution.state == null && !$scope.adding) {
                    institution.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(institution) {
                if (institution.state == "selected" && !$scope.adding) {
                    institution.state = null;
                }
            }
	    $scope.right = function(institution) {
		if (institution.state == "selected") {
		    // this is the trash button at normal state
                    institution.state = "remove";
		}
		else if (institution.state == "edit") {
		    // this is the "x" button at edit state
		    if ($scope.editRange) {
			institution.name = $scope.editRange.name;
			institution.start = $scope.editRange.start;
			institution.end = $scope.editRange.end;
			$scope.editRange = null;
		    }
		    institution.state = null;
		} else if (institution.state == "remove") {
		    // this is the cancel button at remove state.
		    institution.state = null;
		}
	    }
	    $scope.left = function(institution) {
		if (institution.state == "selected") {
		    // This is the edit button at normal state.
                    $scope.editRange = angular.copy(institution);
                    institution.state = "edit";
                    $scope.adding = false;
		}
		else if (institution.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			name:institution['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/?credentialId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key)+'&partyId='+institution['partyId'],
			data: data,
			method: 'PUT',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).success(function(data, status, headers, config){
		    }).error(function(data, status, headers, config){
			alert("ip range request failed");
		    });
		    institution.state = null;
		    $scope.editRange = null;
		} else if (institution.state == "remove") {
		    // this is the remove button at remove state
		    $scope.removeConfirm(institution);
		    institution.state = null;
		}
	    }
	    $scope.addConfirm = function() {
		//alert("Nothing is added!");
		var data = {
		    start:$scope.newRange['start'],
		    end:$scope.newRange['end'],
		    partyId:$cookies.partyId,
		    label:$scope.newRange['name'],
		}
		$http({
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
		    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){
                    alert("institution request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.institutions.length; i++) {
		    $scope.institutions[i].state=null;
		}
	    }
	    $scope.removeConfirm = function(institution) {
                $http({
                    url: $scope.apiUri+'/parties/?credentialId='+$cookies.credentialId+'&secret_key='+encodeURIComponent($cookies.secret_key)+'&partyId='+institution['partyId'],
                    method: 'DELETE',
                }).success(function(data, status, headers, config){
                }).error(function(data, status, headers, config){
                    alert("institution request failed");
                });
                var index = $scope.institutions.indexOf(institution);
                if (index > -1) {
                    $scope.institutions.splice(index,1);
                }
		$scope.removeRange = null;
	    }
	    $scope.enterInstitution = function(institution){
	    	if(!(institution.state=='edit')){
			    $state.currentTab = {label:"INSTITUTION", state:"role.phoenix.institution"};
		    	$state.go("role.phoenix.institution", {'partyId' : institution.partyId, 'institutionName':institution.name});
	    	}
	    }
	    $scope.back = function(){
	    	$state.go("role.phoenix.manage.consortium");
	    }
	    // init
	    $scope.consortiumId = $location.search()['consortiumId'];
	    $scope.consortiumName = $location.search()['consortiumName'];
	    $scope.setTitle($scope.consortiumName);
            $http({
            	url: $scope.apiUri+'/parties/?consortium='+$scope.consortiumId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
		$scope.institutions = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.institutions.push({
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
		alert("institution request failed");
            });
	}
]);
