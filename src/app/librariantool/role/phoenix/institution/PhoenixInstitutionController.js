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
	'$uibModal',
	'Title',
	'PhoenixInstitutionModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $uibModal, Title, PhoenixInstitutionModel) {
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
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.newRange = PhoenixInstitutionModel.newRange;
	    $scope.removeRange = null;
	    $scope.editRange = null;
	    $scope.searchTerm = null;
	    $scope.sortings = PhoenixInstitutionModel.sortings; //List of sorting objects which contain sortField and reverse attributes.
	    $scope.reverseField = $scope.sortings[0].reverse;
	    $scope.sortField = $scope.sortings[0].sortField;
	    
	  //for consortium modal
	    $scope.items = ['item1', 'item2', 'item3'];

	    $scope.animationsEnabled = true;

//	    $scope.open = function (size) {
//
//	      var modalInstance = $uibModal.open({
//	        animation: $scope.animationsEnabled,
//	        templateUrl: 'myModalContent.html',
//	        controller: 'ModalInstanceCtrl',
//	        size: size,
//	        resolve: {
//	          items: function () {
//	            return $scope.items;
//	          }
//	        }
//	      });
//
//	      modalInstance.result.then(function (selectedItem) {
//	        $scope.selected = selectedItem;
//	      }, function () {
//	        $log.info('Modal dismissed at: ' + new Date());
//	      });
//	    };
	    
	    $scope.open = function(){
			bootbox.alert('Choose a consortium');
	    }

	    $scope.toggleAnimation = function () {
	      $scope.animationsEnabled = !$scope.animationsEnabled;
	    };
	    
	  //for institution searchbox
	    $scope.searchstate = 'selected';
	    
	  //for subscription list
	    $scope.activeSubscriptions = PhoenixInstitutionModel.activeSubscriptions;
	    $scope.partners = PhoenixInstitutionModel.partners;
	    $scope.uiparams = PhoenixInstitutionModel.uiparams;
	    
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
		    data = {
			ipRangeId:iprange['ipRangeId'],
			start:iprange['start'],
			end:iprange['end'],
			partyId:iprange['partyId'],
			label:iprange['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key)+'&ipRangeId='+iprange['ipRangeId'],
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
                    alert("ip range request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
		$scope.adding = false;
	    }
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
                    url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key)+'&ipRangeId='+data['ipRangeId'],
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
	    }
	}
]);
