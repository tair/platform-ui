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
	'Title',
	'ConsortiumManageConsortiumModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumManageConsortiumModel) {
            init();
	    
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
                } else if (consortium.state == "remove") {
                    // this is the cancel button at remove state.
		    consortium.state = null;
                }
            }
            $scope.left = function(consortium) {
                if (consortium.state == "selected") {
                    // This is the edit button at normal state.
		    consortium.state = null;
                    $scope.adding = false;
		    $scope.setInstitution(consortium);
		    $state.go("role.consortium.manage.institution");
                } else if (consortium.state == "remove") {
                    // this is the remove button at remove state
		    $scope.removeConfirm(consortium);
                    consortium.state = null;
                }
            }
            $scope.addConfirm = function() {
		var data = {
		    consortium: $cookies.partyId,
		    name: $scope.newRange['name'],
		    partyType: 'institution',
		}
		$http({
                    url: $scope.apiUri+'/parties/?partyId='+$scope.selectedInstitution.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
		    data:data,
                    method: 'POST',
		}).success(function(data, status, headers, config){
		}).error(function(data, status, headers, config){
                    alert("party request failed");
		});
		
                $scope.consortiums.unshift(angular.copy($scope.newRange));
		$scope.newRange = null;
                $scope.adding = false;
            }

            $scope.removeConfirm = function(consortium) {
     		/*data = {
                    ipRangeId:iprange['ipRangeId'],
                    start:iprange['start'],
                    end:iprange['end'],
                    partyId:iprange['partyId'],
                    label:iprange['name'],
                };*/
                $http({
                    url: $scope.apiUri+'/parties/?partyId='+consortium.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
                    method: 'DELETE',
                }).success(function(data, status, headers, config){
                }).error(function(data, status, headers, config){
                    alert("ip range request failed");
                });
                var index = $scope.consortiums.indexOf(consortium);
                if (index > -1) {
                    $scope.consortiums.splice(index,1);
                }
            }

            $scope.reset = function() {
                $scope.adding = false;
                for (i=0; i<$scope.consortiums.length; i++) {
                    $scope.consortiums[i].state=null;
                }
            }

            function init() {
		$scope.setTitle(ConsortiumManageConsortiumModel.title);
                $scope.consortiums = ConsortiumManageConsortiumModel.consortiums;
                $scope.adding = false;
                $scope.searchTerm = null;
                $http({
		    url: $scope.apiUri+'/parties/consortiuminstitutions/'+$cookies.partyId,
		    method: 'GET'
		}).success(function(data, status, headers, config){
		    $scope.consortiums = [];
		    for (var i=0; i < data.length; i++) {
			entry = data[i];
			entry['state'] = null;
			entry['id'] = entry['partyId'];
			$scope.consortiums.push(entry);
		    }
		}).error(function() {
		    alert("Could not get consortium institutions");
		});
                $http({
		    url: $scope.apiUri+'/parties/?partyId='+$cookies.partyId+'&secret_key='+encodeURIComponent($cookies.secret_key),
		    method: 'GET'
		}).success(function(data, status, headers, config){
		    $scope.party = data[0];
		}).error(function() {
		    alert("Cannot get party information");
		});
	    }
	}
]);
