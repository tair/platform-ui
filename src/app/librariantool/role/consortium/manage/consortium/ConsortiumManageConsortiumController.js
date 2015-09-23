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
            $scope.setTitle(ConsortiumManageConsortiumModel.title);
            $scope.consortiums = ConsortiumManageConsortiumModel.consortiums;
            $scope.adding = false;
            $scope.searchTerm = null;
	    
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
                $scope.adding = false;
            }

            $scope.removeConfirm = function(consortium) {
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
	}
]);
