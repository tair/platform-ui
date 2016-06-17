/**
 * PhoenixConsortium Controller
 */

angular.module('platform-ui.adminportal.role.phoenix.consortium').controller(
	/* Name */
	'PhoenixConsortiumController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'PhoenixConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, PhoenixConsortiumModel) {
		$scope.setCurrentTab(PhoenixConsortiumModel.currentTab);
		$scope.consortiums = PhoenixConsortiumModel.consortiums;
//	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.newConsortium = PhoenixConsortiumModel.newConsortium;
	    $scope.removeConsortium = null;
	    $scope.editConsortium = null;
	    $scope.searchTerm = null;
	    $scope.sortings = PhoenixConsortiumModel.sortings; //List of sorting objects which contain predicate and reverse attributes.
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
        // click on consortium    
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
			consortium.label = $scope.editConsortium.label;
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
		    	partyId:consortium['partyId'],
		    	label:consortium['label'],
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
	    if ($scope.newConsortium['username'] != null && $scope.newConsortium['password'] !=null) {
		// when user input contains username and password, create a credential for the party
	    	var data = {
				name: $scope.newConsortium['name'],
				partyType:'consortium',
				username: $scope.newConsortium['username'],
				password: $scope.newConsortium['password'],
				partnerId: 'phoenix',
				email: $scope.newConsortium['email'],
		}
		$http({
					url: $scope.apiUri+'/parties/consortiums/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
					data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
			//new code
           	//$scope.partyId = data[0]['partyId'];
        	$scope.createdConsortium = {
        			//0 Party
                	country: data[0].country,
                	display: data[0].display,
                	name: data[0].name, //Party.name
                	partyId: data[0].partyId,
                	partyType: data[0].partyType,
                	//1 Credential
                	email: data[1].email,
                	institution: data[1].institution,
                	partnerId: data[1].partnerId,
                	partyId: data[1].partyId,
                	userIdentifier: data[1].userIdentifier,
                	username: data[1].username,//Credential.username
        	}
			//$scope.createdConsortium = data;
        	
        	bootbox.alert("New Consortium created: username="+data[1].username+" partyId="+data[0].partyId+ " partyType="+data[0].partyType+
					" partnerId="+data[1].partnerId+" institution="+data[1].institution+" name="+data[0].name);
        	
			$scope.createdConsortium['state'] = null;
			$scope.consortiums.unshift(angular.copy($scope.createdConsortium));
			
		}).error(function(data, status, headers, config){
            bootbox.alert("Failed to create consortium"+((data['email'] == 'This field must be unique.')?"! The email is already in use.":"!"));
		});
	    } else if ($scope.newConsortium['username']==null && $scope.newConsortium['password'] == null){
	    //when user input doesn't contain username and password, only create party.	
	    	var data = {
					name: $scope.newConsortium['name'],
					partyType:'consortium',
			}
			$http({
						url: $scope.apiUri+'/parties/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
						data:data,
	                    method: 'POST',
			}).success(function(data, status, headers, config){
				//new code
	           	//$scope.partyId = data[0]['partyId'];
	        	$scope.createdConsortium = {
	                	country: data.country,
	                	display: data.display,
	                	name: data.name, //Party.name
	                	partyId: data.partyId,
	                	partyType: data.partyType,
	        	}
				//$scope.createdConsortium = data;
	        	
	        	bootbox.alert("New Consortium created: partyId="+data.partyId+ " partyType="+data.partyType+
						" name="+data.name);
	        	
				$scope.createdConsortium['state'] = null;
				$scope.consortiums.unshift(angular.copy($scope.createdConsortium));
				
			}).error(function(data, status, headers, config){
	            bootbox.alert("Failed to create consortium"+((data['email'] == 'This field must be unique.')?"! The email is already in use.":"!"));
			});
	    } else if ($scope.newConsortium['username'] != null && $scope.newConsortium['password'] == null){
	    	bootbox.alert("Need password to create login for the consortium.");
	    } else if ($scope.newConsortium['password'] != null && $scope.newConsortium['username'] == null){
	    	bootbox.alert("Need username to create login for the consortium.");
	    }
		$scope.newConsortium = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.consortiums.length; i++) {
		    $scope.consortiums[i].state=null;
		}
	    }
	    // remove consortium
	    $scope.removeConfirm = function(consortium) {
//                data = {
//            		partyId : consortium.partyId,
//                };
                $http({
                    url: $scope.apiUri+'/parties/consortiums/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+consortium['partyId'],
//                    data:data,
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
	    // get all consortia
            $http({
                url: $scope.apiUri+'/parties/?partyType=consortium'+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
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
			label:entry['label'],
			state:null
		    });
		}
            }).error(function(data, status, headers, config){
		alert("consortium request failed");
            });
	}
]);
