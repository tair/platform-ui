/**
 * PhoenixIpRange Controller
 */
angular.module('platform-ui.librariantool.role.phoenix.institution').controller(
	/* Name */
	'PhoenixInstitutionController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'Dateformat',
	'PhoenixInstitutionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, Dateformat, PhoenixInstitutionModel) {
		$scope.partyId = $location.search()['partyId'];
		init();
		$scope.setTitle(PhoenixInstitutionModel.title);
		$scope.institutionName = $location.search()['institutionName'];
		if ($scope.institutionName != null){
			$scope.setTitle($scope.institutionName);
		}
	    $scope.ipranges = PhoenixInstitutionModel.ipranges;
	    $scope.institutions = PhoenixInstitutionModel.institutions;
	    $scope.institution = null;
	    //consortia initialization
	    $scope.consortiums = PhoenixInstitutionModel.consortiums;
	    $scope.newConsortium = PhoenixInstitutionModel.newConsortium;
	    $scope.foundConsortium = PhoenixInstitutionModel.foundConsortium;
	    $scope.addGroupShow = "hidden";
	    //new ip range
	    $scope.newRange = PhoenixInstitutionModel.newRange;
	    $scope.removeRange = null;
	    $scope.editRange = null;
	    //subscription
	    $scope.newSubscription = PhoenixInstitutionModel.newSubscription;
	    $scope.consSubList = PhoenixInstitutionModel.consSubList;
	    //new institution
	    $scope.newInstitution = PhoenixInstitutionModel.newInstitution;
	    //searching and sorting
	    $scope.searchTerm = null;
	    $scope.sortings = PhoenixInstitutionModel.sortings; //List of sorting objects which contain sortField and reverse attributes.
	    $scope.reverseField = $scope.sortings[0].reverse;
	    $scope.sortField = $scope.sortings[0].sortField;
	    //adding booleans for left panel buttons
	    $scope.ipAdding = false;
	    $scope.subAdding = false;
	    $scope.insAdding = false;
	    $scope.consEdit = false;
	    
	  //add institution    
	    $scope.addInstitutionBox = function(){
	    	bootbox.dialog({
	    		  title: "Create a new Institution",
	    		  message: "<div ng-controller='PhoenixInstitutionController' style='padding:0px'>" +
	    		  		"<input ng-class='groupsListLabelCss(true)' type='text' ng-model='newInstitution.name'" +
	    		  		"placeholder='Input instituion name'></input></div>",
	    		  buttons: {
	                    success: {
	                        label: "Create",
	                        className: "btn-success",
	                        callback: function(){
	                            $scope.createInstitution();
	                        }
	                    }
	                }
	    		});
	    }
	    $scope.createInstitution = function(){
	    	data = {
                    name:$scope.newInstitution['name'],
                    partyType:$scope.newInstitution['partyType']
                };
                $http({
                    url: $scope.apiUri+'/parties/?secretKey='+encodeURIComponent($cookies.secret_key)+'&credentialId='+$cookies.credentialId,
                    data:data,
                    method: 'POST',
                }).success(function(data, status, headers, config){
                	$scope.partyId = data['partyId'];
                	$scope.institution = {
                			partyId:data['partyId'],
                			name:data['name']
                	}
                	alert("created: "+data['name']);
                }).error(function(data, status, headers, config){
                    alert("institution creation request failed");
                });
	    }
	    
	  //for institution searchbox
	    $scope.searchstate = 'selected';
	    
	  //for subscription list
	    $scope.activeSubscriptions = PhoenixInstitutionModel.activeSubscriptions;
	    $scope.consortiumSubscriptions = PhoenixInstitutionModel.consortiumSubscriptions;
	    $scope.partners = PhoenixInstitutionModel.partners;
	    $scope.uiparams = PhoenixInstitutionModel.uiparams;
	    
	    $scope.getExpDate = function(id) {
			if (id in $scope.activeSubscriptions) {
				return $scope.activeSubscriptions[id].endDate;
			}
			return "Unlicensed";
		    };

	    $scope.licenseButton = function(id) {
			return "Edit";
		    };
	    
	    //Sorting function for ng-click
	    $scope.sortByField = function(sorting) {
	    	if ($scope.sortField!=sorting.sortField){
	    	    $scope.sortField=sorting.sortField;
	    	    $scope.reverseField=sorting.reverse;
	    	}else{
	    		sorting.reverse = !sorting.reverse;
	    		$scope.reverseField=sorting.reverse;
	    	}
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
                if (iprange.state == null && !$scope.ipAdding) {
                    iprange.state = "selected";
                }
            }
            $scope.groupsMoveOut = function(iprange) {
                if (iprange.state == "selected" && !$scope.ipAdding) {
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
		    data = {
			ipRangeId:iprange['ipRangeId'],
			start:iprange['start'],
			end:iprange['end'],
			partyId:iprange['partyId'],
			label:iprange['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secretKey='+encodeURIComponent($cookies.secret_key)+'&ipRangeId='+iprange['ipRangeId'],
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
		var data = {
		    start:$scope.newRange['start'],
		    end:$scope.newRange['end'],
		    partyId:$scope.institution.partyId,
		    label:$scope.newRange['name'],
		}
		$http({
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.institution.partyId+'&secretKey='+encodeURIComponent($cookies.secret_key)+'&credentialId='+$cookies.credentialId,
                    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){
                    alert("ip range request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
		$scope.ipAdding = false;
	    }
	    $scope.reset = function(adding) {
		adding = false;
		for (i=0; i<$scope.ipranges.length; i++) {
		    $scope.ipranges[i].state=null;
		}
	    }
	    function reset(adding) {
			adding = false;
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
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secretKey'+encodeURIComponent($cookies.secret_key)+'&ipRangeId='+data['ipRangeId'],
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
	    //create subscription
	    $scope.createSubConfirm = function(){
	    	var data = {				    
				    partnerId:$scope.newSubscription['partnerId'],
				    partyId:$scope.partyId,
				    startDate:Dateformat.formatDate($scope.newSubscription['start']),
				    endDate:Dateformat.formatDate($scope.newSubscription['end']),
				}
	    	console.log(JSON.stringify(data));
	    	$http({
		        url: $scope.apiUri+'/subscriptions/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
			    data:data,
		        method: 'POST',
			}).success(function(data, status, headers, config){
			}).error(function(data, status, headers, config){
		        alert("create subscription request failed");
			});
			$scope.newSubscription = null;
			$scope.subAdding = false;
	    }
	    //get subscription end date
	    $http({
			url: $scope.apiUri+'/partners/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partners = data;
		}).error(function() {
			alert("Cannot get partner information");
		});
	    $scope.getSubscriptionEndDate = function(){	    
	    if($scope.partyId != null){
		$http({
			url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$scope.partyId+'/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.activeSubscriptions = data;
		}).error(function() {
			alert("Cannot get active subscription information");
		});
	    }
	    }
	  //get consortium subscription list	    
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
	    $scope.listedPartners = $scope.listPartners($scope.partners);
	    $scope.consSubList = [];
	    for(var i = 0; i < $scope.consortiums.length; i++){
	    	$http({
				url: $scope.apiUri+'/subscriptions/activesubscriptions/'+$scope.consortiums[i].partyId+'/',
				method: 'GET',
			}).success(function(data, status, headers, config) {
				$scope.consortiumSubscriptions = data;
				for(var j = 0; j < $scope.listedPartners.length; j++){
					if ($scope.listedPartners[j].partnerId in $scope.consortiumSubscriptions) {
						var endDate =  $scope.consortiumSubscriptions[$scope.listedPartners[j].partnerId].endDate;
					}else{
						var endDate =  "Unlicensed";
					}
		    		$scope.consSubList.push({
		    			"consortium": $scope.consortiums[i],
	            	    "endDate": endDate,
	            	    "partnerId": $scope.listedPartners[j].partnerId,
	            	    "name": $scope.listedPartners[j].name,
	            	    "logoUri": $scope.listedPartners[j].logoUri,
		    		})
				}
			}).error(function() {
				alert("Cannot get active subscription information");
			});
	    }
	    //get partners by consortium	    
//	    $scope.getConsExpDate = function(consortium, id){
//	    	alert(consortium['partyId']);
//	    	$http({
//				url: $scope.apiUri+'/subscriptions/activesubscriptions/'+consortium['partyId']+'/',
//				method: 'GET',
//			}).success(function(data, status, headers, config) {
//				$scope.consortiumSubscriptions = data;
//				if (id in $scope.consortiumSubscriptions) {
//					return $scope.consortiumSubscriptions[id].endDate;
//				}else{
//					return "Unlicensed";
//				}
//			}).error(function() {
//				alert("Cannot get active subscription information");
//			});
//				return "Unlicensed";
//	    }	    
	    //add consortium
	    $scope.consright = function(consortium) {
			if (consortium.state == "selected") {
			    // this is the trash button at normal state
	                    consortium.state = "remove";
			} else if (consortium.state == "remove") {
			    // this is the cancel button at remove state.
			    consortium.state = null;
			}
		    }
		    $scope.consleft = function(consortium) {
		    	if (consortium.state == "remove") {
			    // this is the remove button at remove state
			    $scope.consRemoveConfirm(consortium);
			    consortium.state = null;
			}
		    }
		$scope.consRemoveConfirm = function(consortium) {
        	var data = {
        			consortiumId: consortium.partyId,
        			action: 'remove'
        	}
        	$http({
        		url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
        		data:data,
	            method: 'PUT',
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        	}).success(function(data, status, headers, config){
            }).error(function(data, status, headers, config){
                alert("consortium affiliation remove request failed");
            });
        	var index = $scope.consortiums.indexOf(consortium);
            if (index > -1) {
                $scope.consortiums.splice(index,1);
            }
		}
	    $scope.consAddConfirm = function() {
	    	for(var i = 0; i < $scope.allConsortiums.length; i++){
	    		if($scope.allConsortiums[i].name == $scope.newConsortium['name']){
	    				$scope.foundConsortium['partyId'] = $scope.allConsortiums[i].partyId;
	    				$scope.foundConsortium['name'] = $scope.allConsortiums[i].name;
	    				$scope.consAddConfirm2();
	    				return;
	    		}
	    	}
	    	$scope.consAddConfirm1();
	    }
	    $scope.consAddConfirm2 = function() {
			$scope.foundConsortium['state'] = null;
			$scope.consortiums.unshift(angular.copy($scope.foundConsortium));
			var data = {
					consortiumId : $scope.foundConsortium['partyId'],
					action : 'add'
			}
	    	$http({
	            url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId +'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
	            data:data,
	            method: 'PUT',
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config){
				}).error(function(data, status, headers, config){
				            alert("add to existing consortium request failed");
				});
			$scope.newConsortium = null;
			$scope.consAdding = false;
	    }
	    $scope.consAddConfirm1 = function() {
		//alert("Nothing is added!");
		var data = {
		    name:$scope.newConsortium['name'],
		    partyType:'consortium'
		}
		$http({
            url: $scope.apiUri+'/parties/?credentialId='+$cookies.credentialId+'&secret_key='+encodeURIComponent($cookies.secret_key),
		    data:data,
            method: 'POST',
		}).success(function(data, status, headers, config){
			$scope.createdConsortium = data;
			$scope.createdConsortium['state'] = null;
			$scope.consortiums.unshift(angular.copy($scope.createdConsortium));
			var data = {
					consortiumId : $scope.createdConsortium.partyId,
					action : 'add'
			}
		$http({
            url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId +'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
            data:data,
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(data, status, headers, config){
			}).error(function(data, status, headers, config){
			            alert("add to new consortium request failed");
			});
		}).error(function(data, status, headers, config){
            alert("new consortium request failed");
		});		            
			$scope.newConsortium = null;
			$scope.consAdding = false;
	    }
	    //Consortium subscription list enter consortium
	    $scope.enterConsortium = function(consortium){
	    	if(!(consortium.state=='edit')){
//			    $state.currentTab = {label:"CONSORTIUM", state:"role.phoenix.manage"};
		    	$state.go("role.phoenix.manage.institution", {'consortiumId' : consortium.partyId, 'consortiumName':consortium.name});
	    	}
	    }
	    //get ip ranges
	    $scope.getIpRanges = function(){
	    if($scope.partyId != null){
            $http({
            	url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.partyId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
	    }
	    
	    $scope.$watch(function(scope) { return scope.institution },
	              function(newValue, oldValue) {
	                  $scope.partyId = newValue.partyId;
	                  $scope.setTitle(newValue.name);
	                  $scope.getIpRanges();
	                  $scope.getSubscriptionEndDate();
	                //get consortium list of the current institution
	          	    if($scope.partyId != null){
	          	    $http({
	                      url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
	          	    }
	              }
	             );
	    function getIpRanges(){
	    	if($scope.partyId != null){
	            $http({
	            	url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.partyId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
	    }
	    //init
	    function init(){
	    getIpRanges();
	    $http({
        	url: $scope.apiUri+'/parties/?partyType=organization&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
            method: 'GET',
	        }).success(function(data, status, headers, config){
		$scope.institutions = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.institutions.push({
		    	partyId:entry['partyId'],
		    	name:entry['name'],
		    });
		}
	        }).error(function(data, status, headers, config){
		alert("ip range request failed");
	        });
	    //get consortium list of the current institution
	    if($scope.partyId != null){
	    $http({
            url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
	    }
	    $http({
        	url: $scope.apiUri+'/parties/?partyType=consortium&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
            method: 'GET',
	        }).success(function(data, status, headers, config){
		$scope.allConsortiums = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.allConsortiums.push({
		    	partyId:entry['partyId'],
		    	name:entry['name'],
		    });
		}
	        }).error(function(data, status, headers, config){
		alert("all consortiums request failed");
	        });
	    
	    $(function () {
            $('#createStart').datepicker();
        });
		$(function () {
            $('#createEnd').datepicker();
        });
	    }
	}
]);
