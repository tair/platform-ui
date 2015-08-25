/**
 * InstitutionIpRange Controller
 */

angular.module('platform-ui.librariantool.role.institution.iprange').controller(
	/* Name */
	'InstitutionIpRangeController',

	/* Dependencies */
	[
	'$scope',
	'$http',
	'$cookies',
	'$location',
	'$state',
	'Title',
	'InstitutionIpRangeModel',

	/* Controller Definition */
	function ($scope, $http, $cookies, $location, $state, Title, InstitutionIpRangeModel) {
	    $scope.setTitle(InstitutionIpRangeModel.title);
	    $scope.ipranges = InstitutionIpRangeModel.ipranges;
	    $scope.addGroupShow = "hidden";
	    $scope.adding = false;

	    $scope.selectIp = function(iprange) {
		if (iprange.state == null) {
		    iprange.state = "selected";
		} else {
		    iprange.state = null;
		}
	    }

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
		if (state == "selected") {
		    return "lt-ip-groups-list-selected";
		} else if (state == "edit") {
		    return "lt-ip-groups-list-edit";
		}
		return "lt-ip-groups-list";
	    }

	    $scope.groupsListLabelCss = function(state) {
		if (state == "edit") {
		    return "lt-ip-groups-list-label-edit";
		}
		return "lt-ip-groups-list-label";
	    }

	    $scope.groupsListGlyphiconCss = function(state) {
		if (state == "selected" || state == "edit") {
		    return "lt-ip-groups-list-glyphicon-container show";
		}
		return "lt-ip-groups-list-glyphicon-container hidden";
	    }
	    $scope.groupsListGlyphiconRemoveCss = function(state) {
		if (state == "selected") {
		    return "glyphicon-trash lt-ip-glyphicon";
		} else if (state == "edit") {
		    return "glyphicon-remove lt-ip-groups-add-glyphicon";
		}
	    }
	    $scope.groupsListGlyphiconEditCss = function(state) {
		if (state == "selected") {
		    return "glyphicon-pencil lt-ip-glyphicon";
		} else if (state == "edit") {
		    return "glyphicon-ok lt-ip-groups-add-glyphicon";
		}
		return "lt-ip-glyphicon";
	    }
	    $scope.remove = function(iprange) {
		if (iprange.state == "edit") {
		    iprange.state = null;
		} else {
		    /* Need http call to actually remove this stuff */
		    alert("Nothing is removed!");
		    var index = $scope.ipranges.indexOf(iprange);
		    if (index > -1) {
			$scope.ipranges.splice(index,1);
                    }
		}
	    }
	    $scope.edit = function(iprange) {
		if (iprange.state == "edit") {
		    iprange.state = null;
		} else {
		    iprange.state = "edit";
		}
	    }
	    $scope.addConfirm = function() {
		alert("Nothing is removed!");
		$scope.adding = false;
	    }
	}
]);
