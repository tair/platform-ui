/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.consortium.manage.consortium').controller(
	/* Name */
	'ConsortiumManageConsortiumController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'ConsortiumManageConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, ConsortiumManageConsortiumModel) {
            init();
    	    
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
            $scope.enterInstitution = function(institution){
            	if(!(institution.state=='edit')){
            		$scope.setInstitution(institution);
            		$state.go("role.consortium.manage.institution");
            	}
            }
            $scope.right = function(institution) {
        		if (institution.state == "selected") {
        		    // this is the trash button at normal state
                            institution.state = "remove";
        		}
        		else if (institution.state == "edit") {
        		    // this is the "x" button at edit state
        		    if ($scope.editInstitution) {
//        			institution.name = $scope.editInstitution.name;
        			$scope.editInstitution = null;
        		    }
        		    institution.state = null;
        		} else if (consortium.state == "remove") {
        		    // this is the cancel button at remove state.
        		    consortium.state = null;
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
        		    };
        		    $http({
        			url: $scope.apiUri+'/parties/'+'?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+institution['partyId'],
        			data: data,
        			method: 'PUT',
        			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        		    }).success(function(data, status, headers, config){
        		    }).error(function(data, status, headers, config){
        			alert("edit institution request failed");
        		    });
        		    institution.state = null;
        		    $scope.editInstitution = null;
        		} else if (institution.state == "remove") {
        		    // this is the remove button at remove state
        		    $scope.removeConfirm(institution);
        		    institution.state = null;
        		}
        	    }
            $scope.addConfirm = function() {
		var data = {
		    name: $scope.newInstitution['name'],
		    partyType: 'organization',
		}
		$http({
                    url: $scope.apiUri+'/parties/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
                    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
			$scope.createdPartyId = data['partyId'];
			var data = {
					consortiumId : $cookies.credentialId,
					action : 'add'
			}
			$http({
	            url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.createdPartyId +'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
	            data:data,
	            method: 'PUT',
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config){
				}).error(function(data, status, headers, config){
				            alert("add institution request failed");
				});
		}).error(function(data, status, headers, config){
                    alert("create new institution request failed");
		});
                $scope.institutions.unshift(angular.copy($scope.newInstitution));
                $scope.newInstitution = null;
                $scope.adding = false;
            }

            $scope.removeConfirm = function(institution) {
                $http({
                    url: $scope.apiUri+'/parties/?partyId='+institution.partyId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
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

            $scope.reset = function() {
                $scope.adding = false;
                for (i=0; i<$scope.institutions.length; i++) {
                    $scope.institutions[i].state=null;
                }
            }

            function init() {
                $scope.setTitle(ConsortiumManageConsortiumModel.title);
    	        $scope.institutions = ConsortiumManageConsortiumModel.institutions;
    	        $scope.adding = false;
                $scope.searchTerm = null;
        	    $scope.sortings = ConsortiumManageConsortiumModel.sortings; //List of sorting objects which contain sortField and reverse attributes.
        	    $scope.reverse = $scope.sortings[0].reverse;
        	    $scope.predicate = $scope.sortings[0].predicate;
        	    $scope.editConsortium = null;
                $http({
                    // TODO: 2015-11-04: YM: It's unclear why does the next line use $cookies.credentialId in the URI path (as opposed to consortium.partyId).
                    url: $scope.apiUri+'/parties/affiliations/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                    method: 'GET'
                }).success(function(data, status, headers, config){
                    $scope.institutions = [];
                    for (var i=0; i < data.length; i++) {
                        entry = data[i];
                        entry['state'] = null;
                        $scope.institutions.push(entry);
                    }
                }).error(function() {
                    alert("Could not get consortium institutions");
                });
                $http({
                    url: $scope.apiUri+'/parties/?partyId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
                    method: 'GET'
                }).success(function(data, status, headers, config){
                    $scope.party = data[0];
                }).error(function() {
                    alert("Cannot get party information");
                });
    	    }
	}
]);
