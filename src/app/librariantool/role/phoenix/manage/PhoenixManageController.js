/**
 * PhoenixIpRange Controller
 */

angular.module('platform-ui.librariantool.role.phoenix.manage').controller(
	/* Name */
	'PhoenixManageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'PhoenixManageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, PhoenixManageModel) {
		$scope.setTitle(PhoenixManageModel.title);
		$scope.consortiums = PhoenixManageModel.consortiums;
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;
	    $scope.newConsortium = PhoenixManageModel.newConsortium;
	    $scope.removeConsortium = null;
	    $scope.editConsortium = null;
	    $scope.searchTerm = null;
	    $scope.sortings = PhoenixManageModel.sortings; //List of sorting objects which contain sortField and reverse attributes.
	    $scope.reverseField = $scope.sortings[0].reverse;
	    $scope.sortField = $scope.sortings[0].sortField;
	    
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
		else if (iprange.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			name:consortium['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/'+'?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+consortium['partyId'],
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
		    partyType:'consortium',
		    name:$scope.newConsortium['name'],
		}
		$http({
                    url: $scope.apiUri+'/parties/'+'?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
		    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){
                    alert("add consortium request failed");
		});
		
                $scope.ipranges.unshift(angular.copy($scope.newConsortium));
		$scope.newConsortium = null;
		$scope.adding = false;
	    }
	    $scope.reset = function() {
		$scope.adding = false;
		for (i=0; i<$scope.consortiums.length; i++) {
		    $scope.consortiums[i].state=null;
		}
	    }
	    $scope.removeConfirm = function(consortium) {
                data = {};
                $http({
                    url: $scope.apiUri+'/parties/ipranges/'+'?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+consortium['partyId'],
                    data:data,
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
                url: $scope.apiUri+'/parties/ipranges/?partyId='+$cookies.credentialId+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
                method: 'GET',
            }).success(function(data, status, headers, config){
		$scope.consortiums = [];
		for (var i = 0; i < data.length; i++) {
		    entry = data[i];
		    $scope.ipranges.push({
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
]);
