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

            // CSS Logics as response to state changes.
	    $scope.groupsAddCss = function() {
                if ($scope.adding) {
                    return "show";
                }
                return "hidden";
            }

            $scope.actionButtonAddCss = function() {
                if ($scope.adding) {
                    return "lt-ip-action-button-selected";
                }
                return "lt-ip-action-button";
            }

            $scope.actionButtonGlyphiconAddCss = function() {
                if ($scope.adding) {
                    return "lt-ip-action-button-glyphicon-selected";
                }
                return "lt-ip-glyphicon";
            }

            $scope.actionButtonLabelAddCss = function() {
                if ($scope.adding) {
                    return "lt-ip-action-button-label-selected";
                }
                return "lt-ip-action-button-label";
            }
            $scope.groupsListCss = function(state) {
                if (state == null) {
                    return "lt-ip-groups-list";
                }
                else if (state == "selected") {
                    return "lt-ip-groups-list-selected";
                } else if (state == "edit") {
                    return "lt-ip-groups-list-edit";
                } else if (state == "remove") {
                    return "lt-ip-groups-list-remove";
                }

            }
            $scope.groupsListIdCss = function(state) {
                if (state == "edit") {
                    return "lt-ip-groups-list-start-edit";
                }
                return "lt-ip-groups-list-start";
            }
            $scope.groupsListLabelCss = function(state) {
                if (state == "edit") {
                    return "lt-ip-groups-list-label-edit";
                }
                return "lt-ip-groups-list-label";
            }
            $scope.groupsListGlyphiconCss = function(state) {
                if (state == null) {
                    return "lt-ip-groups-list-glyphicon-container hidden";
                }
                return "lt-ip-groups-list-glyphicon-container show";
            }
            $scope.groupsListGlyphiconRightCss = function(state) {
                if (state == "selected") {
                    return "glyphicon-trash lt-ip-glyphicon";
                } else if (state == "edit") {
                    return "glyphicon-remove lt-ip-groups-add-glyphicon";
                } else if (state == "remove") {
                    return "glyphicon-remove lt-ip-groups-remove-glyphicon";
                }

            }
            $scope.groupsListGlyphiconLeftCss = function(state) {
                if (state == "selected") {
                    return "glyphicon-pencil lt-ip-glyphicon";
                } else if (state == "edit") {
                    return "glyphicon-ok lt-ip-groups-add-glyphicon";
                } else if (state == "remove") {
                    return "glyphicon-ok lt-ip-groups-remove-glyphicon";
                }
                return "lt-ip-glyphicon";
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
