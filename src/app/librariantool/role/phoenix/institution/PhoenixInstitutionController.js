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
		
		init();
		$scope.partyId = $location.search()['partyId'];
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
	  	    		  message: "<div " +
	  	    		  	"ng-controller='PhoenixInstitutionController' style='padding:0px'>" +
	    		  		//Credential.username required
	  	    		  	"<input ng-class='groupsListLabelCss(true)' " +
	    		  		"type='text' " +
	    		  		"ng-model='newInstitution.username'" +
	    		  		"placeholder='Institution username (required)'>" +
	    		  		"</input>" +
	    		  		
	    		  		//Credential.password //not needed
//	  	    		  	"<input ng-class='groupsListLabelCss(true)' " +
//	    		  		"type='text' " +
//	    		  		"ng-model='newInstitution.password'" +
//	    		  		"placeholder='Input instituion password'>" +
//	    		  		"</input>" +
	    		  		
	    		  		//Credential.email
	  	    		  	"<input ng-class='groupsListLabelCss(true)' " +
	    		  		"type='text' " +
	    		  		"ng-model='newInstitution.email'" +
	    		  		"placeholder='Instituion email (optional)'>" +
	    		  		"</input>" +
	    		  		
	    		  		//Credential.institution
	  	    		  	"<input ng-class='groupsListLabelCss(true)' " +
	    		  		"type='text' " +
	    		  		"ng-model='newInstitution.institution'" +
	    		  		"placeholder='Instituion (optional)'>" +
	    		  		"</input>" +
	    		  		
	    		  		//Party.name (example Google Staf)
	  	    		  	"<input ng-class='groupsListLabelCss(true)' " +
	    		  		"type='text' " +
	    		  		"ng-model='newInstitution.name'" +
	    		  		"placeholder='Institution name (optional)'>" +
	    		  		"</input>" +
	    		  		
	    		  		"</div>",
	    		  buttons: {
	                    success: {
	                        label: "Create",
	                        className: "btn-success",
	                        callback: function(){
	                        	$scope.createInstitutionPartyAndCredential();
	                        }
	                    }
	                }
	    		});
	    }
	
	    $scope.createInstitutionPartyAndCredential = function(){
	    	data = {
	   	    	  	//Party table: partyId, partyType, display, name, countryId
	  			  	//Credential table: id, username, password, email, institution, partyId, partnerId, userIdentifier

	    			//TODO PW-82 this still does not work - values entered by user in popup is not being passed here.
	    			username:"andrvetinst3", //temporarly hardcoded. $scope.newInstitution['username'],//Credential.username, required
	    			partnerId:"phoenix", //tair or phoenix //Credential.partnerId, required
	    			partyType:"organization", // or institution ? Party.partyType, required
	    			
	    			email:$scope.newInstitution['email'],//Credential.email, optional
			    	institution:$scope.newInstitution['institution'],//Credential.institution, optinal
			    	name:$scope.newInstitution['name'],//Party.name, optional
                };
                $http({
                	//POST http://demoapi.arabidopsis.org/parties/institutions/?credentialId=2&secretKey=7DgskfEF7jeRGn1h%2B5iDCpvIkRA%3D
                    url: $scope.apiUri+'/parties/institutions/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
                	//url: $scope.apiUri+'/credentials/',
                    data:data,
                    method: 'POST',
                }).success(function(data, status, headers, config){
                	$scope.partyId = data[0]['partyId'];
                	$scope.institution = {
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
                }).error(function(data, status, headers, config){
                	bootbox.alert("institution creation failed with "+data.non_field_errors);
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
			url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&ipRangeId='+iprange['ipRangeId'],
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
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$scope.institution.partyId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
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
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secretKey'+encodeURIComponent($cookies.secretKey)+'&ipRangeId='+data['ipRangeId'],
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
			for(var i = 0; i< ret.length; i++){
				console.log(ret[i])
			}
//			console.log(ret);
			return ret;
		    }
//	    $scope.listedPartners = $scope.listPartners($scope.partners);
	    $scope.listedPartners = [
{
"partnerId": "phoenix",
"name": "Phoenix",
"logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png",
"termOfServiceUri": "https://www.google.com/intl/en/policies/terms/?fg=1"
},
{
"partnerId": "tair",
"name": "TAIR",
"logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/logo2.gif",
"termOfServiceUri": "https://www.arabidopsis.org/doc/about/tair_terms_of_use/417"
},
{
"partnerId": "yfd",
"name": "YFD",
"logoUri": "https://s3-us-west-2.amazonaws.com/pw2-logo/yfd.png",
"termOfServiceUri": "https://www.google.com/intl/en/policies/terms/?fg=1"
}
],
$scope.consortiums = [{"partyId": 31767, "partyType": "consortium", "name": "consortium31767", "country": 62, "display": true, "consortiums": []}, {"partyId": 32673, "partyType": "consortium", "name": "testcons", "country": null, "display": false, "consortiums": []}];
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
			    		$scope.consSubList.push({
//			    			"consortium": $scope.consortiums[i],
			    			"consortium": {"partyId": 31767, "partyType": "consortium", "name": "consortium31767", "country": 62, "display": true, "consortiums": []},
		            	    "endDate": endDate,
		            	    "partnerId": $scope.listedPartners[j].partnerId,
		            	    "name": $scope.listedPartners[j].name,
		            	    "logoUri": $scope.listedPartners[j].logoUri,
			    		})
					}else{
						var endDate =  "Unlicensed";
					}
				}
			}).error(function() {
				alert("Cannot get active subscription information");
			});
	    }
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
        			parentPartyId: consortium.partyId,
        			childPartyId: $scope.partyId
        	}
        	$http({
        		//TODO PW-82. partyId is FORM DATA, not query string parameter. 
        		//url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
        		url: $scope.apiUri+'/parties/affiliation/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
        		data:data,
	            method: 'DELETE',
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
	    				$scope.consAddConfirm2();//updating existing consortium
	    				return;
	    		}
	    	}
	    	$scope.consAddConfirm1();//creating brand new consortium
	    }
	    
	    //updating existing consortium
	    $scope.consAddConfirm2 = function() {
			$scope.foundConsortium['state'] = null;
			$scope.consortiums.unshift(angular.copy($scope.foundConsortium));
			var data = {
					parentPartyId : $scope.foundConsortium['partyId'],
					childPartyId : $scope.partyId,
			}
	    	$http({
	    		//TODO PW-82. partyId is FORM DATA, not query string parameter.
	            url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
	    		data:data,
	            method: 'POST',
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config){
					
				}).error(function(data, status, headers, config){
				            alert("add to existing consortium request failed");
				});
			$scope.newConsortium = null;
			$scope.consAdding = false;
	    }
	    
	    //creating new consortium
	    $scope.consAddConfirm1 = function() {
		//alert("Nothing is added!");
		var data = {
			//Party table: partyId, partyType, display, name, countryId
			//Credential table: id, username, password, email, institution, partyId, partnerId, userIdentifier
			
			//TODO PW-82 this still does not work - values entered by user in popup is not being passed here.
		    name:$scope.newConsortium['name'],//Party.name //optional for WS. comes from UI already
		    partyType:'consortium',//Party.partyType, required
		    
			username: "andrvetcons3", //temporarly hardcoded. $scope.newConsortium['username'],//TODO Credential.username MUST COME FROM UI, required
			partnerId:"phoenix", //tair or phoenix //Credential.partnerId, required

			//email:$scope.newConsortium['email'],//Credential.email //optional
		    //institution:$scope.newConsortium['institution'],//Credential.institution //optional
		}
		
		$http({
			//PW-161/PW-82
            //POST url: $scope.apiUri+'/parties/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
			url: $scope.apiUri+'/parties/consortiums/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
		    data:data,
            method: 'POST',
		}).success(function(data, status, headers, config){
			//new code
           	$scope.partyId = data[0]['partyId'];
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
			bootbox.alert("New Consortium created: username="+data[1].username+" partyId="+data[0].partyId+ " partyType="+data[0].partyType+
					" partnerId="+data[1].partnerId+" institution="+data[1].institution+" name="+data[0].name);
			
        	//old code. TODO by PW-82
			$scope.createdConsortium = data;
			$scope.createdConsortium['state'] = null;
			$scope.consortiums.unshift(angular.copy($scope.createdConsortium));
			var data = {
					parentPartyId : $scope.createdConsortium.partyId,
					childPartyId : $scope.partyId,
			}
		
		//TODO to be replaced by new affiliation WS
		$http({
			//TODO PW-82. partyId is FORM DATA, not query string parameter. 
            //url: $scope.apiUri+'/parties/consortiums/?partyId='+$scope.partyId +'&secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
            url: $scope.apiUri+'/parties/affiliations/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
            data:data,
            method: 'POST',
			}).success(function(data, status, headers, config){
			}).error(function(data, status, headers, config){
			            alert("add to new consortium request failed");
			});
		}).error(function(data, status, headers, config){
            alert("new consortium request failed with "+data.non_field_errors);
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
	                      url: $scope.apiUri+'/parties/affiliations/?partyId='+$scope.partyId+'partyType=organization'+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
//	          		consortium:entry['consortium'],	
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
            url: $scope.apiUri+'/parties/affiliations/?partyId='+$scope.partyId+'patyType=organization'+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
//		consortium:entry['consortium'],	
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
	    $http({
			url: $scope.apiUri+'/partners/',
			method: 'GET',
		}).success(function(data, status, headers, config) {
			$scope.partners = data;
		}).error(function() {
			alert("Cannot get partner information");
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
