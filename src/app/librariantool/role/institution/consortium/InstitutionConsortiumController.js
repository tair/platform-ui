/**
 * InstitutionConsortium Controller
 */

angular.module('platform-ui.librariantool.role.institution.consortium').controller(
	/* Name */
	'InstitutionConsortiumController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'$filter',
	'Title',
	'InstitutionConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, $filter, Title, InstitutionConsortiumModel) {
		$scope.setCurrentTab(InstitutionConsortiumModel.currentTab);
		$scope.consortiums = InstitutionConsortiumModel.consortiums;
	    $scope.adding = false;
	    $scope.newConsortium = InstitutionConsortiumModel.newConsortium;
	    $scope.removeConsortium = null;
	    $scope.editConsortium = null;
	    $scope.searchTerm = null;
	    $scope.sortings = InstitutionConsortiumModel.sortings; //List of sorting objects which contain predicate and reverse attributes.
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
            
    	    $scope.enterConsortium = function(consortium){
    	    	if(!(consortium.state=='edit')){
//    	    		$state.go("role.institution", {'partyId' : institution.partyId, 'institutionName':institution.name});
    	    		$state.go("role.consortium.institution", {title: consortium.name});
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
		else if (consortium.state == "edit") {
		    // This is the confirm button at edit state
		    data = {
			name:consortium['name'],
		    };
		    $http({
			url: $scope.apiUri+'/parties/?credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+consortium['partyId'],
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
		    //Party table: partyId, partyType, display, name, countryId
			//Credential table: id, username, password, email, institution, partyId, partnerId, userIdentifier
			//TODO PW-82 this still does not work - values entered by user in popup is not being passed here.
		    name:$scope.newConsortium['name'],//Party.name //optional for WS. shoudl come from UI
		    partyType:'consortium',//Party.partyType, required
			username: "andrvet_cons_ph_manage_cons", //temporarly hardcoded. $scope.newConsortium['username'],//TODO Credential.username MUST COME FROM UI, required
			partnerId:"phoenix", //tair or phoenix //Credential.partnerId, required
			//email:$scope.newConsortium['email'],//Credential.email //optional
		    //institution:$scope.newConsortium['institution'],//Credential.institution //optional
		}
		$http({
					url: $scope.apiUri+'/parties/consortiums/?secretKey='+encodeURIComponent($cookies.secretKey)+'&credentialId='+$cookies.credentialId,
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
                    alert("add consortium request failed");
		});
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
                    url: $scope.apiUri+'/parties/credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey)+'&partyId='+consortium['partyId'],
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
//	    $scope.enterConsortium = function(consortium){
//	    	if(!(consortium.state=='edit')){
//	    		$state.go('role.phoenix.manage.institution', {'consortiumId':consortium.partyId, 'consortiumName':consortium.name});
//	    	}
//	    }
	    // init
            $http({
                url: $scope.apiUri+'/parties/?partyType=consortium'+'&credentialId='+$cookies.credentialId+'&secretKey='+encodeURIComponent($cookies.secretKey),
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
]);
