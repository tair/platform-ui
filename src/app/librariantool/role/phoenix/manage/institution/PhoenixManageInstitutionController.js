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
	'Dateformat',
	'PhoenixManageInstitutionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, Dateformat, PhoenixManageInstitutionModel) {
	    $scope.setTitle(PhoenixManageInstitutionModel.title);
	    $scope.institutions = PhoenixManageInstitutionModel.institutions;
	    $scope.allInstitutions = PhoenixManageInstitutionModel.allInstitutions;
	    $scope.addGroupShow = "hidden";
	    $scope.InsAdding = false;
	    $scope.SubAdding = false;
	    $scope.newInstitution = PhoenixManageInstitutionModel.newInstitution;
	    $scope.foundInstitution = PhoenixManageInstitutionModel.foundInstitution;
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
	    
	    $http({
            url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$cookies.credentialId+'/',
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
	    $scope.createConfirm = function(){
	    	var data = {				    
				    partnerId:$scope.newSubscription['partnerId'],
				    partyId:$scope.consortiumId,
				    startDate:Dateformat.formatDate($scope.newSubscription['start']),
				    endDate:Dateformat.formatDate($scope.newSubscription['end']),
				}
	    	console.log(JSON.stringify(data));
	    	$http({
		        url: $scope.apiUri+'/subscriptions/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
			    data:data,
		        method: 'POST',
			}).success(function(data, status, headers, config){
				$scope.createdSubscription = data;
				$scope.partners.unshift(angular.copy($scope.ceatedSubscription));
			}).error(function(data, status, headers, config){
		        alert("create subscription request failed");
			});
//		    	$scope.partners.unshift(angular.copy($scope.newSubscription));
			$scope.newSubscription = null;
			$scope.Subadding = false;
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
                if (institution.state == null && !$scope.InsAdding) {
                    institution.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(institution) {
                if (institution.state == "selected" && !$scope.InsAdding) {
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
                    $scope.InsAdding = false;
		}
		else if (institution.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			name:institution['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/?credentialId='+$cookies.partyId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+institution['partyId'],
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
		    $scope.deleteAffiliation(institution);
		    institution.state = null;
		}
	    }
	    $scope.addConfirm = function() {
	    	for(var i = 0; i < $scope.allInstitutions.length; i++){
	    		if($scope.allInstitutions[i].name == $scope.newInstitution['name']){
	    				$scope.foundInstitution['partyId'] = $scope.allInstitutions[i].partyId;
	    				$scope.foundInstitution['name'] = $scope.allInstitutions[i].name;
	    				$scope.addConfirm2();
	    				return;
	    		}
	    	}
	    	$scope.addConfirm1();
	    }
	    $scope.addConfirm2 = function() {
			$scope.foundInstitution['state'] = null;
			$scope.institutions.unshift(angular.copy($scope.foundInstitution));
			var data = {
					parentPartyId : $scope.consortiumId,
					chilPartyId : $scope.foundInstitution.partyId,
			}
	    	$http({
	    		url: $scope.apiUri+'/parties/affiliations/?' +'secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
	    		data:data,
	            method: 'POST',
				}).success(function(data, status, headers, config){
				}).error(function(data, status, headers, config){
				            alert("add existing institution request failed");
				});
			$scope.newInstitution = null;
			$scope.InsAdding = false;
	    }
	    $scope.addConfirm1 = function() {
		//alert("Nothing is added!");
		var data = {
	    	//Party table: partyId, partyType, display, name, countryId
			//Credential table: id, username, password, email, institution, partyId, partnerId, userIdentifier

			//TODO PW-82 this still does not work - values entered by user in popup is not being passed here.
			username:"andrvet_inst_ph_manage_inst", //temporarly hardcoded. $scope.newInstitution['username'],//Credential.username, required
			partnerId:"phoenix", //tair or phoenix //Credential.partnerId, required
			partyType:"organization", // or institution ? Party.partyType, required
			
			email:$scope.newInstitution['email'],//Credential.email, optional
	    	institution:$scope.newInstitution['institution'],//Credential.institution, optinal
	    	name:$scope.newInstitution['name'],//Party.name, optional
		}
		$http({
			url: $scope.apiUri+'/parties/institutions/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
			data:data,
            method: 'POST',
		}).success(function(data, status, headers, config){
			//new code
			//$scope.partyId = data[0]['partyId'];
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
        			" partnerId="+data[1].partnerId+" institution="+data[1].institution+" name="+data[0].name);
        	//old code 
			$scope.createdInstitution = data;
			$scope.createdInstitution['state'] = null;
			$scope.institutions.unshift(angular.copy($scope.createdInstitution));
			var data = {
					parentPartyId : $scope.consortiumId,
					childPartyId : 'add'
			}
			
			
			
		$http({
            url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
			data:data,
            method: 'POST',
			}).success(function(data, status, headers, config){
			}).error(function(data, status, headers, config){
			            alert("add new institution request failed");
			});
		}).error(function(data, status, headers, config){
            alert("new institution request failed");
		});		            
			$scope.newInstitution = null;
			$scope.InsAdding = false;
	    }
	    $scope.reset = function() {
		$scope.InsAdding = false;
		for (i=0; i<$scope.institutions.length; i++) {
		    $scope.institutions[i].state=null;
		}
	    }
	    $scope.deleteAffiliation = function(institution){
        	var data = {
        			parentPartyId: $scope.consortiumId,
        			childPartyId: institution.partyId,
        	}
        	$http({
        		url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
        		data:data,
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
	    $scope.removeConfirm = function(institution) {
                $http({
                    url: $scope.apiUri+'/parties/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+institution['partyId'],
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
            	url: $scope.apiUri+'/parties/affiliations/?partyId='+$scope.consortiumId+'&partyType=consortium'+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
			url: $scope.apiUri+'/partners/'+'?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partners = data;
		}).error(function() {
			alert("Cannot get partner information");
		});
        $http({
        	url: $scope.apiUri+'/parties/?partyType=organization&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
	}
]);
