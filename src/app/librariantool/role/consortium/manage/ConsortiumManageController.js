/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.consortium.manage').controller(
	/* Name */
	'ConsortiumManageController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'ConsortiumManageModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, ConsortiumManageModel) {
            $scope.setTitle(ConsortiumManageModel.title);
	    $scope.consortiums = ConsortiumManageModel.consortiums;
            $scope.adding = false;
	    $scope.searchTerm = null;

            // CSS Logics as response to state changes.
	    $scope.groupsAddCss = function() {
                if ($scope.adding) {
                    return "show";
                }
                return "hidden";
            }

            $scope.actionButtonAddCss = function() {
                if ($scope.adding) {
                    return "lt-admin-action-button-selected";
                }
                return "lt-admin-action-button";
            }

            $scope.actionButtonGlyphiconAddCss = function() {
                if ($scope.adding) {
                    return "lt-glyphicon-green";
                }
                return "lt-glyphicon";
            }

            $scope.actionButtonLabelAddCss = function() {
                if ($scope.adding) {
                    return "lt-admin-action-button-label-selected";
                }
                return "lt-admin-action-button-label";
            }
            $scope.groupsListCss = function(state) {
                if (state == null) {
                    return "lt-admin-groups-list";
                }
                else if (state == "selected") {
                    return "lt-admin-groups-list-selected";
                } else if (state == "edit") {
                    return "lt-admin-groups-list-edit";
                } else if (state == "remove") {
                    return "lt-admin-groups-list-remove";
                }

            }
            $scope.groupsListIdCss = function(state) {
                if (state == "edit") {
                    return "lt-admin-groups-list-values-input-edit";
                }
                return "lt-admin-groups-list-values-input";
            }
            $scope.groupsListLabelCss = function(state) {
                if (state == "edit") {
                    return "lt-admin-groups-list-label-edit";
                }
                return "lt-admin-groups-list-label";
            }
            $scope.groupsListGlyphiconCss = function(state) {
                if (state == null) {
                    return "lt-admin-groups-list-glyphicon-container hidden";
                }
                return "lt-admin-groups-list-glyphicon-container show";
            }
            $scope.groupsListGlyphiconRightCss = function(state) {
                if (state == "selected") {
                    return "glyphicon-trash lt-glyphicon";
                } else if (state == "edit") {
                    return "glyphicon-remove lt-glyphicon-green";
                } else if (state == "remove") {
                    return "glyphicon-remove lt-glyphicon-red";
                }

            }
            $scope.groupsListGlyphiconLeftCss = function(state) {
                if (state == "selected") {
                    return "glyphicon-pencil lt-glyphicon";
                } else if (state == "edit") {
                    return "glyphicon-ok lt-glyphicon-green";
                } else if (state == "remove") {
                    return "glyphicon-ok lt-glyphicon-red";
                }
                return "lt-glyphicon";
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
                    consortium.state = null;
                } else if (consortium.state == "remove") {
                    // this is the cancel button at remove state.
		    consortium.state = null;
                }
            }
            $scope.left = function(consortium) {
                if (consortium.state == "selected") {
                    // This is the edit button at normal state.
                    consortium.state = "edit";
                    $scope.adding = false;
                }
                else if (consortium.state == "edit") {
                    // This is the confirm button at edit state
                    consortium.state = null;
                    $scope.editRange = null;
                } else if (consortium.state == "remove") {
                    // this is the remove button at remove state
		    $scope.removeConfirm(consortium);
                    consortium.state = null;
                }
            }
            $scope.addConfirm = function() {
                $scope.newRange = null;
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
