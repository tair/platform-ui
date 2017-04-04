/**
 * PhoenixInstitution Controller
 */

angular.module('platform-ui.adminportal.role.phoenix.institution').controller(
	/* Name */
	'PhoenixInstitutionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'PhoenixInstitutionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, PhoenixInstitutionModel) {
//	    $scope.setTitle(PhoenixInstitutionModel.title);
		$scope.setCurrentTab(PhoenixInstitutionModel.currentTab);
	    $scope.institutions = PhoenixInstitutionModel.institutions;
	    $scope.allInstitutions = PhoenixInstitutionModel.allInstitutions;
	    $scope.countries = PhoenixInstitutionModel.countries;
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.SubAdding = false;
	    $scope.newInstitution = PhoenixInstitutionModel.newInstitution;
	    $scope.foundInstitution = PhoenixInstitutionModel.foundInstitution;
	    $scope.removeRange = null;
	    $scope.editRange = null;
	    $scope.searchTerm = null;
	    $scope.sortings = PhoenixInstitutionModel.sortings; //List of sorting objects which contain predicate and reverse attributes.
	    $scope.reverse = $scope.sortings[0].reverse;
	    $scope.predicate = $scope.sortings[0].predicate;
	    
	    //for subscription list
	    $scope.activeSubscriptions = PhoenixInstitutionModel.activeSubscriptions;
	    $scope.partners = PhoenixInstitutionModel.partners;
	    $scope.uiparams = PhoenixInstitutionModel.uiparams;
	    
	    $http({
            url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$scope.credentialId+'/',
            method: 'GET',
	    }).success(function(data, status, headers, config) {
	            $scope.activeSubscriptions = data;
	    }).error(function() {
	            alert("Cannot get active subscription information");
	    });
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
	    $scope.licenseButton = function(id) {
			return "Edit";
		    };
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
		    	institution.label = $scope.editRange.label;
		    	institution.name = $scope.editRange.name;
		    	institution.display = $scope.editRange.display;
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
		    label:institution['label'],
			name:institution['name'],
			partyId:institution['partyId'],
			display:institution['display'],
		    };
		    $http({
//				url: $scope.apiUri+'/parties/institutions/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+institution['partyId'],
				url: $scope.apiUri+'/parties/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+institution['partyId'],			
		    data: data,
			method: 'PUT',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).success(function(data, status, headers, config){
		    }).error(function(data, status, headers, config){
			alert("institution edit request failed");
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
		    if ($scope.newInstitution['username'] != null && $scope.newInstitution['password'] !=null) {
			// when user input contains username and password, create a credential for the party
		    	var data = {
					name: $scope.newInstitution['name'],
					partyType:'organization',
					username: $scope.newInstitution['username'],
					password: $scope.newInstitution['password'],
					partnerId: 'phoenix',
					email: $scope.newInstitution['email'],
					display: 'true',
			}
			$http({
						url: $scope.apiUri+'/parties/institutions/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
						data:data,
	                    method: 'POST',
			}).success(function(data, status, headers, config){

	        	$scope.createdInstitution = {
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
	        	
	        	bootbox.alert("New Institution created: username="+data[1].username+" partyId="+data[0].partyId+ " partyType="+data[0].partyType+
						" partnerId="+data[1].partnerId+" name="+data[0].name);
	        	
				$scope.createdInstitution['state'] = null;
				$scope.institutions.unshift(angular.copy($scope.createdInstitution));
				
			}).error(function(data, status, headers, config){
	            bootbox.alert("Failed to create institution"+((data['error'] == 'This email is already used by another institution.')?"! This email is already used by another institution.":"!"));
			});
		    } else if ($scope.newInstitution['username']==null && $scope.newInstitution['password'] == null){
		    //when user input doesn't contain username and password, only create party.	
		    	var data = {
						name: $scope.newInstitution['name'],
						partyType:'organization',
						display: 'true',
						country: $scope.newInstitution['country'].countryId,
				}
				$http({
							url: $scope.apiUri+'/parties/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
							data:data,
		                    method: 'POST',
				}).success(function(data, status, headers, config){
		        	$scope.createdInstitution = {
		                	country: data.country,
		                	display: data.display,
		                	name: data.name, //Party.name
		                	partyId: data.partyId,
		                	partyType: data.partyType,
		        	}
		        	
		        	bootbox.alert("New Institution created: partyId="+data.partyId+ " partyType="+data.partyType+
							" name="+data.name);
		        	
					$scope.createdInstitution['state'] = null;
					$scope.institutions.unshift(angular.copy($scope.createdInstitution));
					
				}).error(function(data, status, headers, config){
		            bootbox.alert("Failed to create institution"+((data['error'] == 'This email is already used by another institution.')?
		            		"! This email is already used by another institution.":"!"));
				});
		    } else if ($scope.newInstitution['username'] != null && $scope.newInstitution['password'] == null){
		    	bootbox.alert("Need password to create login for the institution.");
		    	return;
		    } else if ($scope.newInstitution['password'] != null && $scope.newInstitution['username'] == null){
		    	bootbox.alert("Need username to create login for the institution.");
		    	return;
		    }
			$scope.newInstitution = null;
			$scope.adding = false;
		    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.institutions.length; i++) {
		    $scope.institutions[i].state=null;
		}
	    }
//	    $scope.deleteAffiliation = function(institution){
//        	var data = {
//        			parentPartyId: $scope.consortiumId,
//        			childPartyId: institution.partyId,
//        	}
//        	$http({
//        		url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($scope.secretKey)+'&credentialId='+$scope.credentialId,
//        		data:data,
//	            method: 'DELETE',
//        	}).success(function(data, status, headers, config){
//            }).error(function(data, status, headers, config){
//                alert("institution remove request failed");
//            });
//        	var index = $scope.institutions.indexOf(institution);
//            if (index > -1) {
//                $scope.institutions.splice(index,1);
//            }
//        }
	    $scope.removeConfirm = function(institution) {
//	    	var data = {
//	    			partyId: institution.partyId,
//	    	}
                $http({
                    url: $scope.apiUri+'/parties/institutions/?credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey)+'&partyId='+institution['partyId'],
//                    data: data,
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
//	    		$state.go("role.institution", {'partyId' : institution.partyId, 'institutionName':institution.name});
	    		$state.go("role.institution.iprange", {institutionId: institution.partyId});
				institution.state = null;
	    	}
	    }
	    
	    // init
            $http({
            	url: $scope.apiUri+'/parties/?partyType=organization'+'&credentialId='+$scope.credentialId+'&secretKey='+encodeURIComponent($scope.secretKey),
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
			label:entry['label'],
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
		    	name:entry['name'],
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
		$http({
            url:$scope.apiUri+'/parties/countries/',
            method:'GET',
        }).success(function(data, status, headers, config) {
            $scope.countries = data.sort();
        });
	}
]);