/**
 * ConsortiumInstitution Controller
 */

angular.module('platform-ui.adminportal.role.consortium.institution').controller(
	/* Name */
	'ConsortiumInstitutionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'ConsortiumInstitutionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, ConsortiumInstitutionModel) {
		$scope.setCurrentTab(ConsortiumInstitutionModel.currentTab);
	    $scope.institutions = ConsortiumInstitutionModel.institutions;
	    $scope.allInstitutions = ConsortiumInstitutionModel.allInstitutions;
	    $scope.adding = false;
	    $scope.newInstitution = ConsortiumInstitutionModel.newInstitution;
	    $scope.foundInstitution = ConsortiumInstitutionModel.foundInstitution;
	    $scope.removeInstitution = null;
	    $scope.editInstitution = null;
	    $scope.searchTerm = null;
	    $scope.sortings = ConsortiumInstitutionModel.sortings; //List of sorting objects which contain predicate and reverse attributes.
	    $scope.reverse = $scope.sortings[0].reverse;
	    $scope.predicate = $scope.sortings[0].predicate;
	    
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
            
        //right button for list item
	    $scope.right = function(institution) {
		if (institution.state == "selected") {
		    // this is the trash button at normal state
                    institution.state = "remove";
		}
		else if (institution.state == "edit") {
		    // this is the "x" button at edit state
//		    if ($scope.editInstitution) {
//			institution.name = $scope.editInstitution.name;
//			$scope.editInstitution = null;
//		    }
		    institution.state = null;
		} else if (institution.state == "remove") {
		    // this is the cancel button at remove state.
		    institution.state = null;
		}
	    }
	    $scope.left = function(institution) {
		if (institution.state == "selected") {
		    // This is the edit button at normal state.
                    $scope.editInstitution = angular.copy(institution);
                    institution.state = "edit";
                    $scope.adding = false;
		}
		else if (institution.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			name:institution['name'],
			partyId:institution['partyId'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/institutions/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+institution['partyId'],
			data: data,
			method: 'PUT',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).success(function(data, status, headers, config){
		    }).error(function(data, status, headers, config){
			alert("ip range request failed");
		    });
		    institution.state = null;
		    $scope.editInstitution = null;
		} else if (institution.state == "remove") {
		    // this is the remove button at remove state
		    $scope.deleteAffiliation(institution);
		    institution.state = null;
		}
	    }
	    $scope.addConfirm_obsolete = function() {
	    	for(var i = 0; i < $scope.allInstitutions.length; i++){
	    		if($scope.allInstitutions[i].name == $scope.newInstitution['name']){
	    				$scope.foundInstitution['partyId'] = $scope.allInstitutions[i].partyId;
	    				$scope.foundInstitution['name'] = $scope.allInstitutions[i].name;
	    				$scope.addExtInstitution();
	    				return;
	    		}
	    	}
	    	alert("Institution does not exist. Please contact info@phoenixbioinformatics.org.");
	    }
	    $scope.addConfirm = function() {
			var data = {
					parentPartyId : $scope.consortiumId,
					childPartyId : $scope.foundInstitution.partyId,
			}
	    	$http({
	    		url: $scope.apiUri+'/parties/affiliations/?' +'secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
	    		data:data,
	            method: 'POST',
				}).success(function(data, status, headers, config){
					$scope.foundInstitution['state'] = null;
					$scope.institutions.unshift($scope.foundInstitution);
					$scope.foundInstitution = null;
					$scope.adding = false;
				}).error(function(data, status, headers, config){
				            alert("Institution cannot be found. Please create institution before adding.");
				});
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.institutions.length; i++) {
		    $scope.institutions[i].state=null;
		}
	    }
	    $scope.deleteAffiliation = function(institution){
        	$http({
        		url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId+'&parentPartyId='+$scope.consortiumId+'&childPartyId='+institution.partyId,
	            method: 'DELETE',
        	}).success(function(data, status, headers, config){
            }).error(function(data, status, headers, config){
                alert("institution remove request failed");
            });
        	var index = $scope.institutions.indexOf(institution);
            if (index > -1) {
                $scope.institutions.splice(index,1);
            }
        }
	    $scope.enterInstitution = function(institution){
	    	if(!(institution.state=='edit')){
//	    		$state.go("role.institution", {'partyId' : institution.partyId, 'institutionName':institution.name});
	    		$state.go("role.institution.iprange", {institutionId: institution.partyId});
				institution.state = null;
	    	}
	    }
	    
	    // init
//	    $scope.consortiumId = $location.search()['consortiumId'];
//	    $scope.consortiumName = $location.search()['consortiumName'];
//	    $scope.consortium = $state.params.consortium;
//	    $scope.setTitle($scope.consortiumName);
            $http({
            	url: $scope.apiUri+'/parties/affiliations/?partyId='+$scope.consortiumId+'&partyType=consortium'+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
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
			state:null
		    });
		}
            }).error(function(data, status, headers, config){
		alert("institution request failed");
            });
        $http({
			url: $scope.apiUri+'/partners/'+'?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partners = data;
		}).error(function() {
			alert("Cannot get partner information");
		});
        $http({
        	url: $scope.apiUri+'/parties/?partyType=organization&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
            method: 'GET',
	        }).success(function(data, status, headers, config){
		$scope.allInstitutions = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.allInstitutions.push({
		    	partyId:entry['partyId'],
				partyType:entry['partyType'],
				name:entry['name'],
				country:entry['country'],
				display:entry['display'],
				consortiums:entry['consortiums'],
				state:null
		    });
		}
	        }).error(function(data, status, headers, config){
		alert("institutions request failed");
	        });
        $(function () {
            $('#createStart').datepicker();
        });
		$(function () {
            $('#createEnd').datepicker();
        });
	}
]);
